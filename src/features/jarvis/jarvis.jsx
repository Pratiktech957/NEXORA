import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import * as THREE from "three";

/*
|--------------------------------------------------------------------------
| JARVIS
|--------------------------------------------------------------------------
| Public API
|
|   <Jarvis
|       state="idle"        // idle | listening | thinking | speaking |
|                           // alert | error | sleep   (+ one-shots: wave | success)
|       isTyping={false}    // legacy → LISTENING
|       wave={false}        // legacy → plays ONE wave on false → true
|       alert={false}       // forces ALERT
|       audioLevel={0}      // 0..1 amplitude: mic level (listening) or voice level (speaking)
|       standbyAfter={45000}// ms of inactivity before STANDBY (0 disables)
|   />
|
|   ref.current.trigger("wave" | "success")   // fire a one-shot imperatively
|   ref.current.wake()                        // leave STANDBY
|
| Architecture
|
|   Jarvis (React, low-frequency state: status label, inactivity timer)
|     └─ writes → `control` ref  (mode, audioLevel, signals, pointer flag)
|          └─ JarvisRobot (useFrame only, zero React state)
|               1. resolve  → damped per-mode weights (sum = 1)
|               2. blend    → posture table  (neutral / attentive / thinking /
|                                             speaking / alert / standby)
|               3. layer    → update*Animation() add small motion offsets
|               4. overlay  → WAVE / SUCCESS (transient, return to prior state)
|               5. pointer  → head > neck > chest influence, added on top
|               6. apply    → every joint is damped, clamped, delta-time based
|
| Priority:  ALERT > SUCCESS > WAVE > SPEAKING > THINKING > LISTENING > IDLE > STANDBY
|   Continuous states (alert, speaking, thinking, listening, idle, standby) are
|   mutually exclusive: the highest wins. WAVE and SUCCESS are overlays: they own
|   a few channels (the waving arm / a core flare) while they play, are suppressed
|   by ALERT, and the underlying state simply carries on underneath them.
*/

const PI = Math.PI;
const TAU = PI * 2;
const { clamp, damp, lerp, smoothstep } = THREE.MathUtils;

/*
|--------------------------------------------------------------------------
| Tunables
|--------------------------------------------------------------------------
*/

const SUCCESS_DURATION = 2.4; // seconds
const WAVE_DURATION = 2.0; // seconds
const DEFAULT_STANDBY_AFTER = 45000; // ms

const PELVIS_Y = 0.95;
const SHOULDER_Y = 0.27;
const EYE_X = 0.036;
const EYE_BASE_HEIGHT = 0.008;
const EYE_COLOR = new THREE.Color(0x8fdcff);

/* Pointer influence: head strongest → neck medium → chest very subtle. */
const LOOK = {
    headYaw: 0.52,
    neckYaw: 0.22,
    chestYaw: 0.06,
    headPitch: 0.3,
    neckPitch: 0.08,
    chestPitch: 0.02,
    eyeX: 0.0045,
    eyeY: 0.0022,
};

/* Wave pose (left arm). Joint angles in radians. */
const WAVE_SIDE = 0; // index into sides: 0 = left, 1 = right
const WAVE = {
    shoulderZ: 1.25, // upper arm abducted ~72°
    shoulderYaw: 0.42, // swings the elbow forward so the hand is in front
    elbowZ: PI - 0.15 - 1.25, // forearm points up, leaning slightly outward
    wristRoll: 1.15, // palm turns toward the viewer
    wristSwing: 0.34, // side-to-side hand wave
    frequency: 3.2, // Hz
};

/*
|--------------------------------------------------------------------------
| Modes & postures
|--------------------------------------------------------------------------
| Every continuous mode owns a posture: a full set of target channel values.
| The robot always renders the weighted blend of all postures, so changing mode
| is a smooth cross-fade (never a snap).
|
| Sign conventions: headPitch / leanPitch  + = looking / leaning down / forward
|                   headRoll               + = top of head tilts to screen-left
|                   elbowBend              + = more bent
*/

const MODES = ["idle", "listening", "thinking", "speaking", "alert", "standby"];

/* How fast the weights cross-fade when this mode becomes the target (1/s). */
const BLEND_LAMBDA = {
    idle: 3.2,
    listening: 4.2,
    thinking: 3.4,
    speaking: 3.6,
    alert: 7.5,
    standby: 1.4,
};

const POSTURE = {
    // neutral
    idle: {
        headPitch: 0, headRoll: 0, headYaw: 0, neckPitch: 0, leanPitch: 0,
        shoulderRaise: 0, armSpread: 0, elbowBend: 0, fingerCurl: 0,
        trackGain: 1, eyeOpen: 1, eyeBright: 1, glow: 1, rim: 1,
        coreLight: 1, coreRate: 2.2, coreDepth: 0.059, coreBase: 1,
        breathAmp: 1, breathRate: 1.6, life: 1,
    },
    // attentive
    listening: {
        headPitch: -0.02, headRoll: 0.05, headYaw: 0, neckPitch: 0, leanPitch: 0.012,
        shoulderRaise: 0.005, armSpread: 0.03, elbowBend: 0.04, fingerCurl: 0.02,
        trackGain: 1, eyeOpen: 1.06, eyeBright: 1.22, glow: 1.12, rim: 1.15,
        coreLight: 1.25, coreRate: 1.5, coreDepth: 0.07, coreBase: 1.02,
        breathAmp: 1, breathRate: 1.5, life: 0.8,
    },
    // focused, inward
    thinking: {
        headPitch: 0.04, headRoll: 0.075, headYaw: -0.04, neckPitch: 0.01, leanPitch: 0.032,
        shoulderRaise: 0.004, armSpread: -0.01, elbowBend: 0.06, fingerCurl: 0.07,
        trackGain: 0.55, eyeOpen: 0.94, eyeBright: 1.1, glow: 1.18, rim: 1.2,
        coreLight: 1.5, coreRate: 5.0, coreDepth: 0.075, coreBase: 1,
        breathAmp: 0.8, breathRate: 1.9, life: 0.55,
    },
    // forward, engaged
    speaking: {
        headPitch: 0, headRoll: 0.02, headYaw: 0, neckPitch: 0, leanPitch: 0.04,
        shoulderRaise: 0.003, armSpread: 0.02, elbowBend: 0.12, fingerCurl: 0.03,
        trackGain: 0.85, eyeOpen: 1, eyeBright: 1.12, glow: 1.15, rim: 1.15,
        coreLight: 1.3, coreRate: 3.0, coreDepth: 0.05, coreBase: 1,
        breathAmp: 1.1, breathRate: 1.8, life: 0.7,
    },
    // upright, controlled (core is driven by the alert pattern, not a sine)
    alert: {
        headPitch: -0.035, headRoll: 0, headYaw: 0, neckPitch: 0, leanPitch: -0.008,
        shoulderRaise: 0.009, armSpread: 0.05, elbowBend: 0.06, fingerCurl: 0.02,
        trackGain: 0.3, eyeOpen: 1.1, eyeBright: 1.3, glow: 1.25, rim: 1.3,
        coreLight: 1.4, coreRate: 0, coreDepth: 0, coreBase: 1.03,
        breathAmp: 0.6, breathRate: 1.4, life: 0.35,
    },
    // low power: head lowered, dim, almost still
    standby: {
        headPitch: 0.17, headRoll: 0.03, headYaw: 0, neckPitch: 0.03, leanPitch: 0.022,
        shoulderRaise: -0.006, armSpread: -0.02, elbowBend: -0.03, fingerCurl: 0.12,
        trackGain: 0.1, eyeOpen: 0.32, eyeBright: 0.4, glow: 0.45, rim: 0.55,
        coreLight: 0.3, coreRate: 0.65, coreDepth: 0.045, coreBase: 0.94,
        breathAmp: 0.55, breathRate: 0.75, life: 0.3,
    },
};

const POSTURE_KEYS = Object.keys(POSTURE.idle);

/* Additive channels, zeroed every frame and filled by the update* functions. */
const MOTION_KEYS = [
    "chestYaw", "chestPitch", "neckYaw", "swayX", "swayRoll", "breath",
    "pelvisDrop", "gazeX", "gazeY", "coreBoost", "coreLightBoost",
    "eyeBoost", "glowBoost", "rimBoost", "ringPulse", "visor",
];

