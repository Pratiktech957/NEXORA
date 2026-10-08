import {
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

function ScrollImage({
    src,
    alt = "",
    className = "",
}) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "end 10%"],
    });

    /*
     * Smooth the raw scroll value.
     * This prevents the animation from feeling robotic.
     */
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.4,
    });

    /*
     * SCALE
     *
     * Starts slightly smaller.
     * Grows naturally as it enters the viewport.
     * Becomes slightly smaller again while leaving.
     */
    const scale = useTransform(
        smoothProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [0.82, 0.94, 1.05, 1.01, 0.88]
    );

    /*
     * VERTICAL PARALLAX
     *
     * Image moves slower than the page.
     */
    const y = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [120, 0, -120]
    );

    /*
     * SUBTLE ROTATION
     *
     * Never too much.
     * Gives the image a premium editorial feeling.
     */
    const rotate = useTransform(
        smoothProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [-4, -1.2, 0, 1.2, 4]
    );

    /*
     * BLUR
     *
     * Blurred when entering.
     * Sharp in the center.
     * Slightly blurred while leaving.
     */
    const blur = useTransform(
        smoothProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [12, 5, 0, 0, 5, 12]
    );

    /*
     * OPACITY
     *
     * Smooth fade in/out.
     */
    const opacity = useTransform(
        smoothProgress,
        [0, 0.15, 0.3, 0.7, 0.85, 1],
        [0.25, 0.65, 1, 1, 0.7, 0.25]
    );

    /*
     * BORDER RADIUS
     *
     * Slightly changes as the image moves.
     */
    const borderRadius = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        ["32px", "24px", "32px"]
    );

    /*
     * Subtle horizontal movement.
     */
    const x = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [-25, 0, 25]
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden py-24 md:py-36"
        >
            {/* Ambient background glow */}
            <motion.div
                aria-hidden="true"
                style={{
                    opacity: useTransform(
                        smoothProgress,
                        [0, 0.35, 0.5, 0.65, 1],
                        [0, 0.4, 0.7, 0.4, 0]
                    ),
                    scale: useTransform(
                        smoothProgress,
                        [0, 0.5, 1],
                        [0.8, 1.15, 0.8]
                    ),
                }}
                className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-[100px]
        "
            />

            {/* Image wrapper */}
            <div className="relative mx-auto flex min-h-[520px] w-full max-w-6xl items-center justify-center px-6 md:min-h-[680px]">
                {/* Decorative ring */}
                <motion.div
                    aria-hidden="true"
                    style={{
                        scale,
                        rotate: useTransform(rotate, (value) => value * -0.5),
                        opacity: useTransform(
                            smoothProgress,
                            [0, 0.25, 0.5, 0.75, 1],
                            [0, 0.25, 0.45, 0.25, 0]
                        ),
                    }}
                    className="
            pointer-events-none
            absolute
            h-[360px]
            w-[360px]
            rounded-full
            border
            border-blue-500/20
            md:h-[540px]
            md:w-[540px]
          "
                />

                {/* Secondary ring */}
                <motion.div
                    aria-hidden="true"
                    style={{
                        scale: useTransform(
                            smoothProgress,
                            [0, 0.5, 1],
                            [0.75, 1.08, 0.75]
                        ),
                        rotate: useTransform(
                            smoothProgress,
                            [0, 1],
                            [8, -8]
                        ),
                        opacity: useTransform(
                            smoothProgress,
                            [0, 0.35, 0.5, 0.65, 1],
                            [0, 0.15, 0.3, 0.15, 0]
                        ),
                    }}
                    className="
            pointer-events-none
            absolute
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-gray-300/70
            md:h-[620px]
            md:w-[620px]
          "
                />

                {/* Main image */}
                <motion.div
                    style={{
                        x,
                        y,
                        scale,
                        rotate,
                        opacity,
                        borderRadius,
                        filter: useTransform(
                            blur,
                            (value) => `blur(${value}px)`
                        ),
                    }}
                    className={`
            relative
            z-10
            w-full
            max-w-[520px]
            overflow-hidden
            shadow-[0_30px_100px_rgba(0,0,0,0.16)]
            will-change-transform
            md:max-w-[620px]
            ${className}
          `}
                >
                    <img
                        src={src}
                        alt={alt}
                        draggable="false"
                        className="
              block
              h-auto
              w-full
              select-none
              object-cover
            "
                    />

                    {/* Subtle glass reflection */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            x: useTransform(
                                smoothProgress,
                                [0, 1],
                                ["-120%", "120%"]
                            ),
                            opacity: useTransform(
                                smoothProgress,
                                [0.15, 0.5, 0.85],
                                [0, 0.18, 0]
                            ),
                        }}
                        className="
              pointer-events-none
              absolute
              inset-0
              w-1/3
              skew-x-[-18deg]
              bg-white/30
              blur-2xl
            "
                    />
                </motion.div>

                {/* Small floating label */}
                <motion.div
                    style={{
                        y: useTransform(
                            smoothProgress,
                            [0, 0.5, 1],
                            [50, -10, -50]
                        ),
                        opacity: useTransform(
                            smoothProgress,
                            [0.15, 0.35, 0.7, 0.9],
                            [0, 1, 1, 0]
                        ),
                    }}
                    className="
            absolute
            bottom-[12%]
            left-[8%]
            z-20
            hidden
            rounded-full
            border
            border-gray-200
            bg-white/90
            px-4
            py-2
            text-xs
            font-medium
            text-gray-700
            shadow-lg
            backdrop-blur-md
            md:block
          "
                >
                    Full-Stack Developer
                </motion.div>

                {/* Small technical label */}
                <motion.div
                    style={{
                        y: useTransform(
                            smoothProgress,
                            [0, 0.5, 1],
                            [-50, 10, 50]
                        ),
                        opacity: useTransform(
                            smoothProgress,
                            [0.15, 0.35, 0.7, 0.9],
                            [0, 1, 1, 0]
                        ),
                    }}
                    className="
            absolute
            right-[8%]
            top-[12%]
            z-20
            hidden
            rounded-full
            border
            border-gray-200
            bg-white/90
            px-4
            py-2
            text-xs
            font-medium
            text-gray-700
            shadow-lg
            backdrop-blur-md
            md:block
          "
                >
                    React · Node · AI
                </motion.div>
            </div>
        </section>
    );
}

export default ScrollImage;