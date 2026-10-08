import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import skills from "./skills.data";
import SkillIcon from "./SkillIcon";

const allSkills = skills.flatMap((group) => group.items);

const firstRow = allSkills.slice(
    0,
    Math.ceil(allSkills.length / 2)
);

const secondRow = allSkills.slice(
    Math.ceil(allSkills.length / 2)
);


/*
|--------------------------------------------------------------------------
| Skill Colors
|--------------------------------------------------------------------------
| These colors appear mainly when a skill is hovered or selected.
*/

const skillColors = {
    // Programming Languages
    javascript: {
        color: "#F7DF1E",
        background: "#FEFCE8",
        border: "#FDE68A",
    },

    python: {
        color: "#3776AB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    java: {
        color: "#ED8B00",
        background: "#FFF7ED",
        border: "#FED7AA",
    },


    // Frontend
    html: {
        color: "#E34F26",
        background: "#FFF7ED",
        border: "#FED7AA",
    },

    css: {
        color: "#1572B6",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    react: {
        color: "#61DAFB",
        background: "#ECFEFF",
        border: "#A5F3FC",
    },

    tailwind: {
        color: "#06B6D4",
        background: "#ECFEFF",
        border: "#A5F3FC",
    },


    // Backend
    node: {
        color: "#339933",
        background: "#F0FDF4",
        border: "#BBF7D0",
    },

    express: {
        color: "#111111",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },

    flask: {
        color: "#111111",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },

    api: {
        color: "#2563EB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    jwt: {
        color: "#111111",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },

    websocket: {
        color: "#7C3AED",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },

    socket: {
        color: "#010101",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },


    // Databases
    mongodb: {
        color: "#47A248",
        background: "#F0FDF4",
        border: "#BBF7D0",
    },

    mysql: {
        color: "#4479A1",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    sql: {
        color: "#2563EB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },


    // AI / ML
    rag: {
        color: "#7C3AED",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },

    llm: {
        color: "#8B5CF6",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },

    stt: {
        color: "#0891B2",
        background: "#ECFEFF",
        border: "#A5F3FC",
    },

    tts: {
        color: "#0891B2",
        background: "#ECFEFF",
        border: "#A5F3FC",
    },

    ai: {
        color: "#8B5CF6",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },


    // DevOps
    git: {
        color: "#F05032",
        background: "#FFF7ED",
        border: "#FED7AA",
    },

    github: {
        color: "#181717",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },

    docker: {
        color: "#2496ED",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    nginx: {
        color: "#009639",
        background: "#F0FDF4",
        border: "#BBF7D0",
    },

    redis: {
        color: "#DC382D",
        background: "#FEF2F2",
        border: "#FECACA",
    },

    cicd: {
        color: "#2563EB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    prometheus: {
        color: "#E6522C",
        background: "#FFF7ED",
        border: "#FED7AA",
    },

    grafana: {
        color: "#F46800",
        background: "#FFF7ED",
        border: "#FED7AA",
    },


    // Security
    owasp: {
        color: "#111111",
        background: "#F9FAFB",
        border: "#D1D5DB",
    },

    authentication: {
        color: "#2563EB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    authorization: {
        color: "#7C3AED",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },

    validation: {
        color: "#16A34A",
        background: "#F0FDF4",
        border: "#BBF7D0",
    },

    "rate-limit": {
        color: "#EA580C",
        background: "#FFF7ED",
        border: "#FED7AA",
    },

    security: {
        color: "#DC2626",
        background: "#FEF2F2",
        border: "#FECACA",
    },


    // Core CS
    dsa: {
        color: "#2563EB",
        background: "#EFF6FF",
        border: "#BFDBFE",
    },

    oop: {
        color: "#7C3AED",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },

    dbms: {
        color: "#0891B2",
        background: "#ECFEFF",
        border: "#A5F3FC",
    },

    os: {
        color: "#EA580C",
        background: "#FFF7ED",
        border: "#FED7AA",
    },

    network: {
        color: "#16A34A",
        background: "#F0FDF4",
        border: "#BBF7D0",
    },

    multithreading: {
        color: "#8B5CF6",
        background: "#F5F3FF",
        border: "#DDD6FE",
    },
};


function SkillCard({
    skill,
    selectedSkill,
    onSelect,
}) {
    const isSelected = selectedSkill === skill.name;

    const colors =
        skillColors[skill.icon] || {
            color: "#2563EB",
            background: "#EFF6FF",
            border: "#BFDBFE",
        };

    return (
        <motion.button
            type="button"
            onClick={() => onSelect(skill.name)}
            aria-pressed={isSelected}
            whileHover={{
                y: -4,
                scale: 1.02,
            }}
            whileTap={{
                scale: 0.96,
            }}
            animate={{
                y: isSelected ? -5 : 0,
                scale: isSelected ? 1.04 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 350,
                damping: 22,
            }}
            className="
        group
        relative
        flex
        shrink-0
        items-center
        gap-3
        rounded-xl
        border
        bg-white
        px-5
        py-3
        text-left
        shadow-sm
        outline-none
        transition-colors
        duration-300
        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-2
      "
            style={{
                borderColor: isSelected
                    ? colors.border
                    : undefined,

                backgroundColor: isSelected
                    ? colors.background
                    : undefined,

                boxShadow: isSelected
                    ? `0 10px 30px ${colors.color}20`
                    : undefined,
            }}
        >
            {/* Selected indicator */}
            <AnimatePresence>
                {isSelected && (
                    <motion.span
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0,
                        }}
                        className="
              absolute
              -right-1.5
              -top-1.5
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-[#111111]
              text-white
            "
                    >
                        <Check size={11} strokeWidth={3} />
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Icon */}
            <motion.span
                animate={{
                    rotate: isSelected ? [0, -8, 8, 0] : 0,
                    scale: isSelected ? 1.1 : 1,
                }}
                transition={{
                    duration: 0.4,
                }}
                className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-gray-50
          transition-colors
          duration-300
        "
                style={{
                    color: isSelected
                        ? colors.color
                        : undefined,

                    backgroundColor: isSelected
                        ? `${colors.color}15`
                        : undefined,
                }}
            >
                <SkillIcon
                    name={skill.icon}
                    size={20}
                />
            </motion.span>

            {/* Name */}
            <span
                className="
          whitespace-nowrap
          text-sm
          font-medium
          text-gray-600
          transition-colors
          duration-300
          group-hover:text-[#111111]
        "
                style={{
                    color: isSelected
                        ? "#111111"
                        : undefined,
                }}
            >
                {skill.name}
            </span>
        </motion.button>
    );
}


function SkillRow({
    items,
    reverse = false,
    selectedSkill,
    onSelect,
}) {
    const marqueeItems = [...items, ...items];

    return (
        <div className="relative overflow-hidden">

            {/* Left Fade */}
            <div
                className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-10
          h-full
          w-20
          bg-gradient-to-r
          from-[#fafafa]
          to-transparent
        "
            />

            {/* Right Fade */}
            <div
                className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-10
          h-full
          w-20
          bg-gradient-to-l
          from-[#fafafa]
          to-transparent
        "
            />

            <motion.div
                className="flex w-max gap-4 py-3"
                animate={{
                    x: reverse
                        ? ["-50%", "0%"]
                        : ["0%", "-50%"],
                }}
                transition={{
                    duration: 38,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={{
                    scale: 0.995,
                }}
            >
                {marqueeItems.map((skill, index) => (
                    <SkillCard
                        key={`${skill.name}-${index}`}
                        skill={skill}
                        selectedSkill={selectedSkill}
                        onSelect={onSelect}
                    />
                ))}
            </motion.div>
        </div>
    );
}


function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);

    const selectedData = allSkills.find(
        (skill) => skill.name === selectedSkill
    );

    return (
        <section
            id="skills"
            className="
        relative
        overflow-hidden
        bg-[#fafafa]
        py-24
        md:py-28
      "
        >
            <div className="mx-auto max-w-[1100px] px-5 md:px-6">

                {/* Section Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-12"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <motion.span
                            initial={{
                                width: 0,
                            }}
                            whileInView={{
                                width: 32,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="h-px bg-blue-600"
                        />

                        <span className="text-sm font-medium tracking-wide text-blue-600">
                            Technical Skills
                        </span>
                    </div>

                    <h2
                        className="
              max-w-2xl
              text-3xl
              font-bold
              tracking-[-0.04em]
              text-[#111111]
              sm:text-4xl
              md:text-5xl
            "
                    >
                        Technologies I work with
                    </h2>

                    <p
                        className="
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-gray-500
            "
                    >
                        A collection of technologies and engineering tools I use
                        across full-stack development, AI systems, backend
                        engineering, DevOps, and security.
                    </p>
                </motion.div>


                {/* Skill Marquees */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15,
                    }}
                    className="space-y-4"
                >
                    <SkillRow
                        items={firstRow}
                        selectedSkill={selectedSkill}
                        onSelect={setSelectedSkill}
                    />

                    <SkillRow
                        items={secondRow}
                        reverse
                        selectedSkill={selectedSkill}
                        onSelect={setSelectedSkill}
                    />
                </motion.div>


                {/* Selected Skill Panel */}
                <AnimatePresence mode="wait">
                    {selectedData && (
                        <motion.div
                            key={selectedData.name}
                            initial={{
                                opacity: 0,
                                y: 15,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                mt-8
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
              "
                        >
                            <div className="flex items-center gap-4">

                                <motion.div
                                    initial={{
                                        scale: 0,
                                        rotate: -20,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 18,
                                    }}
                                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-50
                  "
                                >
                                    <SkillIcon
                                        name={selectedData.icon}
                                        size={25}
                                    />
                                </motion.div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-[#111111]">
                                            {selectedData.name}
                                        </h3>

                                        <Sparkles
                                            size={14}
                                            className="text-blue-500"
                                        />
                                    </div>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Selected technology
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedSkill(null)}
                                className="
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-gray-400
                  transition-colors
                  hover:bg-gray-100
                  hover:text-[#111111]
                "
                            >
                                Clear
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}

export default Skills;