/* Status badge. Colors stay in the JARVIS blue family; only ALERT warms up. */
const STATUS = {
    idle: { text: "ONLINE", color: "#3fb8ff", ping: "2.6s" },
    listening: { text: "LISTENING", color: "#35b6ff", ping: "1.7s" },
    thinking: { text: "THINKING", color: "#3fb8ff", ping: "0.85s" },
    speaking: { text: "SPEAKING", color: "#35b6ff", ping: "1.15s" },
    success: { text: "COMPLETE", color: "#2fc4a0", ping: "1.4s" },
    alert: { text: "ALERT", color: "#f5a524", ping: "0.9s" },
    standby: { text: "STANDBY", color: "#9aa7b5", ping: null },
};

/*
|--------------------------------------------------------------------------
| Small math / animation utilities
|--------------------------------------------------------------------------
*/

const sat = (x) => clamp(x, 0, 1);

/* smoothstep ease on a time window: 0 before a, 1 after b. */
const ramp = (t, a, b) => {
    const x = sat((t - a) / (b - a));
    return x * x * (3 - 2 * x);
};

/* 0 → 1 over [a, b], held, then 1 → 0 over [c, d]. */
const upDown = (t, a, b, c, d) => ramp(t, a, b) - ramp(t, c, d);

/* Single smooth 0 → 1 → 0 pulse starting at t0 lasting w seconds. */
const bump = (t, t0, w) => {
    const u = (t - t0) / w;
    return u > 0 && u < 1 ? Math.sin(PI * u) ** 2 : 0;
};

/* Cheap smooth pseudo-noise in about [-1, 1] (three incommensurate sines). */
const noise = (t, speed, seed) => {
    const x = t * speed;
    return (
        Math.sin(x + seed) * 0.55 +
        Math.sin(x * 1.73 + seed * 2.1) * 0.3 +
        Math.sin(x * 2.91 + seed * 0.7) * 0.15
    );
};

/*
 * Wanderer: picks a new random target in [-1, 1] every min..max seconds and
 * eases toward it. Gives "occasional" events (micro tilts, glances) without
 * ever stepping.
 */
const makeWander = (min, max, lambda) => ({
    value: 0,
    target: 0,
    next: 0,
    min,
    max,
    lambda,
});

const stepWander = (w, t, dt) => {
    if (t >= w.next) {
        w.target = Math.random() * 2 - 1;
        w.next = t + w.min + Math.random() * (w.max - w.min);
    }
    w.value = damp(w.value, w.target, w.lambda, dt);
    return w.value;
};

/*
|--------------------------------------------------------------------------
| Input resolution (props → mode)
|--------------------------------------------------------------------------
*/

const STATE_ALIASES = {
    online: "idle",
    ready: "idle",
    standby: "sleep",
    waving: "wave",
    complete: "success",
    done: "success",
    warning: "alert",
    fail: "error",
    failed: "error",
    processing: "thinking",
    talking: "speaking",
};

const normalizeState = (value) => {
    const key = typeof value === "string" ? value.trim().toLowerCase() : "idle";
    return STATE_ALIASES[key] ?? key;
};

/* Highest-priority continuous mode requested by the props. */
function resolveRequest({ state, isTyping, alert }) {
    const s = normalizeState(state);

    if (alert || s === "alert" || s === "error") {
        return { mode: "alert", severity: !alert && s === "error" ? "error" : "alert" };
    }
    if (s === "speaking") return { mode: "speaking", severity: "alert" };
    if (s === "thinking") return { mode: "thinking", severity: "alert" };
    if (s === "listening" || isTyping) return { mode: "listening", severity: "alert" };
    if (s === "sleep") return { mode: "standby", severity: "alert" };

    return { mode: "idle", severity: "alert" };
}

/*
|--------------------------------------------------------------------------
| Animation state (plain mutable object, lives in a ref)
|--------------------------------------------------------------------------
*/

const makeSide = () => ({
    raise: 0,
    spread: 0,
    elbow: 0,
    wristZ: 0,
    curl: 0,
    fing: [0, 0, 0, 0],
});

const makeWaveOut = () => ({
    shoulder: 0,
    forearm: 0,
    wrist: 0,
    amp: 0,
    osc: 0,
    oscB: 0,
    phase: 0,
});

function createSim() {
    const ch = {};
    POSTURE_KEYS.forEach((k) => (ch[k] = 0));
    MOTION_KEYS.forEach((k) => (ch[k] = 0));

    return {
        t: 0,
        ready: false,
        prevMode: "idle",
        motionGain: 1,
        w: { idle: 1, listening: 0, thinking: 0, speaking: 0, alert: 0, standby: 0 },
        ch,
        side: [makeSide(), makeSide()],
        waveOut: makeWaveOut(),
        look: { x: 0, y: 0 },
        breathPhase: 0,
        corePhase: 0,
        alertClock: 0,
        eyeOpen: 1,
        audio: { level: 0, synth: 0, mix: 0, speech: 0, lastLive: -10 },
        blink: { next: 1.6, start: -1, queue: false, second: false },
        nod: { next: 4, t0: -10 },
        gesture: { next: 2.5, t0: -10, dur: 1, side: 0 },
        wave: { t: -1, signal: 0, pending: false, pendingAt: 0 },
        success: { t: -1, signal: 0 },
        wake: { t0: -10 },
        wd: {
            sway: makeWander(6, 11, 0.8),
            headTilt: makeWander(7, 14, 1.1),
            gazeX: makeWander(0.7, 2.4, 16),
            gazeY: makeWander(0.9, 3.0, 16),
            thinkYaw: makeWander(1.6, 3.4, 3),
            thinkPitch: makeWander(2.0, 4.0, 3),
            thinkShoulder: makeWander(2.5, 5.5, 4),
            thinkFinger: makeWander(1.5, 3.5, 3),
        },
    };
}

/*
|--------------------------------------------------------------------------
| Frame pipeline — stage 1/2: weights + posture blend
|--------------------------------------------------------------------------
*/

/*
 * Cross-fades per-mode weights toward a one-hot target. All weights share one
 * blend factor per frame, so they always sum to exactly 1.
 */
function updateStateWeights(sim, mode, dt) {
    const k = 1 - Math.exp(-BLEND_LAMBDA[mode] * dt);

    for (let i = 0; i < MODES.length; i++) {
        const m = MODES[i];
        sim.w[m] += ((m === mode ? 1 : 0) - sim.w[m]) * k;
    }
}

/* Weighted blend of all postures → base channel values. Also zeroes motion. */
function blendPosture(sim) {
    const { w, ch, side } = sim;

    for (let k = 0; k < POSTURE_KEYS.length; k++) {
        const key = POSTURE_KEYS[k];
        let v = 0;

        for (let i = 0; i < MODES.length; i++) {
            v += w[MODES[i]] * POSTURE[MODES[i]][key];
        }

        ch[key] = v;
    }

    for (let k = 0; k < MOTION_KEYS.length; k++) ch[MOTION_KEYS[k]] = 0;

    for (let i = 0; i < 2; i++) {
        const sd = side[i];
        sd.raise = sd.spread = sd.elbow = sd.wristZ = sd.curl = 0;
        sd.fing[0] = sd.fing[1] = sd.fing[2] = sd.fing[3] = 0;
    }
}

/*
 * Audio envelope follower (fast attack, slower release). While `audioLevel`
 * is live it drives intensity; if it is absent, a synthetic speech-like
 * envelope stands in so SPEAKING never looks dead.
 */
function updateAudio(sim, dt, raw) {
    const a = sim.audio;
    const t = sim.t;
    const level = Number.isFinite(raw) ? clamp(raw, 0, 1) : 0;

    if (level > 0.015) a.lastLive = t;

    a.level = damp(a.level, level, level > a.level ? 28 : 8, dt);
    a.mix = damp(a.mix, t - a.lastLive < 0.6 ? 1 : 0, 8, dt);

    const syllable = 0.5 + 0.5 * Math.sin(t * TAU * 3.8 + Math.sin(t * 1.3) * 1.6);
    const phrase = smoothstep(0.5 + 0.5 * Math.sin(t * 2.3 + Math.sin(t * 0.7) * 1.4), 0.2, 0.5);

    a.synth = damp(a.synth, phrase * (0.25 + 0.5 * syllable), 16, dt);
    a.speech = lerp(a.synth, a.level, a.mix);
}

