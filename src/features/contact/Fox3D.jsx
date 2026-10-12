
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../../assets/3d/fox.glb";

export function Fox({
    isTyping = false,
    isSent = false,
    ...props
}) {
    const group = useRef();

    const { nodes, materials, animations } = useGLTF(scene);
    const { actions } = useAnimations(animations, group);

    const animationNames = Object.keys(actions);

    // Print actual animation clips from fox.glb.
    useEffect(() => {
        console.log(
            "FOX ANIMATIONS:",
            animations.map((animation) => animation.name)
        );
    }, [animations]);

    // Find available animation clips by name.
    const walkAnimation = animationNames.find((name) =>
        /walk|run|move/i.test(name)
    );

    const idleAnimation = animationNames.find((name) =>
        /idle|stand|rest/i.test(name)
    );

    const hitAnimation = animationNames.find((name) =>
        /hit|attack|jump|celebrat/i.test(name)
    );

    // Choose an animation only if the model provides that clip.
    const selectedAnimation = isSent
        ? hitAnimation || idleAnimation || walkAnimation
        : isTyping
            ? walkAnimation || idleAnimation
            : idleAnimation || walkAnimation;

    useEffect(() => {
        Object.values(actions).forEach((action) => {
            action?.stop();
        });

        const action = selectedAnimation
            ? actions[selectedAnimation]
            : null;

        if (action) {
            action.reset().fadeIn(0.25).play();
        } else {
            console.warn(
                "No suitable animation clip found in fox.glb.",
                "Available animations:",
                animationNames
            );
        }

        return () => {
            action?.stop();
        };
    }, [actions, selectedAnimation]);

    // Smooth secondary movement; this is not a substitute
    // for an actual skeletal walking animation.
    useFrame((state, delta) => {
        if (!group.current) return;

        const targetY = isTyping ? 0.08 : 0;
        const targetRotation = isTyping ? 0.08 : 0;

        group.current.position.y +=
            (targetY - group.current.position.y) *
            (1 - Math.exp(-5 * delta));

        group.current.rotation.y +=
            (targetRotation - group.current.rotation.y) *
            (1 - Math.exp(-4 * delta));
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                {nodes.GLTF_created_0_rootJoint && (
                    <primitive
                        object={nodes.GLTF_created_0_rootJoint}
                    />
                )}

                {[
                    "Object_7",
                    "Object_8",
                    "Object_9",
                    "Object_10",
                    "Object_11",
                ].map((name) => {
                    const node = nodes[name];

                    if (!node?.geometry || !node?.skeleton) {
                        return null;
                    }

                    return (
                        <skinnedMesh
                            key={name}
                            name={name}
                            geometry={node.geometry}
                            material={
                                node.material ||
                                materials.PaletteMaterial001
                            }
                            skeleton={node.skeleton}
                        />
                    );
                })}
            </group>
        </group>
    );
}

export default function Fox3D(props) {
    return <Fox {...props} />;
}

useGLTF.preload(scene);
