import { useState } from "react";
import {
    motion,
    AnimatePresence,
    useAnimationControls,
    useReducedMotion,
} from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";

import skills from "./skills.data";
import SkillIcon from "./SkillIcon";

const allSkills = skills.flatMap((group) => group.items);
const midpoint = Math.ceil(allSkills.length / 2);
const firstRow = allSkills.slice(0, midpoint);
const secondRow = allSkills.slice(midpoint);

// Shared easing so hover, selection, and panel motion feel unified.
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

function SkillCard({ skill, selected, onSelect, reduceMotion }) {
    return (
        <motion.button
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(skill.name)}
            whileHover={
                reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.18, ease: EASE_OUT_EXPO },
                    }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl
        border bg-white px-5 py-3 text-left
        transition-[border-color,box-shadow,background-color]
        duration-200 motion-reduce:transition-none
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-600 focus-visible:ring-offset-2
        ${selected
                    ? "border-blue-600 bg-blue-50/60 shadow-[0_6px_20px_rgba(37,99,235,0.14)]"
                    : "border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-[0_6px_18px_rgba(17,17,17,0.06)]"
                }`}
        >
            {/* Selected check badge */}
            <AnimatePresence>
                {selected && (
                    <motion.span
                        initial={
                            reduceMotion
                                ? false
                                : { scale: 0, opacity: 0 }
                        }
                        animate={{ scale: 1, opacity: 1 }}
                        exit={
                            reduceMotion
                                ? undefined
                                : { scale: 0, opacity: 0 }
                        }
                        transition={{
                            duration: reduceMotion ? 0 : 0.22,
                            ease: EASE_OUT_EXPO,
                        }}
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5
              items-center justify-center rounded-full bg-blue-600 text-white
              shadow-[0_2px_6px_rgba(37,99,235,0.35)]"
                    >
                        <Check size={11} strokeWidth={3} />
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Icon tile */}
            <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center
          rounded-lg transition-colors duration-200 motion-reduce:transition-none
          ${selected
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}
            >
                <SkillIcon name={skill.icon} size={20} />
            </span>

            {/* Label */}
            <span
                className={`whitespace-nowrap text-sm font-medium
          transition-colors duration-200 motion-reduce:transition-none
          ${selected
                        ? "text-blue-800"
                        : "text-gray-600 group-hover:text-[#111111]"
                    }`}
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
    reduceMotion,
}) {
    const controls = useAnimationControls();
    const duplicatedItems = [...items, ...items];

    const startMarquee = () => {
        if (reduceMotion) return;

        controls.start({
            x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
            transition: {
                duration: 60,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            },
        });
    };

    const pauseMarquee = () => controls.stop();

    return (
        <div
            className="group relative overflow-hidden py-1"
            onMouseEnter={pauseMarquee}
            onMouseLeave={startMarquee}
            onFocusCapture={pauseMarquee}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    startMarquee();
                }
            }}
        >
            {/* Fade edges — match section background so they blend cleanly */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10
        w-12 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent sm:w-20" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10
        w-12 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent sm:w-20" />

            <motion.div
                className="flex w-max gap-4"
                initial={{
                    x: reduceMotion ? 0 : reverse ? "-50%" : "0%",
                }}
                animate={reduceMotion ? { x: 0 } : controls}
            >
                {duplicatedItems.map((skill, index) => (
                    <SkillCard
                        key={`${skill.name}-${index}`}
                        skill={skill}
                        selected={selectedSkill === skill.name}
                        onSelect={onSelect}
                        reduceMotion={reduceMotion}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const reduceMotion = useReducedMotion();

    const selectedData = allSkills.find(
        (skill) => skill.name === selectedSkill
    );

    return (
        <section
            id="skills"
            className="relative overflow-hidden bg-[#fafafa] py-20 sm:py-24 md:py-28"
        >
            {/* Ambient blue glow — very subtle, matches Hero language */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-24 z-0
          h-[420px] w-[420px] rounded-full bg-blue-100/25 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-[1100px] px-5 md:px-6">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                    className="mb-10 sm:mb-12"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-10 bg-blue-600" />
                        <span className="text-sm font-medium tracking-wide text-blue-600">
                            Technical Skills
                        </span>
                    </div>

                    <h2 className="max-w-2xl text-3xl font-bold tracking-[-0.04em]
            text-[#111111] sm:text-4xl md:text-5xl">
                        Technologies I work with
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
                        A collection of technologies and engineering tools I use across
                        full-stack development, AI systems, backend engineering, DevOps,
                        and security.
                    </p>
                </motion.div>

                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                        duration: 0.55,
                        delay: reduceMotion ? 0 : 0.08,
                        ease: EASE_OUT_EXPO,
                    }}
                    className="space-y-4"
                >
                    <SkillRow
                        items={firstRow}
                        selectedSkill={selectedSkill}
                        onSelect={setSelectedSkill}
                        reduceMotion={reduceMotion}
                    />

                    <SkillRow
                        items={secondRow}
                        reverse
                        selectedSkill={selectedSkill}
                        onSelect={setSelectedSkill}
                        reduceMotion={reduceMotion}
                    />
                </motion.div>

                {/* Selected skill panel */}
                <AnimatePresence mode="wait">
                    {selectedData && (
                        <motion.div
                            key={selectedData.name}
                            initial={
                                reduceMotion
                                    ? false
                                    : { opacity: 0, y: 10, scale: 0.98 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                                reduceMotion
                                    ? undefined
                                    : { opacity: 0, y: -6, scale: 0.98 }
                            }
                            transition={{
                                duration: reduceMotion ? 0 : 0.28,
                                ease: EASE_OUT_EXPO,
                            }}
                            className="mt-8 flex items-center justify-between gap-4
                rounded-2xl border border-blue-100 bg-white p-4
                shadow-[0_10px_30px_rgba(37,99,235,0.08)] sm:p-5"
                        >
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center
                  justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <SkillIcon name={selectedData.icon} size={23} />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-semibold text-[#111111]">
                                            {selectedData.name}
                                        </h3>
                                        <span className="inline-flex items-center gap-1
                      rounded-full bg-blue-50 px-2 py-0.5 text-[11px]
                      font-medium text-blue-700">
                                            <Sparkles size={11} />
                                            Selected
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {selectedData.category ||
                                            "Selected technology"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedSkill(null)}
                                aria-label="Clear selected skill"
                                className="flex shrink-0 items-center gap-1 rounded-lg
                  px-3 py-2 text-sm text-gray-500
                  transition-colors duration-200 motion-reduce:transition-none
                  hover:bg-blue-50 hover:text-blue-700
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                            >
                                <X size={15} />
                                <span className="hidden sm:inline">Clear</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Skills;