/*
|--------------------------------------------------------------------------
| Stage 3: per-state motion layers
|--------------------------------------------------------------------------
| Each function ADDS small offsets to the shared channels, scaled by its own
| state weight. Nothing here touches a mesh directly, so layers can never
| fight each other.
*/

/* Always-on "alive" layer: breathing, weight shift, micro head, micro hands. */
function updateIdleAnimation(sim, dt) {
    const { t, ch, side } = sim;
    const k = ch.life;

    // Breathing: slightly asymmetric (inhale a touch faster than exhale).
    sim.breathPhase += dt * ch.breathRate;
    const b =
        Math.sin(sim.breathPhase) + 0.12 * Math.sin(2 * sim.breathPhase + 0.6);

    ch.breath = b * ch.breathAmp;
    ch.chestPitch += b * 0.004 * ch.breathAmp;
    ch.shoulderRaise += 0.0016 * b * k;

    // Tiny body weight shifting.
    const sway = stepWander(sim.wd.sway, t, dt);
    ch.swayX += sway * 0.006 * k;
    ch.swayRoll += sway * -0.012 * k;

    // Slight head movement + an occasional micro tilt.
    ch.headYaw += noise(t, 0.31, 1.3) * 0.018 * k;
    ch.headPitch += noise(t, 0.27, 4.1) * 0.01 * k;
    ch.headRoll += stepWander(sim.wd.headTilt, t, dt) * 0.032 * k;

    // Shoulder / arm / hand micro-movement (left and right never in sync).
    for (let i = 0; i < 2; i++) {
        const sd = side[i];
        const seed = i * 3.7;

        sd.raise += noise(t, 0.23, seed + 2.2) * 0.0016 * k;
        sd.spread += noise(t, 0.19, seed + 3) * 0.006 * k;
        sd.elbow += noise(t, 0.21, seed + 1) * 0.012 * k;
        sd.wristZ += noise(t, 0.33, seed + 2) * 0.02 * k;

        for (let f = 0; f < 4; f++) {
            sd.fing[f] += noise(t, 0.37, seed + f * 1.9) * 0.05 * k;
        }
    }
}

/* LISTENING: attentive, mic-reactive core, rare tiny acknowledgement nod. */
function updateListeningAnimation(sim) {
    const wL = sim.w.listening;
    if (wL < 0.001) return;

    const { t, ch, nod } = sim;
    const mic = sim.audio.level;

    ch.coreBoost += wL * 0.07 * mic;
    ch.coreLightBoost += wL * 0.5 * mic;
    ch.eyeBoost += wL * 0.1 * mic;

    if (t >= nod.next) {
        nod.t0 = t;
        nod.next = t + 5 + Math.random() * 5;
    }

    ch.headPitch += wL * 0.03 * bump(t, nod.t0, 0.8);
}

/* THINKING: focused gaze scan, slow tilt, tiny shoulder/hand adjustments. */
function updateThinkingAnimation(sim, dt) {
    const wT = sim.w.thinking;
    if (wT < 0.001) return;

    const { t, ch, side, wd } = sim;

    // Processing shimmer on the core and blue light.
    ch.coreLightBoost += wT * 0.22 * Math.sin(t * 3.7);
    ch.glowBoost += wT * 0.05 * Math.sin(t * 2.3);

    // Eyes scan side to side with a slight upward drift (information search).
    ch.gazeX += wT * 0.0045 * Math.sin(t * 1.9);
    ch.gazeY += wT * 0.0016 * Math.sin(t * 1.1 + 1);

    // Slow tilt + occasional micro head movement.
    ch.headRoll += wT * 0.018 * Math.sin(t * 0.5);
    ch.headYaw += wT * stepWander(wd.thinkYaw, t, dt) * 0.035;
    ch.headPitch += wT * stepWander(wd.thinkPitch, t, dt) * 0.02;

    // One small shoulder adjustment now and then.
    const sh = stepWander(wd.thinkShoulder, t, dt);
    side[0].raise += wT * 0.003 * sh;
    side[1].raise -= wT * 0.002 * sh;

    // Hands stay relaxed, with very small adjustments.
    const f = stepWander(wd.thinkFinger, t, dt);
    side[0].curl += wT * 0.04 * f;
    side[1].curl -= wT * 0.04 * f;
    side[0].wristZ += wT * 0.03 * f;
    side[1].wristZ -= wT * 0.03 * f;
}

/* SPEAKING: voice-driven core pulse, tiny head/shoulder motion, small gestures. */
function updateSpeakingAnimation(sim) {
    const wS = sim.w.speaking;
    if (wS < 0.001) return;

    const { t, ch, side, gesture: g } = sim;
    const sp = sim.audio.speech; // 0..1, live audioLevel or synthetic

    ch.coreBoost += wS * (0.02 + 0.13 * sp);
    ch.coreLightBoost += wS * (0.15 + 0.9 * sp);
    ch.eyeBoost += wS * 0.12 * sp;
    ch.glowBoost += wS * 0.12 * sp;
    ch.visor += wS * 0.22 * sp; // faint pulse across the visor, no mouth needed

    ch.headPitch += wS * (-0.012 * sp + noise(t, 1.7, 9) * 0.014 * (0.4 + sp));
    ch.headYaw += wS * noise(t, 1.1, 3) * 0.024 * (0.5 + sp);
    ch.headRoll += wS * noise(t, 0.9, 5) * 0.014;
    ch.leanPitch += wS * 0.007 * sp;
    ch.shoulderRaise += wS * 0.0035 * sp;

    // Occasional tiny conversational gesture with one hand.
    if (t >= g.next && wS > 0.6 && sim.motionGain > 0.5) {
        g.t0 = t;
        g.dur = 0.9 + Math.random() * 0.5;
        g.side = Math.random() < 0.5 ? 0 : 1;
        g.next = t + 2.4 + Math.random() * 3.2;
    }

    const u = (t - g.t0) / g.dur;

    if (u > 0 && u < 1) {
        const e = Math.sin(PI * u) ** 2;
        const sd = side[g.side];
        const gain = 0.6 + 0.8 * sp;

        sd.elbow += wS * 0.16 * e * gain;
        sd.spread += wS * 0.04 * e;
        sd.wristZ += wS * 0.12 * Math.sin(u * TAU) * e;
        sd.curl += wS * 0.05 * e;
        sd.raise += wS * 0.002 * e;
    }
}

/*
 * ALERT / ERROR: a controlled pulse pattern on the core, eyes and floor ring
 * (2 pulses for alert, 3 for error), plus a slow head scan. No shaking.
 */
function updateAlertAnimation(sim, dt, control) {
    const wA = sim.w.alert;

    if (wA < 0.01) {
        sim.alertClock = 0; // pattern always starts cleanly on the first beat
        return;
    }

    const { ch } = sim;
    sim.alertClock += dt;

    const pulses = control.severity === "error" ? 3 : 2;
    const period = 1.5 + 0.25 * pulses;
    const u = sim.alertClock % period;

    let p = 0;
    for (let i = 0; i < pulses; i++) p = Math.max(p, bump(u, i * 0.3, 0.26));

    ch.coreBoost += wA * 0.13 * p;
    ch.coreLightBoost += wA * 1.2 * p;
    ch.eyeBoost += wA * 0.3 * p;
    ch.glowBoost += wA * 0.35 * p;
    ch.rimBoost += wA * 0.45 * p;
    ch.ringPulse = Math.max(ch.ringPulse, wA * p);

    ch.headYaw += wA * 0.035 * Math.sin(sim.alertClock * 0.8);
    ch.headPitch += wA * 0.01 * Math.sin(sim.alertClock * 1.3);
}

