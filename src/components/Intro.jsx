import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
    ArrowUpRight,
    AudioLines,
    Cpu,
    Fingerprint,
    Orbit,
    Radar,
    Scan,
    ShieldCheck,
    Sparkles,
    Terminal,
    VolumeX,
    Zap,
} from "lucide-react";
import "./intro.css";

const Intro = ({ onEnter }) => {
    const rootRef = useRef(null);
    const gridRef = useRef(null);
    const scanRef = useRef(null);

    const orbitSystemRef = useRef(null);
    const orbitARef = useRef(null);
    const orbitBRef = useRef(null);
    const orbitCRef = useRef(null);
    const haloRef = useRef(null);

    const coreRef = useRef(null);
    const coreInnerRef = useRef(null);
    const coreLightRef = useRef(null);
    const coreGlintRef = useRef(null);
    const coreSymbolRef = useRef(null);
    const coreLabelRef = useRef(null);

    const statusLeftRef = useRef(null);
    const statusRightRef = useRef(null);
    const dotRefs = useRef([]);

    const contentRef = useRef(null);
    const eyebrowRef = useRef(null);
    const eyebrowLineLRef = useRef(null);
    const eyebrowLineRRef = useRef(null);
    const nameRef = useRef(null);
    const nameLineRefs = useRef([]);
    const roleRef = useRef(null);
    const greetingRef = useRef(null);
    const greetingCursorRef = useRef(null);

    const hudRef = useRef(null);
    const hudItemRefs = useRef([]);

    const progressSectionRef = useRef(null);
    const progressTopRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressTextRef = useRef(null);
    const progressBottomRef = useRef(null);

    const confirmRef = useRef(null);
    const confirmOverlineRef = useRef(null);
    const confirmTitleRef = useRef(null);
    const confirmSubRef = useRef(null);
    const enterRef = useRef(null);

    const headerRef = useRef(null);
    const footerRef = useRef(null);

    const timelineRef = useRef(null);
    const exitRef = useRef(null);

    const [phase, setPhase] = useState("loading");
    const [voiceMuted, setVoiceMuted] = useState(false);
    const [voiceBlocked, setVoiceBlocked] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    /* ---------------- Speech (heptic auto, mute button) ---------------- */
    const speak = useCallback(() => {
        if (typeof window === "undefined") return false;
        if (!("speechSynthesis" in window)) return false;

        try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(
                "Hey there. Welcome to Pratik Mohanty's portfolio."
            );
            utterance.rate = 0.94;
            utterance.pitch = 1.0;
            utterance.volume = 0.9;
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find((v) => /en-IN|en-US|en-GB/i.test(v.lang));
            if (voice) utterance.voice = voice;
            window.speechSynthesis.speak(utterance);

            window.setTimeout(() => {
                if (!window.speechSynthesis.speaking) setVoiceBlocked(true);
            }, 500);
            return true;
        } catch {
            return false;
        }
    }, []);

    const stopSpeech = useCallback(() => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }, []);

    useEffect(() => {
        if (reducedMotion || voiceMuted) return;
        const t = window.setTimeout(() => {
            const ok = speak();
            if (!ok) setVoiceBlocked(true);
        }, 1000);
        return () => window.clearTimeout(t);
    }, [speak, reducedMotion, voiceMuted]);

    const toggleVoice = () => {
        if (voiceMuted) {
            setVoiceMuted(false);
            speak();
        } else {
            stopSpeech();
            setVoiceMuted(true);
        }
    };

    /* ---------------- Reduced motion ---------------- */
    useLayoutEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(media.matches);
        update();
        media.addEventListener?.("change", update);
        return () => media.removeEventListener?.("change", update);
    }, []);

    /* ================================================================
       MASTER TIMELINE — layered, choreographed, staged
       Stage 1: grid + scan + chrome frame in
       Stage 2: orbit rings assemble
       Stage 3: glass core lands + refract
       Stage 4: typography cascade (eyebrow → name L1 → name L2 → role → greeting)
       Stage 5: HUD telemetry row + progress
       Stage 6: progress completes → progress dissolves → gate materializes
       ================================================================ */
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const reduced = reducedMotion;

            /* ---------- Initial states ---------- */
            gsap.set(root, { autoAlpha: 1 });

            gsap.set([headerRef.current, footerRef.current], {
                autoAlpha: 0,
                y: reduced ? 0 : -8,
            });

            gsap.set(gridRef.current, { autoAlpha: 0 });
            gsap.set(scanRef.current, { autoAlpha: 0 });

            gsap.set(orbitSystemRef.current, { autoAlpha: 0 });
            gsap.set(orbitARef.current, { scale: reduced ? 1 : 0.4, rotate: -90 });
            gsap.set(orbitBRef.current, { scale: reduced ? 1 : 0.6, rotate: 60 });
            gsap.set(orbitCRef.current, { scale: reduced ? 1 : 0.5, rotate: -40 });
            gsap.set(haloRef.current, { autoAlpha: 0, scale: reduced ? 1 : 0.5 });

            gsap.set(coreRef.current, {
                autoAlpha: reduced ? 1 : 0,
                scale: reduced ? 1 : 0.55,
                rotateX: reduced ? 0 : 35,
                rotateY: reduced ? 0 : -35,
                rotateZ: reduced ? 0 : -8,
                transformPerspective: 1000,
            });
            gsap.set(coreLightRef.current, { backgroundPosition: "0% 50%" });
            gsap.set(coreGlintRef.current, { autoAlpha: 0, scaleX: 0.3 });
            gsap.set([coreSymbolRef.current, coreLabelRef.current], { autoAlpha: 0 });

            gsap.set([statusLeftRef.current, statusRightRef.current], {
                autoAlpha: 0,
                x: reduced ? 0 : -12,
            });
            gsap.set(dotRefs.current, { autoAlpha: 0, scale: 0 });

            gsap.set(eyebrowRef.current, { autoAlpha: 0, y: reduced ? 0 : 10 });
            gsap.set([eyebrowLineLRef.current, eyebrowLineRRef.current], {
                scaleX: 0,
                transformOrigin: "center",
            });
            gsap.set(nameRef.current, { autoAlpha: 0 });
            gsap.set(nameLineRefs.current, { yPercent: reduced ? 0 : 120 });
            gsap.set(roleRef.current, { autoAlpha: 0, y: reduced ? 0 : 12 });
            gsap.set(greetingRef.current, { autoAlpha: 0, y: reduced ? 0 : 12 });
            gsap.set(greetingCursorRef.current, { scale: reduced ? 1 : 0 });

            gsap.set(hudRef.current, { autoAlpha: 0 });
            gsap.set(hudItemRefs.current, { autoAlpha: 0, y: reduced ? 0 : 14 });

            gsap.set(progressSectionRef.current, { autoAlpha: 0, y: reduced ? 0 : 10 });
            gsap.set(progressTopRef.current, { autoAlpha: 0 });
            gsap.set(progressBarRef.current, {
                scaleX: 0,
                transformOrigin: "left center",
            });
            gsap.set(progressBottomRef.current, { autoAlpha: 0 });

            gsap.set(confirmRef.current, { autoAlpha: 0 });
            gsap.set(confirmOverlineRef.current, { autoAlpha: 0, y: reduced ? 0 : 8 });
            gsap.set(confirmTitleRef.current, { autoAlpha: 0, y: reduced ? 0 : 14 });
            gsap.set(confirmSubRef.current, { autoAlpha: 0, y: reduced ? 0 : 10 });
            gsap.set(enterRef.current, { autoAlpha: 0, y: reduced ? 0 : 18, scale: 0.96 });

            /* ---------- Master timeline ---------- */
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    setPhase("confirm");
                    playConfirmIn();
                },
            });
            timelineRef.current = tl;

            const D = (n) => (reduced ? 0 : n);

            /* Stage 1 — chrome frame + grid + scan */
            tl.to(headerRef.current, { autoAlpha: 1, y: 0, duration: D(0.6) }, 0)
                .to(footerRef.current, { autoAlpha: 1, y: 0, duration: D(0.6) }, 0.05)
                .to(gridRef.current, { autoAlpha: 1, duration: D(0.9) }, 0.1)
                .to(scanRef.current, { autoAlpha: 1, duration: D(0.5) }, 0.2)

                /* Stage 2 — orbits assemble */
                .to(
                    orbitSystemRef.current,
                    { autoAlpha: 1, duration: D(0.4) },
                    0.35
                )
                .to(
                    orbitARef.current,
                    {
                        scale: 1,
                        rotate: 0,
                        duration: D(1.2),
                        ease: "expo.out",
                    },
                    0.4
                )
                .to(
                    orbitBRef.current,
                    {
                        scale: 1,
                        rotate: 0,
                        duration: D(1.3),
                        ease: "expo.out",
                    },
                    0.5
                )
                .to(
                    orbitCRef.current,
                    {
                        scale: 1,
                        rotate: 0,
                        duration: D(1.4),
                        ease: "expo.out",
                    },
                    0.6
                )
                .to(
                    haloRef.current,
                    { autoAlpha: 0.9, scale: 1, duration: D(1.2) },
                    0.7
                )

                /* Stage 3 — glass core lands */
                .to(
                    coreRef.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        duration: D(1.5),
                        ease: "expo.out",
                    },
                    0.85
                )
                .to(
                    coreGlintRef.current,
                    { autoAlpha: 1, scaleX: 1, duration: D(0.8) },
                    1.35
                )
                .to(
                    [coreSymbolRef.current, coreLabelRef.current],
                    { autoAlpha: 1, duration: D(0.6), stagger: D(0.15) },
                    1.4
                )
                .to(
                    statusLeftRef.current,
                    { autoAlpha: 1, x: 0, duration: D(0.6) },
                    1.55
                )
                .to(
                    statusRightRef.current,
                    { autoAlpha: 1, x: 0, duration: D(0.6) },
                    1.7
                )
                .to(
                    dotRefs.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: D(0.4),
                        stagger: D(0.1),
                    },
                    1.75
                )

                /* Stage 4 — typography cascade */
                .to(
                    [eyebrowLineLRef.current, eyebrowLineRRef.current],
                    {
                        scaleX: 1,
                        duration: D(0.6),
                        stagger: D(0.08),
                    },
                    1.9
                )
                .to(
                    eyebrowRef.current,
                    { autoAlpha: 1, y: 0, duration: D(0.6) },
                    2.0
                )
                .to(
                    nameRef.current,
                    { autoAlpha: 1, duration: D(0.2) },
                    2.15
                )
                .to(
                    nameLineRefs.current,
                    {
                        yPercent: 0,
                        duration: D(1.0),
                        stagger: D(0.14),
                        ease: "expo.out",
                    },
                    2.15
                )
                .to(
                    roleRef.current,
                    { autoAlpha: 1, y: 0, duration: D(0.55) },
                    2.9
                )
                .to(
                    greetingRef.current,
                    { autoAlpha: 1, y: 0, duration: D(0.55) },
                    3.05
                )
                .to(
                    greetingCursorRef.current,
                    {
                        scale: 1,
                        duration: D(0.35),
                        ease: "back.out(2.5)",
                    },
                    3.25
                )

                /* Stage 5 — HUD telemetry */
                .to(
                    hudRef.current,
                    { autoAlpha: 1, duration: D(0.4) },
                    3.3
                )
                .to(
                    hudItemRefs.current,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: D(0.55),
                        stagger: D(0.08),
                    },
                    3.35
                )
                .to(
                    progressSectionRef.current,
                    { autoAlpha: 1, y: 0, duration: D(0.5) },
                    3.6
                )
                .to(
                    progressTopRef.current,
                    { autoAlpha: 1, duration: D(0.4) },
                    3.7
                )
                .to(
                    progressBarRef.current,
                    {
                        scaleX: 1,
                        duration: D(1.6),
                        ease: "power2.inOut",
                    },
                    3.8
                )
                .to(
                    progressTextRef.current,
                    {
                        textContent: "100%",
                        duration: D(1.6),
                        snap: { textContent: 1 },
                        ease: "power2.inOut",
                    },
                    3.8
                )
                .to(
                    progressBottomRef.current,
                    { autoAlpha: 1, duration: D(0.4) },
                    4.0
                )

                /* Stage 6 — dissolve the loading chrome, hold one beat */
                .to({}, { duration: D(0.35) });

            /* Continuous loops (skipped under reduced motion) */
            if (!reduced) {
                gsap.to(coreLightRef.current, {
                    backgroundPosition: "200% 50%",
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
                gsap.to(orbitARef.current, {
                    rotation: 360,
                    duration: 26,
                    repeat: -1,
                    ease: "none",
                });
                gsap.to(orbitBRef.current, {
                    rotation: -360,
                    duration: 38,
                    repeat: -1,
                    ease: "none",
                });
                gsap.to(orbitCRef.current, {
                    rotation: 360,
                    duration: 48,
                    repeat: -1,
                    ease: "none",
                });
                gsap.to(scanRef.current, {
                    yPercent: 260,
                    duration: 4.5,
                    repeat: -1,
                    ease: "none",
                });
                gsap.to(dotRefs.current, {
                    opacity: 0.15,
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    stagger: 0.2,
                    ease: "sine.inOut",
                });
                gsap.to(greetingCursorRef.current, {
                    scale: 1.35,
                    duration: 1.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
                gsap.to(coreRef.current, {
                    y: -6,
                    duration: 3.6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            /* =========================================================
               Confirm-in: dissolve loader chrome (HUD / progress / stars),
               keep core + name anchored, materialize gate.
               This is the "logical transition" between loading → gate.
               ========================================================= */
            function playConfirmIn() {
                const ctl = gsap.timeline({ defaults: { ease: "power3.out" } });

                /* Fade out the loading-phase telemetry */
                ctl.to(
                    [hudRef.current, progressSectionRef.current],
                    {
                        autoAlpha: 0,
                        y: reduced ? 0 : -10,
                        duration: reduced ? 0 : 0.5,
                        stagger: reduced ? 0 : 0.08,
                    },
                    0
                )
                    .to(
                        [statusLeftRef.current, statusRightRef.current],
                        {
                            autoAlpha: 0,
                            x: reduced ? 0 : 10,
                            duration: reduced ? 0 : 0.45,
                        },
                        0.05
                    )
                    .to(
                        dotRefs.current,
                        { autoAlpha: 0, scale: 0.5, duration: reduced ? 0 : 0.35 },
                        0.05
                    )
                    /* Small core "breath" as the state changes */
                    .to(
                        coreRef.current,
                        {
                            scale: reduced ? 1 : 1.08,
                            duration: reduced ? 0 : 0.5,
                            ease: "power2.inOut",
                        },
                        0
                    )
                    .to(
                        coreRef.current,
                        {
                            scale: 1,
                            duration: reduced ? 0 : 0.6,
                            ease: "power3.out",
                        },
                        0.5
                    )
                    /* Rings settle slightly inward — signals "lock" */
                    .to(
                        [orbitBRef.current, orbitCRef.current],
                        {
                            scale: reduced ? 1 : 0.96,
                            duration: reduced ? 0 : 0.8,
                            ease: "power2.inOut",
                        },
                        0
                    )
                    /* Gate materializes */
                    .to(
                        confirmRef.current,
                        { autoAlpha: 1, duration: reduced ? 0 : 0.4 },
                        0.3
                    )
                    .to(
                        confirmOverlineRef.current,
                        { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.5 },
                        0.4
                    )
                    .to(
                        confirmTitleRef.current,
                        { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.6 },
                        0.5
                    )
                    .to(
                        confirmSubRef.current,
                        { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.5 },
                        0.62
                    )
                    .to(
                        enterRef.current,
                        {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            duration: reduced ? 0 : 0.7,
                            ease: "back.out(1.4)",
                        },
                        0.7
                    );
            }
        }, root);

        return () => ctx.revert();
    }, [reducedMotion]);

    /* ---------------- Skip → jump to gate with same logical dissolve ---------------- */
    const handleSkip = () => {
        if (phase !== "loading") return;

        const reduced = reducedMotion;
        timelineRef.current?.pause();

        const skipTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
                setPhase("confirm");
            },
        });

        skipTl
            /* fast-forward the entrance */
            .to(
                [headerRef.current, footerRef.current, gridRef.current],
                { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.25 },
                0
            )
            .to(
                [orbitSystemRef.current, haloRef.current, coreRef.current],
                { autoAlpha: 1, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, duration: reduced ? 0 : 0.4 },
                0
            )
            .to(
                [eyebrowRef.current, nameRef.current, roleRef.current, greetingRef.current, hudRef.current],
                { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.3 },
                0.05
            )
            .to(
                nameLineRefs.current,
                { yPercent: 0, duration: reduced ? 0 : 0.4 },
                0.05
            )
            .to(
                progressSectionRef.current,
                { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.3 },
                0.1
            )
            .to(
                progressBarRef.current,
                { scaleX: 1, duration: reduced ? 0 : 0.5 },
                0.15
            )
            .set(progressTextRef.current, { textContent: "100%" }, 0.15)
            /* then dissolve into the gate */
            .to(
                [hudRef.current, progressSectionRef.current],
                { autoAlpha: 0, y: reduced ? 0 : -10, duration: reduced ? 0 : 0.35 },
                0.55
            )
            .to(
                confirmRef.current,
                { autoAlpha: 1, duration: reduced ? 0 : 0.35 },
                0.7
            )
            .to(
                [confirmOverlineRef.current, confirmTitleRef.current, confirmSubRef.current],
                { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.4, stagger: reduced ? 0 : 0.06 },
                0.75
            )
            .to(
                enterRef.current,
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: reduced ? 0 : 0.5,
                    ease: "back.out(1.4)",
                },
                0.95
            );
    };

    /* ---------------- Enter (the gate) ---------------- */
    const handleEnter = () => {
        if (phase !== "confirm") return;

        setPhase("exiting");
        stopSpeech();

        const reduced = reducedMotion;
        const tl = gsap.timeline({
            onComplete: () => {
                setPhase("done");
                onEnter?.();
            },
        });
        exitRef.current = tl;

        if (reduced) {
            tl.to(rootRef.current, { autoAlpha: 0, duration: 0.2 });
            return;
        }

        /* Choreographed exit:
           1. Gate collapses (button first, then overline/title/sub)
           2. Rings contract inward
           3. Core dives toward the viewer
           4. Type slides up and dissolves
           5. Chrome frame closes
           6. Root fades */
        tl.to(enterRef.current, {
            autoAlpha: 0,
            y: 12,
            scale: 0.96,
            duration: 0.3,
            ease: "power2.in",
        })
            .to(
                [confirmOverlineRef.current, confirmTitleRef.current, confirmSubRef.current],
                { autoAlpha: 0, y: -10, duration: 0.3, stagger: 0.05 },
                0.05
            )
            .to(
                [orbitARef.current, orbitBRef.current, orbitCRef.current],
                {
                    scale: 0.7,
                    autoAlpha: 0,
                    duration: 0.7,
                    stagger: 0.06,
                    ease: "power3.inOut",
                },
                0.2
            )
            .to(
                haloRef.current,
                { scale: 1.4, autoAlpha: 0, duration: 0.7 },
                0.2
            )
            .to(
                coreRef.current,
                {
                    scale: 1.6,
                    rotateX: 20,
                    rotateZ: 6,
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                0.25
            )
            .to(
                [eyebrowRef.current, roleRef.current, greetingRef.current],
                { autoAlpha: 0, y: -20, duration: 0.5, stagger: 0.05 },
                0.3
            )
            .to(
                nameLineRefs.current,
                {
                    yPercent: -110,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power3.in",
                },
                0.35
            )
            .to(
                [headerRef.current, footerRef.current],
                { autoAlpha: 0, y: 12, duration: 0.5 },
                0.6
            )
            .to(
                [gridRef.current, scanRef.current],
                { autoAlpha: 0, duration: 0.5 },
                0.7
            )
            .to(rootRef.current, { autoAlpha: 0, duration: 0.5 }, 0.9);
    };

    /* ---------------- Cleanup ---------------- */
    useLayoutEffect(() => {
        return () => {
            timelineRef.current?.kill();
            exitRef.current?.kill();
            stopSpeech();
        };
    }, [stopSpeech]);

    return (
        <div
            ref={rootRef}
            className={`hud-intro ${phase === "done" ? "hud-intro-done" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Pratik Mohanty portfolio introduction"
            aria-hidden={phase === "done"}
        >
            <div ref={gridRef} className="hud-grid" aria-hidden="true" />
            <div className="hud-softlight" aria-hidden="true" />
            <div className="hud-vignette" aria-hidden="true" />
            <div ref={scanRef} className="hud-scan-line" aria-hidden="true" />

            {/* Header */}
            <header ref={headerRef} className="hud-header">
                <div className="hud-brand">
                    <span className="hud-brand-mark">P.</span>
                    <span>PM / DIGITAL SYSTEMS</span>
                </div>

                <div className="hud-header-right">
                    <span className="hud-live">
                        <span className="hud-live-dot" />
                        SYSTEM ONLINE
                    </span>

                    <button
                        type="button"
                        className={`hud-small-button ${voiceMuted ? "is-muted" : ""} ${voiceBlocked && !voiceMuted ? "is-hint" : ""
                            }`}
                        onClick={toggleVoice}
                        aria-pressed={!voiceMuted}
                        aria-label={voiceMuted ? "Unmute system voice" : "Mute system voice"}
                    >
                        {voiceMuted ? <VolumeX size={14} /> : <AudioLines size={14} />}
                        {voiceMuted ? "VOICE OFF" : voiceBlocked ? "TAP FOR VOICE" : "VOICE ON"}
                    </button>

                    {phase === "loading" && (
                        <button
                            type="button"
                            className="hud-small-button"
                            onClick={handleSkip}
                        >
                            SKIP <ArrowUpRight size={13} />
                        </button>
                    )}
                </div>
            </header>

            {/* Main */}
            <main className="hud-main">
                <section className="hud-visual" aria-hidden="true">
                    <div ref={orbitSystemRef} className="hud-orbit-system">
                        <div ref={orbitARef} className="hud-orbit hud-orbit-a">
                            <span className="hud-orbit-node hud-node-a" />
                            <span className="hud-orbit-node hud-node-b" />
                        </div>

                        <div ref={orbitBRef} className="hud-orbit hud-orbit-b">
                            <span className="hud-orbit-node hud-node-c" />
                        </div>

                        <div ref={orbitCRef} className="hud-orbit hud-orbit-c" />

                        <div ref={haloRef} className="hud-core-halo" />
                    </div>

                    <div ref={coreRef} className="hud-core">
                        <div ref={coreInnerRef} className="hud-core-inner">
                            <div ref={coreLightRef} className="hud-core-light" />
                            <div ref={coreSymbolRef} className="hud-core-symbol">
                                <Fingerprint size={54} strokeWidth={0.9} />
                            </div>
                            <span ref={coreLabelRef} className="hud-core-label">
                                IDENTITY / PM
                            </span>
                        </div>
                        <div ref={coreGlintRef} className="hud-core-glint" />
                    </div>

                    <div ref={statusLeftRef} className="hud-status-label hud-status-left">
                        <Scan size={13} />
                        <span>IDENTITY RECOGNIZED</span>
                    </div>

                    <div ref={statusRightRef} className="hud-status-label hud-status-right">
                        <Radar size={14} />
                        <span>INTERFACE READY</span>
                    </div>

                    <div
                        ref={(el) => (dotRefs.current[0] = el)}
                        className="hud-data-dot hud-dot-one"
                    />
                    <div
                        ref={(el) => (dotRefs.current[1] = el)}
                        className="hud-data-dot hud-dot-two"
                    />
                    <div
                        ref={(el) => (dotRefs.current[2] = el)}
                        className="hud-data-dot hud-dot-three"
                    />
                </section>

                <section ref={contentRef} className="hud-content">
                    <p ref={eyebrowRef} className="hud-eyebrow">
                        <span ref={eyebrowLineLRef} className="hud-eyebrow-line" />
                        WELCOME TO MY DIGITAL SPACE
                        <span ref={eyebrowLineRRef} className="hud-eyebrow-line" />
                    </p>

                    <h1 ref={nameRef} className="hud-name">
                        <span className="hud-name-mask">
                            <span
                                ref={(el) => (nameLineRefs.current[0] = el)}
                                className="hud-name-line"
                            >
                                PRATIK
                            </span>
                        </span>
                        <span className="hud-name-mask hud-name-outline">
                            <span
                                ref={(el) => (nameLineRefs.current[1] = el)}
                                className="hud-name-line"
                            >
                                MOHANTY
                            </span>
                        </span>
                    </h1>

                    <p ref={roleRef} className="hud-role">
                        SOFTWARE ENGINEER
                        <span className="hud-role-divider">/</span>
                        FULL STACK DEVELOPER
                    </p>

                    <p ref={greetingRef} className="hud-greeting">
                        <span ref={greetingCursorRef} className="hud-greeting-cursor" />
                        Hey there. Welcome to my portfolio.
                    </p>
                </section>

                <section ref={hudRef} className="hud-info">
                    <div ref={(el) => (hudItemRefs.current[0] = el)} className="hud-info-item">
                        <Cpu size={16} />
                        <span>ENGINE</span>
                        <strong>REACT</strong>
                    </div>
                    <div ref={(el) => (hudItemRefs.current[1] = el)} className="hud-info-item">
                        <Orbit size={16} />
                        <span>MOTION</span>
                        <strong>GSAP</strong>
                    </div>
                    <div ref={(el) => (hudItemRefs.current[2] = el)} className="hud-info-item">
                        <ShieldCheck size={16} />
                        <span>STATUS</span>
                        <strong>READY</strong>
                    </div>
                    <div ref={(el) => (hudItemRefs.current[3] = el)} className="hud-info-item">
                        <Zap size={16} />
                        <span>MODE</span>
                        <strong>CREATIVE</strong>
                    </div>
                </section>

                <section ref={progressSectionRef} className="hud-progress">
                    <div ref={progressTopRef} className="hud-progress-top">
                        <span>
                            <Terminal size={13} />
                            INITIALIZING EXPERIENCE
                        </span>
                        <span ref={progressTextRef}>0%</span>
                    </div>

                    <div className="hud-progress-track">
                        <div ref={progressBarRef} className="hud-progress-fill" />
                    </div>

                    <div ref={progressBottomRef} className="hud-progress-bottom">
                        <span>DESIGN</span>
                        <span className="hud-progress-center">
                            <Sparkles size={12} />
                            CREATIVE MODE
                        </span>
                        <span>INTERFACE</span>
                    </div>
                </section>

                <section
                    ref={confirmRef}
                    className="hud-confirm"
                    aria-hidden={phase !== "confirm" && phase !== "exiting"}
                >
                    <p ref={confirmOverlineRef} className="hud-confirm-overline">
                        ALL SYSTEMS READY
                    </p>
                    <h2 ref={confirmTitleRef}>READY WHEN YOU ARE.</h2>
                    <p ref={confirmSubRef} className="hud-confirm-sub">
                        Your next click opens my world.
                    </p>

                    <button
                        ref={enterRef}
                        type="button"
                        className="hud-enter-button"
                        onClick={handleEnter}
                        disabled={phase !== "confirm"}
                        tabIndex={phase === "confirm" ? 0 : -1}
                    >
                        <span>ENTER PORTFOLIO</span>
                        <ArrowUpRight size={17} />
                    </button>
                </section>
            </main>

            <footer ref={footerRef} className="hud-footer">
                <span>PRATIK MOHANTY</span>
                <span className="hud-footer-center">DESIGNED TO EXPLORE</span>
                <span>EST. 2026</span>
            </footer>
        </div>
    );
};

export default Intro;