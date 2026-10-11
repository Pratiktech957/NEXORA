import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PI = Math.PI;

/*
|--------------------------------------------------------------------------
| JARVIS ROBOT
|--------------------------------------------------------------------------
| Direct React Three Fiber port of the robot structure from the
| uploaded Claude JARVIS HTML artifact.
*/

function JarvisRobot({ isTyping, wave = false }) {
    const robotRef = useRef(null);

    const headRef = useRef(null);
    const neckRef = useRef(null);
    const chestRef = useRef(null);
    const pelvisRef = useRef(null);
    const coreRef = useRef(null);

    const leftShoulderRef = useRef(null);
    const rightShoulderRef = useRef(null);

    const leftElbowRef = useRef(null);
    const rightElbowRef = useRef(null);

    const leftWristRef = useRef(null);
    const rightWristRef = useRef(null);

    const leftEyes = useRef([]);
    const rightEyes = useRef([]);

    const { pointer } = useThree();

    /*
    |--------------------------------------------------------------------------
    | Materials
    |--------------------------------------------------------------------------
    */

    const materials = useMemo(() => {
        return {
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

            visor: new THREE.MeshStandardMaterial({
                color: 0x04060a,
                metalness: 0.3,
                roughness: 0.06,
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
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Animation
    |--------------------------------------------------------------------------
    */

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        /*
        ------------------------------------------------------------------------
        Idle breathing
        ------------------------------------------------------------------------
        */

        const breathing = Math.sin(time * 1.6);

        if (chestRef.current) {
            chestRef.current.scale.set(
                1 + breathing * 0.006,
                1 + breathing * 0.012,
                1 + breathing * 0.008
            );
        }

        if (pelvisRef.current) {
            pelvisRef.current.position.y =
                0.95 + breathing * 0.003;
        }

        /*
        ------------------------------------------------------------------------
        Head follows pointer
        ------------------------------------------------------------------------
        */

        const headY = pointer.x * 0.75;
        const headX = pointer.y * 0.35;

        if (headRef.current) {
            headRef.current.rotation.y +=
                (headY * 0.7 - headRef.current.rotation.y) * 0.08;

            headRef.current.rotation.x +=
                (headX - headRef.current.rotation.x) * 0.08;
        }

        if (neckRef.current) {
            neckRef.current.rotation.y +=
                (headY * 0.3 - neckRef.current.rotation.y) * 0.08;
        }

        /*
        ------------------------------------------------------------------------
        Arm state
        ------------------------------------------------------------------------
        */

        const activeTyping =
            isTyping || wave;

        const leftTarget =
            wave
                ? 2.5
                : activeTyping
                    ? 0.68 + Math.sin(time * 5) * 0.035
                    : 0.58;

        const rightTarget =
            activeTyping
                ? -0.68 - Math.sin(time * 5) * 0.035
                : -0.58;

        if (leftShoulderRef.current) {
            leftShoulderRef.current.rotation.z +=
                (leftTarget - leftShoulderRef.current.rotation.z) * 0.08;
        }

        if (rightShoulderRef.current) {
            rightShoulderRef.current.rotation.z +=
                (rightTarget - rightShoulderRef.current.rotation.z) * 0.08;
        }

        /*
        ------------------------------------------------------------------------
        Elbows
        ------------------------------------------------------------------------
        */

        const leftElbowTarget =
            wave
                ? -0.5
                : activeTyping
                    ? -0.2 + Math.sin(time * 6) * 0.05
                    : -0.12;

        const rightElbowTarget =
            activeTyping
                ? -0.2 - Math.sin(time * 6) * 0.05
                : -0.12;

        if (leftElbowRef.current) {
            leftElbowRef.current.rotation.x +=
                (leftElbowTarget - leftElbowRef.current.rotation.x) * 0.08;

            if (wave) {
                leftElbowRef.current.rotation.z =
                    Math.sin(time * 7) * 0.45;
            } else {
                leftElbowRef.current.rotation.z *= 0.9;
            }
        }

        if (rightElbowRef.current) {
            rightElbowRef.current.rotation.x +=
                (rightElbowTarget - rightElbowRef.current.rotation.x) * 0.08;
        }

        /*
        ------------------------------------------------------------------------
        Wrists
        ------------------------------------------------------------------------
        */

        if (leftWristRef.current) {
            leftWristRef.current.rotation.z =
                wave
                    ? Math.sin(time * 7) * 0.18
                    : activeTyping
                        ? Math.sin(time * 5) * 0.06
                        : 0;
        }

        if (rightWristRef.current) {
            rightWristRef.current.rotation.z =
                activeTyping
                    ? Math.sin(time * 5 + 1) * 0.06
                    : 0;
        }

        /*
        ------------------------------------------------------------------------
        Blink
        ------------------------------------------------------------------------
        */

        const blink =
            (time % 4.2) < 0.12;

        [...leftEyes.current, ...rightEyes.current].forEach(
            (eye) => {
                if (eye) {
                    eye.scale.y = blink ? 0.001 : 0.008;
                }
            }
        );

        /*
        ------------------------------------------------------------------------
        Chest core
        ------------------------------------------------------------------------
        */

        if (coreRef.current) {
            const pulseSpeed = activeTyping ? 5 : 2.2;

            const pulse =
                0.34 +
                0.02 * Math.sin(time * pulseSpeed);

            coreRef.current.scale.setScalar(pulse / 0.34);
        }

        /*
        ------------------------------------------------------------------------
        Typing attention
        ------------------------------------------------------------------------
        */

        if (robotRef.current) {
            const targetRotation =
                isTyping ? -0.025 : 0;

            robotRef.current.rotation.x +=
                (targetRotation - robotRef.current.rotation.x) * 0.06;
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Geometry helpers
    |--------------------------------------------------------------------------
    */

    const sphere = (radius) =>
        new THREE.SphereGeometry(
            radius,
            32,
            20
        );

    const cylinder = (
        top,
        bottom,
        height
    ) =>
        new THREE.CylinderGeometry(
            top,
            bottom,
            height,
            32
        );

    const torus = (
        radius,
        tube
    ) =>
        new THREE.TorusGeometry(
            radius,
            tube,
            12,
            48
        );

    const thinTorus = (
        radius,
        tube
    ) =>
        new THREE.TorusGeometry(
            radius,
            tube,
            16,
            48
        );

    /*
    |--------------------------------------------------------------------------
    | Arm
    |--------------------------------------------------------------------------
    */

    const Arm = ({
        side,
        shoulderRef,
        elbowRef,
        wristRef,
    }) => {
        const s = side === "left" ? 1 : -1;

        return (
            <group
                ref={shoulderRef}
                position={[s * 0.26, 0.27, 0]}
                rotation={[0, 0, s * 0.58]}
            >
                {/* Shoulder */}
                <mesh
                    geometry={sphere(0.052)}
                    material={materials.graphite}
                />

                <mesh
                    geometry={sphere(1)}
                    material={materials.white}
                    position={[s * 0.025, 0.025, 0]}
                    scale={[0.075, 0.06, 0.08]}
                />

                {/* Upper arm */}
                <mesh
                    geometry={cylinder(0.044, 0.037, 0.29)}
                    material={materials.white}
                    position={[0, -0.17, 0]}
                />

                {/* Blue joint ring */}
                <mesh
                    geometry={torus(0.044, 0.005)}
                    material={materials.glow}
                    position={[0, -0.1, 0]}
                />

                {/* Elbow */}
                <group
                    ref={elbowRef}
                    position={[0, -0.315, 0]}
                    rotation={[-0.12, 0, 0]}
                >
                    <mesh
                        geometry={sphere(0.041)}
                        material={materials.graphite}
                    />

                    {/* Forearm */}
                    <mesh
                        geometry={cylinder(0.039, 0.03, 0.25)}
                        material={materials.silver}
                        position={[0, -0.15, 0]}
                    />

                    <mesh
                        geometry={torus(0.035, 0.005)}
                        material={materials.glow}
                        position={[0, -0.25, 0]}
                    />

                    {/* Wrist */}
                    <group
                        ref={wristRef}
                        position={[0, -0.285, 0]}
                    >
                        <mesh
                            geometry={
                                new THREE.BoxGeometry(
                                    0.034,
                                    0.085,
                                    0.075
                                )
                            }
                            material={materials.silver}
                            position={[0, -0.05, 0]}
                        />

                        {/* Palm */}
                        <mesh
                            geometry={sphere(0.03)}
                            material={materials.graphite}
                            position={[0, -0.12, 0]}
                            scale={[1.1, 1.35, 1.2]}
                        />

                        {/* Fingers */}
                        {Array.from({
                            length: 4,
                        }).map((_, index) => (
                            <group
                                key={index}
                                position={[
                                    0,
                                    -0.15,
                                    -0.027 +
                                    index * 0.018,
                                ]}
                            >
                                <mesh
                                    geometry={cylinder(
                                        0.0085,
                                        0.0075,
                                        0.05
                                    )}
                                    material={materials.graphite}
                                    position={[0, -0.025, 0]}
                                    rotation={[
                                        0,
                                        0,
                                        -s * 0.2,
                                    ]}
                                />
                            </group>
                        ))}

                        {/* Thumb */}
                        <mesh
                            geometry={cylinder(
                                0.01,
                                0.009,
                                0.04
                            )}
                            material={materials.graphite}
                            position={[
                                -s * 0.018,
                                -0.045,
                                0.04,
                            ]}
                            rotation={[
                                -0.6,
                                0,
                                -s * 0.4,
                            ]}
                        />
                    </group>
                </group>
            </group>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Leg
    |--------------------------------------------------------------------------
    */

    const Leg = ({ side }) => {
        const s = side === "left" ? 1 : -1;

        return (
            <group
                position={[s * 0.09, 0.905, 0]}
            >
                {/* Hip */}
                <mesh
                    geometry={sphere(0.058)}
                    material={materials.graphite}
                />

                {/* Upper leg */}
                <mesh
                    geometry={cylinder(
                        0.07,
                        0.052,
                        0.42
                    )}
                    material={materials.white}
                    position={[0, -0.22, 0]}
                />

                <mesh
                    geometry={torus(0.063, 0.006)}
                    material={materials.glow}
                    position={[0, -0.1, 0]}
                />

                {/* Knee */}
                <group
                    position={[0, -0.42, 0]}
                >
                    <mesh
                        geometry={sphere(0.052)}
                        material={materials.graphite}
                    />

                    <mesh
                        geometry={sphere(1)}
                        material={materials.white}
                        position={[0, 0, 0.035]}
                        scale={[0.045, 0.055, 0.04]}
                    />

                    {/* Lower leg */}
                    <mesh
                        geometry={cylinder(
                            0.052,
                            0.038,
                            0.37
                        )}
                        material={materials.silver}
                        position={[0, -0.2, 0]}
                    />

                    <mesh
                        geometry={torus(0.042, 0.005)}
                        material={materials.glow}
                        position={[0, -0.32, 0]}
                    />

                    {/* Ankle */}
                    <group
                        position={[0, -0.39, 0]}
                    >
                        <mesh
                            geometry={sphere(0.04)}
                            material={materials.graphite}
                        />

                        {/* Foot */}
                        <mesh
                            geometry={sphere(1)}
                            material={materials.white}
                            position={[0, -0.055, 0.045]}
                            scale={[
                                0.052,
                                0.04,
                                0.125,
                            ]}
                        />

                        <mesh
                            geometry={sphere(1)}
                            material={materials.graphite}
                            position={[0, -0.075, 0.05]}
                            scale={[
                                0.05,
                                0.02,
                                0.12,
                            ]}
                        />
                    </group>
                </group>
            </group>
        );
    };

    return (
        <group
            ref={robotRef}
            position={[0, -1.0, 0]}
        >
            {/* ======================================================
          PELVIS
      ====================================================== */}

            <group
                ref={pelvisRef}
                position={[0, 0.95, 0]}
            >
                <mesh
                    geometry={sphere(1)}
                    material={materials.graphite}
                    scale={[0.15, 0.09, 0.1]}
                />

                <mesh
                    geometry={sphere(1)}
                    material={materials.white}
                    position={[0, 0.02, 0]}
                    scale={[
                        0.165,
                        0.07,
                        0.115,
                    ]}
                />

                {/* ====================================================
            SPINE
        ==================================================== */}

                <group
                    position={[0, 0.07, 0]}
                >
                    <mesh
                        geometry={cylinder(
                            0.1,
                            0.11,
                            0.16
                        )}
                        material={materials.graphite}
                        position={[0, 0.05, 0]}
                    />

                    <mesh
                        geometry={torus(0.108, 0.006)}
                        material={materials.glow}
                        position={[0, 0.05, 0]}
                    />

                    {/* ==================================================
              CHEST
          ================================================== */}

                    <group
                        ref={chestRef}
                        position={[0, 0.13, 0]}
                    >
                        <mesh
                            geometry={sphere(1)}
                            material={materials.white}
                            position={[0, 0.15, 0]}
                            scale={[
                                0.2,
                                0.19,
                                0.125,
                            ]}
                        />

                        <mesh
                            geometry={sphere(1)}
                            material={materials.silver}
                            position={[0, 0.04, -0.005]}
                            scale={[
                                0.16,
                                0.09,
                                0.1,
                            ]}
                        />

                        <mesh
                            geometry={sphere(1)}
                            material={materials.silver}
                            position={[0, 0.17, -0.1]}
                            scale={[
                                0.1,
                                0.12,
                                0.05,
                            ]}
                        />

                        {/* Chest rings */}
                        <mesh
                            geometry={thinTorus(
                                0.056,
                                0.012
                            )}
                            material={materials.graphite}
                            position={[0, 0.15, 0.122]}
                        />

                        <mesh
                            geometry={thinTorus(
                                0.034,
                                0.004
                            )}
                            material={materials.silver}
                            position={[0, 0.15, 0.126]}
                        />

                        {/* Core */}
                        <group
                            ref={coreRef}
                            position={[0, 0.15, 0.15]}
                        >
                            <mesh>
                                <circleGeometry
                                    args={[0.047, 48]}
                                />

                                <meshBasicMaterial
                                    color="#aee6ff"
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>

                            <pointLight
                                color="#35b6ff"
                                intensity={
                                    isTyping ? 2 : 1
                                }
                                distance={1.5}
                            />
                        </group>

                        {/* ==================================================
                NECK
            ================================================== */}

                        <group
                            ref={neckRef}
                            position={[0, 0.32, 0]}
                        >
                            <mesh
                                geometry={cylinder(
                                    0.034,
                                    0.04,
                                    0.1
                                )}
                                material={materials.graphite}
                                position={[0, 0.02, 0]}
                            />

                            {/* =================================================
                  HEAD
              ================================================= */}

                            <group
                                ref={headRef}
                                position={[0, 0.06, 0]}
                            >
                                {/* Head shell */}
                                <mesh
                                    geometry={sphere(1)}
                                    material={materials.white}
                                    position={[
                                        0,
                                        0.105,
                                        -0.005,
                                    ]}
                                    scale={[
                                        0.095,
                                        0.115,
                                        0.11,
                                    ]}
                                />

                                {/* Visor */}
                                <mesh
                                    geometry={sphere(1)}
                                    material={materials.visor}
                                    position={[
                                        0,
                                        0.108,
                                        0.045,
                                    ]}
                                    scale={[
                                        0.083,
                                        0.07,
                                        0.075,
                                    ]}
                                />

                                {/* Eyes */}
                                {[-1, 1].map(
                                    (side) => {
                                        const eyeRef =
                                            side === -1
                                                ? leftEyes
                                                : rightEyes;

                                        return (
                                            <mesh
                                                key={side}
                                                ref={(node) => {
                                                    if (node) {
                                                        eyeRef.current = [
                                                            node,
                                                        ];
                                                    }
                                                }}
                                                geometry={sphere(1)}
                                                material={materials.eye}
                                                position={[
                                                    side * 0.036,
                                                    0.112,
                                                    0.111,
                                                ]}
                                                scale={[
                                                    0.017,
                                                    0.008,
                                                    0.007,
                                                ]}
                                            />
                                        );
                                    }
                                )}

                                {/* Side ear */}
                                {[-1, 1].map(
                                    (side) => (
                                        <mesh
                                            key={side}
                                            geometry={cylinder(
                                                0.03,
                                                0.03,
                                                0.03
                                            )}
                                            material={
                                                materials.graphite
                                            }
                                            position={[
                                                side * 0.098,
                                                0.105,
                                                0,
                                            ]}
                                            rotation={[
                                                0,
                                                0,
                                                PI / 2,
                                            ]}
                                        />
                                    )
                                )}

                                {/* Head ring */}
                                <mesh
                                    geometry={thinTorus(
                                        0.022,
                                        0.003
                                    )}
                                    material={materials.glow}
                                    position={[
                                        0,
                                        0.215,
                                        0.02,
                                    ]}
                                    rotation={[
                                        PI / 2,
                                        0,
                                        0,
                                    ]}
                                />
                            </group>
                        </group>

                        {/* ==================================================
                ARMS
            ================================================== */}

                        <Arm
                            side="left"
                            shoulderRef={
                                leftShoulderRef
                            }
                            elbowRef={
                                leftElbowRef
                            }
                            wristRef={
                                leftWristRef
                            }
                        />

                        <Arm
                            side="right"
                            shoulderRef={
                                rightShoulderRef
                            }
                            elbowRef={
                                rightElbowRef
                            }
                            wristRef={
                                rightWristRef
                            }
                        />
                    </group>
                </group>
            </group>

            {/* ======================================================
          LEGS
      ====================================================== */}

            <Leg side="left" />
            <Leg side="right" />
        </group>
    );
}

/*
|--------------------------------------------------------------------------
| JARVIS CANVAS
|--------------------------------------------------------------------------
*/

function Jarvis({ isTyping = false, wave = false }) {
    return (
        <div
            className="
        relative
        h-[430px]
        w-full
        sm:h-[470px]
        lg:h-[520px]
      "
        >
            {/* Status */}
            <div
                className="
          absolute
          left-1/2
          top-5
          z-20
          -translate-x-1/2
          whitespace-nowrap
          rounded-full
          border
          border-blue-100
          bg-white/90
          px-4
          py-2
          text-xs
          font-medium
          text-gray-500
          shadow-sm
          backdrop-blur
        "
            >
                {wave
                    ? "Message received."
                    : isTyping
                        ? "JARVIS is listening..."
                        : "JARVIS · AI ASSISTANT"}
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

                {/* Blue rim */}
                <pointLight
                    color="#3fb8ff"
                    intensity={
                        isTyping ? 1.5 : 0.9
                    }
                    distance={8}
                    position={[-2, 1.6, -2]}
                />

                <JarvisRobot
                    isTyping={isTyping}
                    wave={wave}
                />

                {/* Floor */}
                <mesh
                    rotation={[-PI / 2, 0, 0]}
                    position={[0, -1.38, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[8, 8]} />

                    <shadowMaterial
                        transparent
                        opacity={0.28}
                    />
                </mesh>

                {/* Contact shadow */}
                <ContactShadows
                    position={[0, -1.38, 0]}
                    opacity={0.28}
                    scale={3}
                    blur={2.2}
                    far={4}
                />

                {/* Blue floor rings */}
                <mesh
                    rotation={[-PI / 2, 0, 0]}
                    position={[0, -1.375, 0]}
                >
                    <ringGeometry
                        args={[0.7, 0.706, 96]}
                    />

                    <meshBasicMaterial
                        color="#4fc3ff"
                        transparent
                        opacity={0.7}
                    />
                </mesh>

                <mesh
                    rotation={[-PI / 2, 0, 0]}
                    position={[0, -1.374, 0]}
                >
                    <ringGeometry
                        args={[0.9, 0.906, 96]}
                    />

                    <meshBasicMaterial
                        color="#4fc3ff"
                        transparent
                        opacity={0.35}
                    />
                </mesh>
            </Canvas>
        </div>
    );
}

export default Jarvis;