/* STANDBY: head droops further, glimmer instead of pulse, body sinks a hair. */
function updateStandbyAnimation(sim) {
    const wB = sim.w.standby;
    if (wB < 0.001) return;

    const { t, ch } = sim;

    ch.pelvisDrop += wB * 0.006;
    ch.headPitch += wB * 0.014 * Math.sin(t * 0.42);
    ch.eyeBoost += wB * 0.05 * Math.sin(t * 0.6);
    ch.coreLightBoost += wB * 0.05 * Math.sin(t * 0.45);
}

/* Soft wake-up flare when leaving STANDBY. */
function updateWakeAnimation(sim, mode) {
    if (sim.prevMode === "standby" && mode !== "standby") sim.wake.t0 = sim.t;
    sim.prevMode = mode;

    const flare = bump(sim.t, sim.wake.t0, 1.3);
    if (flare > 0) {
        sim.ch.eyeBoost += 0.45 * flare;
        sim.ch.ringPulse = Math.max(sim.ch.ringPulse, 0.35 * flare);
    }
}

/*
|--------------------------------------------------------------------------
| Stage 4: transient overlays
|--------------------------------------------------------------------------
*/

/* SUCCESS: 3 controlled core pulses, eye flash, nod, shoulder rise + settle. */
function updateSuccessAnimation(sim, dt, control) {
    const s = sim.success;

    if (control.successSignal !== s.signal) {
        s.signal = control.successSignal;
        if (control.mode !== "alert") s.t = 0; // alert outranks success
    }

    if (s.t < 0) return;

    s.t += dt;
    if (s.t >= SUCCESS_DURATION) {
        s.t = -1;
        return;
    }

    const { ch } = sim;
    const t = s.t;
    const g = 1 - sim.w.alert;
    const pulse = bump(t, 0.1, 0.55) + 0.8 * bump(t, 0.7, 0.55) + 0.6 * bump(t, 1.3, 0.55);

    ch.coreBoost += g * 0.15 * pulse;
    ch.coreLightBoost += g * 1.1 * pulse;
    ch.glowBoost += g * 0.25 * pulse;
    ch.eyeBoost += g * 0.4 * bump(t, 0, 1.4);
    ch.headPitch += g * 0.065 * bump(t, 0.12, 0.75); // acknowledgement nod
    ch.shoulderRaise += g * 0.007 * bump(t, 0.05, 1.5); // rise and settle
    ch.ringPulse = Math.max(ch.ringPulse, g * pulse);
}

/*
 * WAVE: REST → shoulder → forearm → wrist roll → hand wave → hold → REST.
 * Each joint has its own eased window, so the arm unfolds in sequence and
 * folds back in reverse. Writes sim.waveOut (0..1 joint progress) which the
 * apply stage blends over the normal arm pose.
 */
function updateWaveAnimation(sim, dt, control) {
    const wv = sim.wave;
    const out = sim.waveOut;
    const { ch } = sim;

    if (control.waveSignal !== wv.signal) {
        wv.signal = control.waveSignal;

        if (wv.t < 0) {
            wv.pending = true;
            wv.pendingAt = sim.t;
        }
    }

    if (wv.pending) {
        if (control.mode === "alert" || sim.t - wv.pendingAt > 2.5) {
            wv.pending = false; // ALERT outranks WAVE; stale requests expire
        } else if (sim.w.alert < 0.3 && sim.w.standby < 0.4) {
            wv.pending = false; // wait for the robot to be awake, then wave
            wv.t = 0;
        }
    }

    if (wv.t >= 0) wv.t += dt;

    if (wv.t < 0 || wv.t >= WAVE_DURATION) {
        wv.t = -1;
        out.shoulder = out.forearm = out.wrist = out.amp = out.osc = out.oscB = 0;
        return;
    }

    const t = wv.t;
    const gate = 1 - sim.w.alert;

    out.shoulder = upDown(t, 0.0, 0.5, 1.5, 2.0) * gate;
    out.forearm = upDown(t, 0.15, 0.65, 1.38, 1.88) * gate;
    out.wrist = upDown(t, 0.35, 0.75, 1.28, 1.68) * gate;
    out.amp = upDown(t, 0.6, 0.8, 1.0, 1.2) * gate;
    out.phase = (t - 0.6) * TAU * WAVE.frequency;
    out.osc = Math.sin(out.phase);
    out.oscB = Math.sin(out.phase + 1.2);

    // Friendly greeting: slight head tilt and a hair of counter-balance.
    ch.headRoll += 0.04 * out.wrist;
    ch.headPitch -= 0.02 * out.wrist;
    ch.swayRoll += 0.008 * out.shoulder;
}

/*
|--------------------------------------------------------------------------
| Stage 5: pointer look + eyes
|--------------------------------------------------------------------------
*/

/*
 * Smoothed pointer. Returns to neutral (slower) when the pointer leaves.
 * The result is ADDED to the current posture, scaled by that posture's
 * trackGain, so tracking works with thinking / speaking instead of
 * overriding them. (Pitch sign fixed: pointer up → head looks up.)
 */
function updatePointerLook(sim, dt, pointer, control) {
    const inside = control.pointerInside;
    const px = inside ? clamp(pointer.x, -1, 1) : 0;
    const py = inside ? clamp(pointer.y, -1, 1) : 0;
    const lambda = inside ? 5 : 2.2;

    sim.look.x = damp(sim.look.x, px, lambda, dt);
    sim.look.y = damp(sim.look.y, py, lambda, dt);

    const { ch, look } = sim;
    const g = ch.trackGain;

    ch.headYaw += look.x * LOOK.headYaw * g;
    ch.neckYaw += look.x * LOOK.neckYaw * g;
    ch.chestYaw += look.x * LOOK.chestYaw * g;

    ch.headPitch -= look.y * LOOK.headPitch * g;
    ch.neckPitch -= look.y * LOOK.neckPitch * g;
    ch.chestPitch -= look.y * LOOK.chestPitch * g;
}

/*
 * Eyes: irregular blink (occasional double blink, rarer when drowsy), small
 * saccadic glances, and gaze that leads the head slightly toward the pointer.
 */
function updateEyes(sim, dt) {
    const { t, ch, w, blink: b } = sim;

    // Blink scheduling (never periodic).
    if (b.start < 0 && t >= b.next) {
        b.start = t;
        b.queue = !b.second && Math.random() < 0.16;
    }

    let amount = 0;

    if (b.start >= 0) {
        const u = (t - b.start) / 0.14;

        if (u >= 1) {
            b.start = -1;

            if (b.queue) {
                b.queue = false;
                b.second = true;
                b.next = t + 0.09 + Math.random() * 0.08;
            } else {
                b.second = false;
                b.next =
                    t + (2.2 + Math.random() * 4.2) * (1 + 1.2 * w.standby + 0.6 * w.alert);
            }
        } else {
            // u^0.7 → fast close, slightly slower open.
            amount = Math.sin(PI * Math.pow(u, 0.7));
        }
    }

    sim.eyeOpen = Math.max(0.06, ch.eyeOpen * (1 - 0.92 * amount));

    // Glances calm down when attentive / focused, vanish when drowsy.
    const gain = clamp(
        1 - 0.75 * w.listening - 0.45 * w.thinking - 0.5 * w.alert - 0.65 * w.standby,
        0.1,
        1
    );

    ch.gazeX += stepWander(sim.wd.gazeX, t, dt) * 0.0035 * gain;
    ch.gazeY += stepWander(sim.wd.gazeY, t, dt) * 0.0018 * gain;

    ch.gazeX += sim.look.x * LOOK.eyeX * ch.trackGain;
    ch.gazeY += sim.look.y * LOOK.eyeY * ch.trackGain;

    // Keep the eyes on the visor.
    ch.gazeX = clamp(ch.gazeX, -0.007, 0.007);
    ch.gazeY = clamp(ch.gazeY, -0.004, 0.004);
}

/*
|--------------------------------------------------------------------------
| Assets (geometries + materials are created once, never per frame/render)
|--------------------------------------------------------------------------
*/

