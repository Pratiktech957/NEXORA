import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

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

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        x: -35,
        y: 8,
    },

    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function Hero() {
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
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 1.5,
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
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 1.8,
                    delay: 0.2,
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
                    initial="hidden"
                    animate="visible"
                    className="
            relative
            max-w-4xl
          "
                >
                    {/* =================================================
              ROLE
              ================================================= */}

                    <motion.div
                        variants={itemVariants}
                        className="
              mb-6
              flex
              items-center
              gap-3
            "
                    >
                        <motion.span
                            initial={{
                                width: 0,
                                opacity: 0,
                            }}
                            animate={{
                                width: 32,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-px bg-blue-600"
                        />

                        <motion.span
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.35,
                            }}
                            className="
                text-sm
                font-medium
                tracking-wide
                text-blue-600
              "
                        >
                            Software Engineer
                        </motion.span>
                    </motion.div>

                    {/* =================================================
              NAME
              ================================================= */}

                    <motion.h1
                        initial={{
                            opacity: 0,
                            x: -50,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
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
                        Pratik Mohanty
                    </motion.h1>

                    {/* =================================================
              INTRODUCTION
              ================================================= */}

                    <motion.p
                        initial={{
                            opacity: 0,
                            x: -30,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
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
              INTERESTS
              ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.95,
                            ease: [0.22, 1, 0.36, 1],
                        }}
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
                                        initial={{
                                            opacity: 0,
                                            y: 6,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: 1 + index * 0.05,
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
                        initial={{
                            opacity: 0,
                            x: -30,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 1.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              mt-9
              flex
              flex-col
              gap-3
              sm:flex-row
            "
                    >
                        {/* View Projects */}
                        <motion.a
                            href="#projects"
                            whileHover={{
                                y: -3,
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#111111]
                px-5
                py-3
                text-sm
                font-medium
                text-white
                shadow-[0_2px_0_#000000]
                transition-colors
                duration-200
                hover:bg-blue-600
              "
                        >
                            <span>View Projects</span>

                            <motion.span
                                initial={{
                                    x: 0,
                                }}
                                whileHover={{
                                    x: 3,
                                    y: -3,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                <ArrowUpRight size={16} />
                            </motion.span>
                        </motion.a>

                        {/* View Resume */}
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                y: -3,
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-gray-200
                bg-white
                px-5
                py-3
                text-sm
                font-medium
                text-[#111111]
                shadow-sm
                transition-all
                duration-200
                hover:border-gray-300
                hover:bg-gray-50
              "
                        >
                            <span>View Resume</span>

                            <motion.span
                                initial={{
                                    y: 0,
                                }}
                                whileHover={{
                                    y: 2,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                            >
                                <Download size={16} />
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* =================================================
              FOCUS AREAS
              ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 1.6,
                        }}
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
                        <motion.span
                            whileHover={{
                                color: "#111111",
                                y: -2,
                            }}
                        >
                            Full-Stack Development
                        </motion.span>

                        <span className="h-1 w-1 rounded-full bg-gray-300" />

                        <motion.span
                            whileHover={{
                                color: "#111111",
                                y: -2,
                            }}
                        >
                            AI Systems
                        </motion.span>

                        <span className="h-1 w-1 rounded-full bg-gray-300" />

                        <motion.span
                            whileHover={{
                                color: "#111111",
                                y: -2,
                            }}
                        >
                            Backend Engineering
                        </motion.span>
                    </motion.div>
                </motion.div>
            </div>

            {/* =====================================================
          HERO → SKILLS TRANSITION SPACE
          =====================================================

          This invisible space gives the floating image enough
          vertical room to travel naturally into the Skills
          section without creating another visible section.
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