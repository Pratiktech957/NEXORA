import {
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

const floatingWords = [
    {
        text: "FULL-STACK",
        top: "18%",
        left: "-8%",
        delay: 0.15,
    },
    {
        text: "AI SYSTEMS",
        top: "34%",
        right: "-10%",
        delay: 0.3,
    },
    {
        text: "BACKEND",
        top: "54%",
        left: "-13%",
        delay: 0.45,
    },
    {
        text: "DEVOPS",
        top: "70%",
        right: "-7%",
        delay: 0.6,
    },
];

function FloatingHeroImage() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 24,
        mass: 0.45,
    });

    /* --------------------------------
       IMAGE MOVEMENT
    -------------------------------- */

    const imageY = useTransform(
        progress,
        [0, 0.15, 0.35, 0.55, 0.75, 1],
        [-25, 0, 55, 120, 210, 300]
    );

    const imageX = useTransform(
        progress,
        [0, 0.2, 0.45, 0.7, 1],
        [55, 30, 0, -25, -55]
    );

    const imageScale = useTransform(
        progress,
        [0, 0.18, 0.45, 0.7, 1],
        [0.84, 0.91, 0.98, 1.02, 1.06]
    );

    const imageRotate = useTransform(
        progress,
        [0, 0.2, 0.45, 0.65, 0.85, 1],
        [-2.5, -1, 0, 0.8, 1.8, 2.5]
    );

    /*
      Keep image mostly sharp.
      Blur only increases near the final disappearance.
    */
    const imageBlur = useTransform(
        progress,
        [0, 0.2, 0.45, 0.65, 0.8, 1],
        [1.5, 0.5, 0, 0.2, 0.8, 2]
    );

    /*
      Image fades out near the end.
    */
    const imageOpacity = useTransform(
        progress,
        [0, 0.1, 0.3, 0.55, 0.72, 0.88, 1],
        [0, 0.95, 0.9, 0.72, 0.48, 0.18, 0]
    );

    /* --------------------------------
       TEXT MOVEMENT
    -------------------------------- */

    /*
      Text starts slightly left and moves right.
    */
    const textX = useTransform(
        progress,
        [0, 0.18, 0.4, 0.65, 0.85, 1],
        [-80, -15, 10, 35, 70, 110]
    );

    /*
      Text moves slightly upward while disappearing.
    */
    const textY = useTransform(
        progress,
        [0, 0.35, 0.65, 1],
        [15, 0, -15, -45]
    );

    /*
      Text appears first, then gradually disappears
      together with the image.
    */
    const textOpacity = useTransform(
        progress,
        [0, 0.08, 0.22, 0.5, 0.72, 0.88, 1],
        [0, 1, 0.95, 0.8, 0.45, 0.12, 0]
    );

    /*
      Text becomes slightly smaller near the end.
    */
    const textScale = useTransform(
        progress,
        [0, 0.25, 0.65, 1],
        [0.92, 1, 0.98, 0.9]
    );

    /* --------------------------------
       AMBIENT GLOW
    -------------------------------- */

    const glowOpacity = useTransform(
        progress,
        [0, 0.2, 0.45, 0.7, 1],
        [0, 0.16, 0.12, 0.05, 0]
    );

    const glowScale = useTransform(
        progress,
        [0, 0.5, 1],
        [0.85, 1.05, 0.8]
    );

    /* --------------------------------
       DECORATIVE RING
    -------------------------------- */

    const ringOpacity = useTransform(
        progress,
        [0, 0.15, 0.45, 0.7, 1],
        [0, 0.4, 0.25, 0.08, 0]
    );

    const ringRotate = useTransform(
        progress,
        [0, 1],
        [4, -4]
    );

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        z-0
        h-[1200px]
        overflow-hidden
      "
        >
            {/* =========================================
          AMBIENT BLUE GLOW
      ========================================= */}

            <motion.div
                style={{
                    x: imageX,
                    y: imageY,
                    scale: glowScale,
                    opacity: glowOpacity,
                }}
                className="
          absolute
          left-1/2
          top-[350px]
          h-[430px]
          w-[430px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/15
          blur-[100px]
          md:h-[520px]
          md:w-[520px]
        "
            />

            {/* =========================================
          IMAGE
      ========================================= */}

            <motion.div
                style={{
                    x: imageX,
                    y: imageY,
                    scale: imageScale,
                    rotate: imageRotate,
                    opacity: imageOpacity,
                    filter: useTransform(
                        imageBlur,
                        (value) => `blur(${value}px)`
                    ),
                }}
                className="
          absolute
          left-1/2
          top-[390px]
          w-[350px]
          -translate-x-1/2
          will-change-transform

          sm:w-[420px]

          md:top-[350px]
          md:w-[520px]

          lg:top-[320px]
          lg:w-[590px]
        "
            >
                {/* -----------------------------------------
            IMAGE
        ----------------------------------------- */}

                <img
                    src="/images/profile/pratik-hero.png"
                    alt=""
                    draggable="false"
                    className="
            block
            h-auto
            w-full
            select-none
            object-contain
          "
                />

                {/* -----------------------------------------
            BOTTOM FADE
        ----------------------------------------- */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[20%]
            bg-gradient-to-t
            from-[#fafafa]/75
            via-[#fafafa]/20
            to-transparent
          "
                />

                {/* -----------------------------------------
            SOFT LIGHT SWEEP
        ----------------------------------------- */}

                <motion.div
                    initial={{
                        x: "-120%",
                        opacity: 0,
                    }}
                    animate={{
                        x: ["-120%", "120%"],
                        opacity: [0, 0.18, 0],
                    }}
                    transition={{
                        duration: 1.8,
                        delay: 0.8,
                        ease: "easeInOut",
                    }}
                    className="
            absolute
            inset-y-0
            left-0
            w-[22%]
            skew-x-[-18deg]
            bg-white/20
            blur-xl
          "
                />
            </motion.div>

            {/* =========================================
          FLOATING TECH TEXT
      ========================================= */}

            <motion.div
                style={{
                    x: textX,
                    y: textY,
                    scale: textScale,
                    opacity: textOpacity,
                }}
                className="
          absolute
          left-1/2
          top-[360px]
          h-[480px]
          w-[350px]
          -translate-x-1/2

          sm:w-[420px]
          md:w-[520px]
          lg:w-[590px]
        "
            >
                {floatingWords.map((word) => (
                    <motion.span
                        key={word.text}
                        initial={{
                            opacity: 0,
                            x: -35,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: word.delay,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            top: word.top,
                            left: word.left,
                            right: word.right,
                        }}
                        className="
              absolute
              whitespace-nowrap
              text-[10px]
              font-semibold
              tracking-[0.28em]
              text-blue-600/65

              sm:text-xs
              md:text-sm
            "
                    >
                        {word.text}
                    </motion.span>
                ))}
            </motion.div>

            {/* =========================================
          DECORATIVE RING
      ========================================= */}

            <motion.div
                style={{
                    x: imageX,
                    y: imageY,
                    scale: imageScale,
                    rotate: ringRotate,
                    opacity: ringOpacity,
                }}
                className="
          absolute
          left-1/2
          top-[395px]
          h-[390px]
          w-[390px]
          -translate-x-1/2
          rounded-full
          border
          border-blue-500/15

          md:h-[540px]
          md:w-[540px]
        "
            />

            {/* =========================================
          SMALL TECH DOTS
      ========================================= */}

            <motion.div
                style={{
                    x: imageX,
                    y: imageY,
                    opacity: textOpacity,
                }}
                className="
          absolute
          left-[calc(50%+250px)]
          top-[470px]
          hidden
          h-1.5
          w-1.5
          rounded-full
          bg-blue-500/60
          md:block
        "
            />

            <motion.div
                style={{
                    x: imageX,
                    y: imageY,
                    opacity: textOpacity,
                }}
                className="
          absolute
          left-[calc(50%-270px)]
          top-[610px]
          hidden
          h-1
          w-1
          rounded-full
          bg-blue-500/50
          md:block
        "
            />
        </div>
    );
}

export default FloatingHeroImage;