function createRobotAssets() {
    const materials = {
        white: new THREE.MeshStandardMaterial({
            color: 0xf3f6fa,
            metalness: 0.55,
            roughness: 0.26,
        }),
        silver: new THREE.MeshStandardMaterial({
            color: 0xb9c0c9,
            metalness: 0.9,
            roughness: 0.32,
        }),
        graphite: new THREE.MeshStandardMaterial({
            color: 0x1c1f25,
            metalness: 0.75,
            roughness: 0.42,
        }),
        // Visor emissive stays at 0 unless speaking (subtle voice pulse).
        visor: new THREE.MeshStandardMaterial({
            color: 0x04060a,
            metalness: 0.3,
            roughness: 0.06,
            emissive: 0x0a5a8a,
            emissiveIntensity: 0,
        }),
        glow: new THREE.MeshStandardMaterial({
            color: 0x06202f,
            emissive: 0x35b6ff,
            emissiveIntensity: 2.4,
            roughness: 0.4,
        }),
        eye: new THREE.MeshBasicMaterial({
            color: 0x8fdcff,
        }),
    };

    const cache = new Map();
    const geo = (key, make) => {
        let g = cache.get(key);

        if (!g) {
            g = make();
            cache.set(key, g);
        }

        return g;
    };

    const geometry = {
        sphere: (r) => geo(`s${r}`, () => new THREE.SphereGeometry(r, 32, 20)),
        cylinder: (top, bottom, h) =>
            geo(`c${top}|${bottom}|${h}`, () => new THREE.CylinderGeometry(top, bottom, h, 32)),
        torus: (r, tube) =>
            geo(`t${r}|${tube}`, () => new THREE.TorusGeometry(r, tube, 12, 48)),
        thinTorus: (r, tube) =>
            geo(`tt${r}|${tube}`, () => new THREE.TorusGeometry(r, tube, 16, 48)),
        box: (x, y, z) => geo(`b${x}|${y}|${z}`, () => new THREE.BoxGeometry(x, y, z)),
    };

    const dispose = () => {
        Object.values(materials).forEach((m) => m.dispose());
        cache.forEach((g) => g.dispose());
    };

    return { materials, geometry, dispose };
}

function useRobotAssets() {
    const assets = useMemo(createRobotAssets, []);

    useEffect(() => () => assets.dispose(), [assets]);

    return assets;
}

/*
|--------------------------------------------------------------------------
| Arm (hoisted + memoized so it is never remounted by a parent re-render)
|--------------------------------------------------------------------------
*/

const Arm = memo(function Arm({
    side,
    assets,
    shoulderRef,
    elbowRef,
    wristRef,
    fingersRef,
    thumbRef,
}) {
    const s = side === "left" ? 1 : -1;
    const { materials, geometry: g } = assets;

    return (
        <group
            ref={shoulderRef}
            position={[s * 0.26, 0.27, 0]}
            rotation={[0, 0, s * 0.58]}
        >
            {/* Shoulder */}
            <mesh geometry={g.sphere(0.052)} material={materials.graphite} />

            <mesh
                geometry={g.sphere(1)}
                material={materials.white}
                position={[s * 0.025, 0.025, 0]}
                scale={[0.075, 0.06, 0.08]}
            />

            {/* Upper arm */}
            <mesh
                geometry={g.cylinder(0.044, 0.037, 0.29)}
                material={materials.white}
                position={[0, -0.17, 0]}
            />

            {/* Blue joint ring */}
            <mesh
                geometry={g.torus(0.044, 0.005)}
                material={materials.glow}
                position={[0, -0.1, 0]}
            />

            {/* Elbow */}
            <group
                ref={elbowRef}
                position={[0, -0.315, 0]}
                rotation={[-0.12, 0, 0]}
            >
                <mesh geometry={g.sphere(0.041)} material={materials.graphite} />

                {/* Forearm */}
                <mesh
                    geometry={g.cylinder(0.039, 0.03, 0.25)}
                    material={materials.silver}
                    position={[0, -0.15, 0]}
                />

                <mesh
                    geometry={g.torus(0.035, 0.005)}
                    material={materials.glow}
                    position={[0, -0.25, 0]}
                />

                {/* Wrist */}
                <group ref={wristRef} position={[0, -0.285, 0]}>
                    <mesh
                        geometry={g.box(0.034, 0.085, 0.075)}
                        material={materials.silver}
                        position={[0, -0.05, 0]}
                    />

                    {/* Palm */}
                    <mesh
                        geometry={g.sphere(0.03)}
                        material={materials.graphite}
                        position={[0, -0.12, 0]}
                        scale={[1.1, 1.35, 1.2]}
                    />

                    {/* Fingers (each group is a knuckle pivot) */}
                    {[0, 1, 2, 3].map((index) => (
                        <group
                            key={index}
                            ref={(node) => {
                                fingersRef.current[index] = node;
                            }}
                            position={[0, -0.15, -0.027 + index * 0.018]}
                        >
                            <mesh
                                geometry={g.cylinder(0.0085, 0.0075, 0.05)}
                                material={materials.graphite}
                                position={[0, -0.025, 0]}
                                rotation={[0, 0, -s * 0.2]}
                            />
                        </group>
                    ))}

                    {/* Thumb */}
                    <mesh
                        ref={thumbRef}
                        geometry={g.cylinder(0.01, 0.009, 0.04)}
                        material={materials.graphite}
                        position={[-s * 0.018, -0.045, 0.04]}
                        rotation={[-0.6, 0, -s * 0.4]}
                    />
                </group>
            </group>
        </group>
    );
});

/*
|--------------------------------------------------------------------------
| Leg
|--------------------------------------------------------------------------
*/

const Leg = memo(function Leg({ side, assets }) {
    const s = side === "left" ? 1 : -1;
    const { materials, geometry: g } = assets;

    return (
        <group position={[s * 0.09, 0.905, 0]}>
            {/* Hip */}
            <mesh geometry={g.sphere(0.058)} material={materials.graphite} />

            {/* Upper leg */}
            <mesh
                geometry={g.cylinder(0.07, 0.052, 0.42)}
                material={materials.white}
                position={[0, -0.22, 0]}
            />

            <mesh
                geometry={g.torus(0.063, 0.006)}
                material={materials.glow}
                position={[0, -0.1, 0]}
            />

            {/* Knee */}
            <group position={[0, -0.42, 0]}>
                <mesh geometry={g.sphere(0.052)} material={materials.graphite} />

                <mesh
                    geometry={g.sphere(1)}
                    material={materials.white}
                    position={[0, 0, 0.035]}
                    scale={[0.045, 0.055, 0.04]}
                />

                {/* Lower leg */}
                <mesh
                    geometry={g.cylinder(0.052, 0.038, 0.37)}
                    material={materials.silver}
                    position={[0, -0.2, 0]}
                />

                <mesh
                    geometry={g.torus(0.042, 0.005)}
                    material={materials.glow}
                    position={[0, -0.32, 0]}
                />

                {/* Ankle */}
                <group position={[0, -0.39, 0]}>
                    <mesh geometry={g.sphere(0.04)} material={materials.graphite} />

                    {/* Foot */}
                    <mesh
                        geometry={g.sphere(1)}
                        material={materials.white}
                        position={[0, -0.055, 0.045]}
                        scale={[0.052, 0.04, 0.125]}
                    />

                    <mesh
                        geometry={g.sphere(1)}
                        material={materials.graphite}
                        position={[0, -0.075, 0.05]}
                        scale={[0.05, 0.02, 0.12]}
                    />
                </group>
            </group>
        </group>
    );
});

/*
|--------------------------------------------------------------------------
| JARVIS ROBOT
|--------------------------------------------------------------------------
| Geometry, materials and hierarchy are unchanged. All motion is computed in
| a single useFrame; there is no React state in here.
*/

