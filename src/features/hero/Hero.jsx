import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

// Served from /public/images/resume/resume.pdf (Vite serves /public from the site root).
const RESUME_URL = "/images/resume/resume.pdf";

const introduction =
    "I'm a Software Engineer and Full-Stack Developer focused on building modern web applications, AI-powered systems, and production-oriented backend infrastructure. I enjoy turning real-world problems into reliable, scalable, and user-friendly software.";

const interests = [
    "React",
    "Node.js",
    "REST APIs",
    "Databases",
    "AI / LLM",
    "Authentication",
    "Security",
    "DevOps",
    "Backend Engineering",
];

const focusAreas = [
    "Full-Stack Development",
    "AI Systems",
    "Backend Engineering",
];

// Easing shared across the entrance sequence for a cohesive feel.
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

// Stagger container for the whole left column.
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Fade-up used for supporting blocks (paragraph, interests, CTA, focus areas).
const fadeUpVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT_EXPO },
    },
};

// Masked reveal — content clips in from behind an invisible line.
const maskRevealVariants = {
    hidden: { y: "110%" },
    visible: {
        y: "0%",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

function Hero() {
    const shouldReduceMotion = useReducedMotion();

    // When reduced motion is on, skip the entrance animations entirely and
    // render everything in its final state.
    const initial = shouldReduceMotion ? false : "hidden";
    const animate = shouldReduceMotion ? false : "visible";

    return (
        <section
            id="home"
            className="
        relative
        min-h-[calc(100vh-80px)]
        overflow-visible
        bg-transparent
      "
        >
            {/* =====================================================
          BACKGROUND DECORATION
          ===================================================== */}

            {/* Top-right soft blue glow */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: shouldReduceMotion ? 0 : 1.4,
                    ease: "easeOut",
                }}
                className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          z-0
          h-[550px]
          w-[550px]
          rounded-full
          bg-blue-100/30
          blur-3xl
        "
            />

            {/* Bottom-left soft blue glow */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: shouldReduceMotion ? 0 : 1.6,
                    delay: shouldReduceMotion ? 0 : 0.15,
                    ease: "easeOut",
                }}
                className="
          pointer-events-none
          absolute
          -bottom-[180px]
          -left-48
          z-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-blue-50/40
          blur-3xl
        "
            />

            {/* Subtle technical grid */}
            <div
                className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.025]
          [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]
          [background-size:60px_60px]
        "
            />

            {/* =====================================================
          HERO CONTENT
          ===================================================== */}

            <div
                className="
          relative
          z-20
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          max-w-[1100px]
          items-center
          px-5
          py-20
          md:px-6
          md:py-24
        "
            >
                <motion.div
                    variants={containerVariants}
                    initial={initial}
                    animate={animate}
                    className="
            relative
            max-w-4xl
          "
                >
                    {/* =================================================
              ROLE
              ================================================= */}

                    <motion.div
                        variants={fadeUpVariants}
                        className="
              mb-6
              flex
              items-center
              gap-3
            "
                    >
                        <motion.span
                            initial={shouldReduceMotion ? false : { width: 0, opacity: 0 }}
                            animate={{ width: 32, opacity: 1 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.55,
                                delay: shouldReduceMotion ? 0 : 0.2,
                                ease: EASE_OUT_EXPO,
                            }}
                            className="h-px bg-blue-600"
                        />

                        {/* Masked reveal for the role label */}
                        <span className="inline-block overflow-hidden">
                            <motion.span
                                variants={{
                                    hidden: { y: "110%" },
                                    visible: {
                                        y: "0%",
                                        transition: {
                                            duration: 0.65,
                                            ease: EASE_OUT_EXPO,
                                        },
                                    },
                                }}
                                className="
                  inline-block
                  text-sm
                  font-medium
                  tracking-wide
                  text-blue-600
                "
                            >
                                Software Engineer
                            </motion.span>
                        </span>
                    </motion.div>

                    {/* =================================================
              NAME — masked reveal
              ================================================= */}

                    <h1
                        className="
              max-w-4xl
              text-5xl
              font-bold
              leading-[1.05]
              tracking-[-0.055em]
              text-[#111111]
              sm:text-6xl
              md:text-7xl
              lg:text-[82px]
            "
                    >
                        {/* The overflow-hidden wrapper clips the mask; the
                            inner motion.span slides up from below. */}
                        <span className="block overflow-hidden pb-[0.12em]">
                            <motion.span
                                variants={maskRevealVariants}
                                className="block"
                            >
                                Pratik Mohanty
                            </motion.span>
                        </span>
                    </h1>

                    {/* =================================================
              INTRODUCTION
              ================================================= */}

                    <motion.p
                        variants={fadeUpVariants}
                        className="
              mt-7
              max-w-3xl
              text-base
              leading-7
              text-gray-500
              sm:text-lg
              sm:leading-8
            "
                    >
                        {introduction}
                    </motion.p>

                    {/* =================================================
              INTERESTS — gentle per-word stagger
              ================================================= */}

                    <motion.div
                        variants={fadeUpVariants}
                        className="mt-5 max-w-3xl"
                    >
                        <p
                            className="
                text-sm
                leading-6
                text-gray-400
                sm:text-base
              "
                        >
                            My interests span{" "}
                            {interests.map((interest, index) => (
                                <span key={interest}>
                                    <motion.span
                                        initial={
                                            shouldReduceMotion
                                                ? false
                                                : { opacity: 0, y: 6 }
                                        }
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: shouldReduceMotion
                                                ? 0
                                                : 0.3,
                                            delay: shouldReduceMotion
                                                ? 0
                                                : 0.35 + index * 0.04,
                                            ease: EASE_OUT_EXPO,
                                        }}
                                        className="inline-block"
                                    >
                                        {interest}
                                    </motion.span>

                                    {index < interests.length - 1 && (
                                        <span className="text-gray-300">, </span>
                                    )}
                                </span>
                            ))}
                            .
                        </p>
                    </motion.div>

                    {/* =================================================
              CTA
              ================================================= */}

                    <motion.div
                        variants={fadeUpVariants}
                        className="
              mt-9
              flex
              flex-col
              gap-3
              sm:flex-row
            "
                    >{/* View Projects — White */}
                        <motion.a
                            href="#projects"
                            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="group inline-flex items-center justify-center gap-2 rounded-lg
    border border-gray-200 bg-white px-5 py-3 text-sm font-medium
    text-[#111111] shadow-sm
    hover:border-gray-300 hover:bg-gray-50
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            <span>View Projects</span>
                            <ArrowUpRight
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 motion-reduce:transition-none
      group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                            />
                        </motion.a>

                        {/* View Resume — White */}
                        <motion.a
                            href="/images/resume/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="group inline-flex items-center justify-center gap-2 rounded-lg
    border border-gray-200 bg-white px-5 py-3 text-sm font-medium
    text-[#111111] shadow-sm
    hover:border-gray-300 hover:bg-gray-50
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            <span>View Resume</span>
                            <Download
                                size={16}
                                aria-hidden="true"
                                className="transition-transform duration-200 motion-reduce:transition-none
      group-hover:translate-y-[2px]"
                            />
                        </motion.a>


                    </motion.div>

                    {/* =================================================
              FOCUS AREAS
              ================================================= */}

                    <motion.div
                        variants={fadeUpVariants}
                        className="
              mt-12
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-xs
              text-gray-400
            "
                    >
                        {focusAreas.map((area, index) => (
                            <span
                                key={area}
                                className="flex items-center gap-x-4"
                            >
                                <motion.span
                                    whileHover={
                                        shouldReduceMotion
                                            ? undefined
                                            : { color: "#111111", y: -2 }
                                    }
                                    transition={{ duration: 0.2 }}
                                    className="inline-block"
                                >
                                    {area}
                                </motion.span>

                                {index < focusAreas.length - 1 && (
                                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                                )}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* =====================================================
          HERO → SKILLS TRANSITION SPACE
          =====================================================

          Reserved vertical space for the FloatingHeroImage to travel
          into the Skills section. Kept untouched so the existing
          transition continues to work.
      ===================================================== */}

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          relative
          z-0
          h-[220px]
          sm:h-[260px]
          md:h-[300px]
        "
            />
        </section>
    );
}

export default Hero;