const JarvisRobot = memo(function JarvisRobot({ control, fx }) {
    const robotRef = useRef(null);

    const headRef = useRef(null);
    const neckRef = useRef(null);
    const chestRef = useRef(null);
    const pelvisRef = useRef(null);
    const coreRef = useRef(null);
    const coreLightRef = useRef(null);
    const coreDiscRef = useRef(null);

    const leftShoulderRef = useRef(null);
    const rightShoulderRef = useRef(null);

    const leftElbowRef = useRef(null);
    const rightElbowRef = useRef(null);

    const leftWristRef = useRef(null);
    const rightWristRef = useRef(null);

    const leftFingersRef = useRef([]);
    const rightFingersRef = useRef([]);
    const leftThumbRef = useRef(null);
    const rightThumbRef = useRef(null);

    const leftEyes = useRef([]);
    const rightEyes = useRef([]);

    const simRef = useRef(null);
    if (!simRef.current) simRef.current = createSim();

    // Ref bundles built once, so the frame loop allocates nothing.
    const eyeRigs = useMemo(() => [leftEyes, rightEyes], []);
    const armRigs = useMemo(
        () => [
            {
                s: 1,
                shoulder: leftShoulderRef,
                elbow: leftElbowRef,
                wrist: leftWristRef,
                fingers: leftFingersRef,
                thumb: leftThumbRef,
            },
            {
                s: -1,
                shoulder: rightShoulderRef,
                elbow: rightElbowRef,
                wrist: rightWristRef,
                fingers: rightFingersRef,
                thumb: rightThumbRef,
            },
        ],
        []
    );

    const assets = useRobotAssets();
    const { materials } = assets;

    /*
     * Euler orders chosen so joints compose naturally:
     *  - head/neck/chest: yaw outermost, so pitch and roll follow the turn.
     *  - wrist: swing (z) outermost, so the hand waves in the viewer's plane
     *    even after the palm has been rolled (y) toward the camera.
     */
    useLayoutEffect(() => {
        [headRef, neckRef, chestRef].forEach((r) => {
            if (r.current) r.current.rotation.order = "YXZ";
        });

        [leftWristRef, rightWristRef].forEach((r) => {
            if (r.current) r.current.rotation.order = "ZYX";
        });
    }, []);

    /*
    |----------------------------------------------------------------------
    | Stage 6: apply channels → scene graph (damped, clamped, dt-aware)
    |----------------------------------------------------------------------
    */

    const applyPose = (dt) => {
        const sim = simRef.current;
        const { ch, side, waveOut } = sim;

        // ---- Pelvis / torso ----
        const pelvis = pelvisRef.current;
        if (pelvis) {
            pelvis.position.y = PELVIS_Y + ch.breath * 0.003 - ch.pelvisDrop;
            pelvis.position.x = damp(pelvis.position.x, ch.swayX, 4, dt);
            pelvis.rotation.z = damp(pelvis.rotation.z, ch.swayRoll, 4, dt);
            pelvis.rotation.x = damp(
                pelvis.rotation.x,
                clamp(ch.leanPitch, -0.1, 0.12),
                6,
                dt
            );
        }

        const chest = chestRef.current;
        if (chest) {
            const b = ch.breath;

            chest.scale.set(1 + b * 0.006, 1 + b * 0.012, 1 + b * 0.008);
            chest.rotation.y = damp(chest.rotation.y, clamp(ch.chestYaw, -0.14, 0.14), 6, dt);
            chest.rotation.x = damp(chest.rotation.x, clamp(ch.chestPitch, -0.06, 0.08), 6, dt);
        }

        // ---- Neck + head ----
        const neck = neckRef.current;
        if (neck) {
            neck.rotation.y = damp(neck.rotation.y, clamp(ch.neckYaw, -0.35, 0.35), 7, dt);
            neck.rotation.x = damp(neck.rotation.x, clamp(ch.neckPitch, -0.15, 0.18), 7, dt);
            neck.rotation.z = damp(neck.rotation.z, clamp(ch.headRoll * 0.3, -0.08, 0.08), 7, dt);
        }

        const head = headRef.current;
        if (head) {
            head.rotation.y = damp(head.rotation.y, clamp(ch.headYaw, -0.75, 0.75), 9, dt);
            head.rotation.x = damp(head.rotation.x, clamp(ch.headPitch, -0.42, 0.45), 9, dt);
            head.rotation.z = damp(head.rotation.z, clamp(ch.headRoll * 0.7, -0.2, 0.2), 8, dt);
        }

        // ---- Core ----
        sim.corePhase += dt * ch.coreRate;
        const pulse = Math.sin(sim.corePhase);

        if (coreRef.current) {
            coreRef.current.scale.setScalar(
                ch.coreBase * (1 + ch.coreDepth * pulse) + ch.coreBoost
            );
        }

        const coreLevel = ch.coreLight + ch.coreLightBoost;

        if (coreLightRef.current) {
            coreLightRef.current.intensity = Math.max(
                0,
                coreLevel * (1 + 1.2 * ch.coreDepth * pulse)
            );
        }

        if (coreDiscRef.current) {
            coreDiscRef.current.opacity = 0.9 * (0.55 + 0.45 * sat(coreLevel));
        }

        // ---- Shared glow / visor / eyes ----
        materials.glow.emissiveIntensity = 2.4 * clamp(ch.glow + ch.glowBoost, 0.2, 1.6);
        materials.visor.emissiveIntensity = ch.visor;

        const brightness =
            clamp(ch.eyeBright + ch.eyeBoost, 0.25, 1.7) *
            (1 + 0.03 * noise(sim.t, 2.3, 4));

        materials.eye.color.copy(EYE_COLOR).multiplyScalar(brightness);

        for (let index = 0; index < 2; index++) {
            const eye = eyeRigs[index].current[0];
            if (!eye) continue;

            eye.scale.y = EYE_BASE_HEIGHT * sim.eyeOpen;
            eye.position.x = (index === 0 ? -EYE_X : EYE_X) + ch.gazeX;
            eye.position.y = 0.112 + ch.gazeY;
        }

        // ---- Stage lights / floor rings (read by StageFx components) ----
        fx.current.rim = clamp(ch.rim + ch.rimBoost, 0.3, 1.8);
        fx.current.ring = 0.5 + 0.5 * ch.glow;
        fx.current.pulse = sat(ch.ringPulse);

        // ---- Arms ----
        for (let i = 0; i < 2; i++) {
            const rig = armRigs[i];
            const s = rig.s;
            const shoulder = rig.shoulder.current;
            const elbow = rig.elbow.current;
            const wrist = rig.wrist.current;
            const fingers = rig.fingers.current;
            const thumb = rig.thumb.current;
            const sd = side[i];
            const wv = i === WAVE_SIDE ? waveOut : null;

            const wShoulder = wv ? wv.shoulder : 0;
            const wForearm = wv ? wv.forearm : 0;
            const wWrist = wv ? wv.wrist : 0;
            const wAmp = wv ? wv.amp : 0;

            if (shoulder) {
                shoulder.position.y = damp(
                    shoulder.position.y,
                    SHOULDER_Y + ch.shoulderRaise + sd.raise + wShoulder * 0.012,
                    10,
                    dt
                );

                shoulder.rotation.z = damp(
                    shoulder.rotation.z,
                    s * lerp(0.58 + ch.armSpread + sd.spread, WAVE.shoulderZ, wShoulder),
                    9,
                    dt
                );

                shoulder.rotation.y = damp(
                    shoulder.rotation.y,
                    -s * WAVE.shoulderYaw * wShoulder,
                    9,
                    dt
                );
            }

            if (elbow) {
                elbow.rotation.x = damp(
                    elbow.rotation.x,
                    -0.12 - ch.elbowBend - sd.elbow,
                    11,
                    dt
                );

                // Forearm lift + a small forearm sway that follows the hand.
                elbow.rotation.z = damp(
                    elbow.rotation.z,
                    wv ? s * (WAVE.elbowZ * wForearm + 0.05 * wAmp * wv.oscB) : 0,
                    11,
                    dt
                );
            }

            if (wrist) {
                wrist.rotation.y = damp(wrist.rotation.y, s * WAVE.wristRoll * wWrist, 14, dt);

                wrist.rotation.z = damp(
                    wrist.rotation.z,
                    sd.wristZ + (wv ? wAmp * WAVE.wristSwing * wv.osc : 0),
                    28,
                    dt
                );
            }

            // Fingers relax / open for the wave and flutter slightly with it.
            const handCurl = clamp(ch.fingerCurl + sd.curl, -0.2, 0.45);

            for (let f = 0; f < 4; f++) {
                const node = fingers[f];
                if (!node) continue;

                let curl = lerp(handCurl + sd.fing[f], -0.08, wWrist);
                if (wv) curl += wAmp * 0.06 * Math.sin(wv.phase - f * 0.7);

                node.rotation.z = damp(node.rotation.z, -s * clamp(curl, -0.2, 0.45), 16, dt);
            }

            if (thumb) {
                const thumbCurl = lerp(handCurl, -0.08, wWrist);

                thumb.rotation.z = damp(thumb.rotation.z, -s * (0.4 + 0.5 * thumbCurl), 14, dt);
            }
        }
    };

    /*
    |----------------------------------------------------------------------
    | Frame loop
    |----------------------------------------------------------------------
    */

    useFrame((state, delta) => {
        const sim = simRef.current;
        const control_ = control.current;

        // Delta-time aware; clamped so a throttled tab can't cause a lurch.
        const dt = Math.min(delta, 1 / 20);
        sim.t += dt;

        // First frame: start in the requested mode instead of animating into it.
        if (!sim.ready) {
            MODES.forEach((m) => (sim.w[m] = m === control_.mode ? 1 : 0));
            sim.prevMode = control_.mode;
            sim.ready = true;
        }

        sim.motionGain = control_.reducedMotion ? 0.35 : 1;

        updateAudio(sim, dt, control_.audioLevel);
        updateStateWeights(sim, control_.mode, dt);
        blendPosture(sim);
        sim.ch.life *= sim.motionGain;

        // Continuous state layers (all additive).
        updateIdleAnimation(sim, dt);
        updateListeningAnimation(sim);
        updateThinkingAnimation(sim, dt);
        updateSpeakingAnimation(sim);
        updateAlertAnimation(sim, dt, control_);
        updateStandbyAnimation(sim);
        updateWakeAnimation(sim, control_.mode);

        // Transient overlays.
        updateSuccessAnimation(sim, dt, control_);
        updateWaveAnimation(sim, dt, control_);

        // Pointer tracking is layered on top, never overriding.
        updatePointerLook(sim, dt, state.pointer, control_);
        updateEyes(sim, dt);

        applyPose(dt);
    });

    /*
    |----------------------------------------------------------------------
    | Scene graph
    |----------------------------------------------------------------------
    */

    const g = assets.geometry;

    return (
        <group ref={robotRef} position={[0, -1.0, 0]}>
            {/* ======================================================
          PELVIS
      ====================================================== */}

            <group ref={pelvisRef} position={[0, 0.95, 0]}>
                <mesh
                    geometry={g.sphere(1)}
                    material={materials.graphite}
                    scale={[0.15, 0.09, 0.1]}
                />

                <mesh
                    geometry={g.sphere(1)}
                    material={materials.white}
                    position={[0, 0.02, 0]}
                    scale={[0.165, 0.07, 0.115]}
                />

                {/* ====================================================
            SPINE
        ==================================================== */}

                <group position={[0, 0.07, 0]}>
                    <mesh
                        geometry={g.cylinder(0.1, 0.11, 0.16)}
                        material={materials.graphite}
                        position={[0, 0.05, 0]}
                    />

                    <mesh
                        geometry={g.torus(0.108, 0.006)}
                        material={materials.glow}
                        position={[0, 0.05, 0]}
                    />

                    {/* ==================================================
              CHEST
          ================================================== */}

                    <group ref={chestRef} position={[0, 0.13, 0]}>
                        <mesh
                            geometry={g.sphere(1)}
                            material={materials.white}
                            position={[0, 0.15, 0]}
                            scale={[0.2, 0.19, 0.125]}
                        />

                        <mesh
                            geometry={g.sphere(1)}
                            material={materials.silver}
                            position={[0, 0.04, -0.005]}
                            scale={[0.16, 0.09, 0.1]}
                        />

                        <mesh
                            geometry={g.sphere(1)}
                            material={materials.silver}
                            position={[0, 0.17, -0.1]}
                            scale={[0.1, 0.12, 0.05]}
                        />

                        {/* Chest rings */}
                        <mesh
                            geometry={g.thinTorus(0.056, 0.012)}
                            material={materials.graphite}
                            position={[0, 0.15, 0.122]}
                        />

                        <mesh
                            geometry={g.thinTorus(0.034, 0.004)}
                            material={materials.silver}
                            position={[0, 0.15, 0.126]}
                        />

                        {/* Core */}
                        <group ref={coreRef} position={[0, 0.15, 0.15]}>
                            <mesh>
                                <circleGeometry args={[0.047, 48]} />

                                <meshBasicMaterial
                                    ref={coreDiscRef}
                                    color="#aee6ff"
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>

                            <pointLight
                                ref={coreLightRef}
                                color="#35b6ff"
                                intensity={1}
                                distance={1.5}
                            />
                        </group>

                        {/* ==================================================
                NECK
            ================================================== */}

                        <group ref={neckRef} position={[0, 0.32, 0]}>
                            <mesh
                                geometry={g.cylinder(0.034, 0.04, 0.1)}
                                material={materials.graphite}
                                position={[0, 0.02, 0]}
                            />

                            {/* =================================================
                  HEAD
              ================================================= */}

                            <group ref={headRef} position={[0, 0.06, 0]}>
                                {/* Head shell */}
                                <mesh
                                    geometry={g.sphere(1)}
                                    material={materials.white}
                                    position={[0, 0.105, -0.005]}
                                    scale={[0.095, 0.115, 0.11]}
                                />

                                {/* Visor */}
                                <mesh
                                    geometry={g.sphere(1)}
                                    material={materials.visor}
                                    position={[0, 0.108, 0.045]}
                                    scale={[0.083, 0.07, 0.075]}
                                />

                                {/* Eyes */}
                                {[-1, 1].map((side) => {
                                    const eyeRef = side === -1 ? leftEyes : rightEyes;

                                    return (
                                        <mesh
                                            key={side}
                                            ref={(node) => {
                                                eyeRef.current = node ? [node] : [];
                                            }}
                                            geometry={g.sphere(1)}
                                            material={materials.eye}
                                            position={[side * 0.036, 0.112, 0.111]}
                                            scale={[0.017, 0.008, 0.007]}
                                        />
                                    );
                                })}

                                {/* Side ear */}
                                {[-1, 1].map((side) => (
                                    <mesh
                                        key={side}
                                        geometry={g.cylinder(0.03, 0.03, 0.03)}
                                        material={materials.graphite}
                                        position={[side * 0.098, 0.105, 0]}
                                        rotation={[0, 0, PI / 2]}
                                    />
                                ))}

                                {/* Head ring */}
                                <mesh
                                    geometry={g.thinTorus(0.022, 0.003)}
                                    material={materials.glow}
                                    position={[0, 0.215, 0.02]}
                                    rotation={[PI / 2, 0, 0]}
                                />
                            </group>
                        </group>

                        {/* ==================================================
                ARMS
            ================================================== */}

                        <Arm
                            side="left"
                            assets={assets}
                            shoulderRef={leftShoulderRef}
                            elbowRef={leftElbowRef}
                            wristRef={leftWristRef}
                            fingersRef={leftFingersRef}
                            thumbRef={leftThumbRef}
                        />

                        <Arm
                            side="right"
                            assets={assets}
                            shoulderRef={rightShoulderRef}
                            elbowRef={rightElbowRef}
                            wristRef={rightWristRef}
                            fingersRef={rightFingersRef}
                            thumbRef={rightThumbRef}
                        />
                    </group>
                </group>
            </group>

            {/* ======================================================
          LEGS
      ====================================================== */}

            <Leg side="left" assets={assets} />
            <Leg side="right" assets={assets} />
        </group>
    );
});

/*
|--------------------------------------------------------------------------
| Stage FX (blue rim light + floor rings), driven by the robot via `fx`
|--------------------------------------------------------------------------
*/

function RimLight({ fx }) {
    const lightRef = useRef(null);

    useFrame(() => {
        if (lightRef.current) lightRef.current.intensity = 0.9 * fx.current.rim;
    });

    return (
        <pointLight
            ref={lightRef}
            color="#3fb8ff"
            intensity={0.9}
            distance={8}
            position={[-2, 1.6, -2]}
        />
    );
}

function FloorRings({ fx }) {
    const innerMat = useRef(null);
    const outerMat = useRef(null);
    const outerMesh = useRef(null);

    useFrame(() => {
        const { ring, pulse } = fx.current;

        if (innerMat.current) innerMat.current.opacity = clamp(0.7 * ring + 0.3 * pulse, 0, 1);
        if (outerMat.current) outerMat.current.opacity = clamp(0.35 * ring + 0.45 * pulse, 0, 1);
        if (outerMesh.current) outerMesh.current.scale.setScalar(1 + 0.05 * pulse);
    });

    return (
        <>
            <mesh rotation={[-PI / 2, 0, 0]} position={[0, -1.375, 0]}>
                <ringGeometry args={[0.7, 0.706, 96]} />

                <meshBasicMaterial
                    ref={innerMat}
                    color="#4fc3ff"
                    transparent
                    opacity={0.7}
                />
            </mesh>

            <mesh
                ref={outerMesh}
                rotation={[-PI / 2, 0, 0]}
                position={[0, -1.374, 0]}
            >
                <ringGeometry args={[0.9, 0.906, 96]} />

                <meshBasicMaterial
                    ref={outerMat}
                    color="#4fc3ff"
                    transparent
                    opacity={0.35}
                />
            </mesh>
        </>
    );
}

/*
|--------------------------------------------------------------------------
| JARVIS CANVAS
|--------------------------------------------------------------------------
*/

/* Keeps the latest value in a ref without re-subscribing effects. */
function useLatest(value) {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref;
}

const Jarvis = forwardRef(function Jarvis(
    {
        state = "idle",
        isTyping = false,
        wave = false,
        audioLevel = 0,
        alert = false,
        standbyAfter = DEFAULT_STANDBY_AFTER,
    },
    ref
) {
    const request = useMemo(
        () => resolveRequest({ state, isTyping, alert }),
        [state, isTyping, alert]
    );

    /* Mutable channel into the render loop. Never triggers a React render. */
    const control = useRef({
        mode: request.mode,
        severity: request.severity,
        audioLevel,
        pointerInside: false,
        waveSignal: 0,
        successSignal: 0,
        reducedMotion: false,
    });

    const fx = useRef({ rim: 1, ring: 1, pulse: 0 });

    /* Low-frequency React state: only what the status badge needs. */
    const [inactive, setInactive] = useState(false);
    const [successActive, setSuccessActive] = useState(false);

    const inactiveRef = useRef(false);
    const lastActive = useRef(typeof performance !== "undefined" ? performance.now() : 0);
    const successTimer = useRef(null);

    // Auto-standby only applies on top of IDLE; real activity always wins.
    const mode = request.mode === "idle" && inactive ? "standby" : request.mode;

    const requestedModeRef = useLatest(request.mode);
    const standbyAfterRef = useLatest(standbyAfter);

    /* ---- activity / standby ---- */

    const markActive = useCallback(() => {
        lastActive.current = performance.now();

        if (inactiveRef.current) {
            inactiveRef.current = false;
            setInactive(false);
        }
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            if (requestedModeRef.current !== "idle") {
                lastActive.current = performance.now(); // busy → never sleeps
                return;
            }

            const limit = standbyAfterRef.current;
            if (!limit || inactiveRef.current) return;

            if (performance.now() - lastActive.current > limit) {
                inactiveRef.current = true;
                setInactive(true);
            }
        }, 1000);

        return () => clearInterval(id);
    }, [requestedModeRef, standbyAfterRef]);

    useEffect(() => {
        markActive();
    }, [state, isTyping, alert, wave, markActive]);

    /* ---- one-shots ---- */

    const fireWave = useCallback(() => {
        control.current.waveSignal += 1;
        markActive();
    }, [markActive]);

    const fireSuccess = useCallback(() => {
        control.current.successSignal += 1;
        markActive();
        setSuccessActive(true);

        clearTimeout(successTimer.current);
        successTimer.current = setTimeout(
            () => setSuccessActive(false),
            SUCCESS_DURATION * 1000
        );
    }, [markActive]);

    useEffect(() => () => clearTimeout(successTimer.current), []);

    const normalized = normalizeState(state);
    const waveRequested = wave || normalized === "wave";
    const successRequested = normalized === "success";

    // Rising edge only: `wave` held true plays one wave, not a loop.
    const prevWave = useRef(false);
    useEffect(() => {
        if (waveRequested && !prevWave.current) fireWave();
        prevWave.current = waveRequested;
    }, [waveRequested, fireWave]);

    const prevSuccess = useRef(false);
    useEffect(() => {
        if (successRequested && !prevSuccess.current) fireSuccess();
        prevSuccess.current = successRequested;
    }, [successRequested, fireSuccess]);

    useImperativeHandle(
        ref,
        () => ({
            trigger(name) {
                const key = normalizeState(name);

                if (key === "wave") fireWave();
                if (key === "success") fireSuccess();
            },
            wake: markActive,
        }),
        [fireWave, fireSuccess, markActive]
    );

    /* ---- sync props → control ref ---- */

    useEffect(() => {
        control.current.mode = mode;
        control.current.severity = request.severity;
    }, [mode, request.severity]);

    useEffect(() => {
        control.current.audioLevel = audioLevel;
    }, [audioLevel]);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return undefined;

        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => {
            control.current.reducedMotion = query.matches;
        };

        sync();
        query.addEventListener?.("change", sync);

        return () => query.removeEventListener?.("change", sync);
    }, []);

    /* ---- pointer presence (tracking itself still comes from R3F's pointer) ---- */

    const handlePointerMove = useCallback(() => {
        control.current.pointerInside = true;
        markActive();
    }, [markActive]);

    const handlePointerLeave = useCallback(() => {
        control.current.pointerInside = false;
    }, []);

    /* ---- status ---- */

    let statusKey = mode;
    if (successActive && mode !== "alert") statusKey = "success";

    const status = STATUS[statusKey];

    return (
        <div
            className="
        relative
        h-[430px]
        w-full
        sm:h-[470px]
        lg:h-[520px]
      "
            onPointerEnter={handlePointerMove}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {/* Status */}
            <div
                role="status"
                aria-live="polite"
                className="
          pointer-events-none
          absolute
          left-1/2
          top-5
          z-20
          flex
          min-w-[10.5rem]
          -translate-x-1/2
          items-center
          justify-center
          gap-2
          whitespace-nowrap
          rounded-full
          border
          border-blue-100
          bg-white/90
          px-4
          py-2
          text-xs
          font-medium
          tracking-wide
          text-gray-500
          shadow-sm
          backdrop-blur
        "
            >
                <span className="relative flex h-2 w-2">
                    {status.ping && (
                        <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none"
                            style={{
                                backgroundColor: status.color,
                                animationDuration: status.ping,
                            }}
                        />
                    )}

                    <span
                        className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-500"
                        style={{ backgroundColor: status.color }}
                    />
                </span>

                <span>JARVIS · {status.text}</span>
            </div>

            <Canvas
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 1.05, 4.8],
                    fov: 28,
                    near: 0.1,
                    far: 50,
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                }}
                shadows
            >
                {/* Main light */}
                <directionalLight
                    position={[3, 5, 4]}
                    intensity={1.3}
                    castShadow
                />

                {/* Cool ambient */}
                <hemisphereLight
                    color="#cfe6ff"
                    groundColor="#202833"
                    intensity={0.55}
                />

                {/* Blue rim (intensity driven by the robot's state) */}
                <RimLight fx={fx} />

                <JarvisRobot control={control} fx={fx} />

                {/* Floor */}
                <mesh
                    rotation={[-PI / 2, 0, 0]}
                    position={[0, -1.38, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[8, 8]} />

                    <shadowMaterial transparent opacity={0.28} />
                </mesh>

                {/* Contact shadow */}
                <ContactShadows
                    position={[0, -1.38, 0]}
                    opacity={0.28}
                    scale={3}
                    blur={2.2}
                    far={4}
                />

                {/* Blue floor rings (react to success / alert / wake) */}
                <FloorRings fx={fx} />
            </Canvas>
        </div>
    );
});

export default Jarvis;