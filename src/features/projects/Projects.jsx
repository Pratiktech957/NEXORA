import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { useCallback, useState } from "react";

import ProjectCard from "./ProjectCard";
import projects from "./projects.data";

const easing = [0.22, 1, 0.36, 1];

function Projects() {
    const reduceMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(0);

    const activeProject = projects[activeIndex];

    const goTo = useCallback((nextIndex) => {
        setActiveIndex(
            (nextIndex + projects.length) % projects.length
        );
    }, []);

    const changeSlide = useCallback(
        (direction) => {
            goTo(activeIndex + direction);
        },
        [activeIndex, goTo]
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                changeSlide(-1);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                changeSlide(1);
            }
        },
        [changeSlide]
    );

    if (!projects.length) {
        return null;
    }

    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="
                relative
                overflow-hidden
                bg-[#f7f7f5]
                px-4
                py-20
                text-[#151515]
                sm:px-7
                sm:py-24
                lg:px-10
                lg:py-28
            "
        >
            <div className="mx-auto max-w-[1440px]">
                {/* Editorial Header */}

                <motion.header
                    initial={{
                        opacity: 0,
                        y: reduceMotion ? 0 : 24,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    transition={{
                        duration: reduceMotion ? 0.01 : 0.65,
                        ease: easing,
                    }}
                    className="
                        mb-10
                        flex
                        flex-col
                        justify-between
                        gap-8
                        md:mb-14
                        md:flex-row
                        md:items-end
                    "
                >
                    <div>
                        <div
                            className="
                                mb-5
                                flex
                                items-center
                                gap-3
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.24em]
                                text-[#696962]
                            "
                        >
                            <Sparkles
                                size={13}
                                aria-hidden="true"
                            />

                            <span>Selected Work</span>

                            <span className="h-px w-8 bg-[#b9b9b2]" />

                            <span>Portfolio / 2025—26</span>
                        </div>

                        <div className="overflow-hidden">
                            <motion.h2
                                id="projects-heading"
                                initial={{
                                    y: reduceMotion ? 0 : "105%",
                                }}
                                whileInView={{
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: reduceMotion
                                        ? 0.01
                                        : 0.85,
                                    ease: easing,
                                }}
                                className="
                                    text-[clamp(3.2rem,8vw,7.4rem)]
                                    font-semibold
                                    leading-[0.86]
                                    tracking-[-0.085em]
                                "
                            >
                                Projects in
                                <br />

                                <span className="text-[#a2a29b]">
                                    motion.
                                </span>
                            </motion.h2>
                        </div>
                    </div>

                    <div className="max-w-md md:pb-2">
                        <p
                            className="
                                text-sm
                                leading-7
                                text-[#666660]
                                sm:text-base
                            "
                        >
                            A closer look at the systems I&apos;ve
                            been building across AI, real-time
                            applications, and backend engineering.
                            Explore each project through this
                            interactive showcase.
                        </p>
                    </div>
                </motion.header>

                {/* Slider Information */}

                <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                        border-y
                        border-[#dcdcd6]
                        py-3
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#777770]
                    "
                >
                    <span>Project Showcase</span>

                    <span aria-live="polite" aria-atomic="true">
                        {String(activeIndex + 1).padStart(2, "0")}

                        <span className="px-2 text-[#b0b0a8]">
                            /
                        </span>

                        {String(projects.length).padStart(2, "0")}
                    </span>
                </div>

                {/* Large Project Slider */}

                <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Selected projects"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="
                        outline-none
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#151515]
                    "
                >
                    <div className="relative">
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <ProjectCard
                                key={activeProject.id}
                                project={activeProject}
                                index={activeIndex}
                                reduceMotion={reduceMotion}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* Project Selectors and Controls */}

                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        gap-5
                        border-b
                        border-[#dcdcd6]
                        pb-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-label="Choose a project"
                    >
                        {projects.map((project, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Show project ${index + 1}: ${project.title}`}
                                    aria-pressed={isActive}
                                    className={`
                                        min-h-11
                                        border
                                        px-4
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.13em]
                                        transition-colors
                                        focus-visible:outline
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-3
                                        focus-visible:outline-[#151515]
                                        sm:text-xs
                                        ${isActive
                                            ? "border-[#151515] bg-[#151515] text-white"
                                            : "border-[#d7d7d0] bg-transparent text-[#696962] hover:border-[#777770] hover:text-[#151515]"
                                        }
                                    `}
                                >
                                    <span className="mr-2 opacity-60">
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <span className="hidden sm:inline">
                                        {project.title}
                                    </span>

                                    <span className="sm:hidden">
                                        {project.title.split(" ")[0]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                            sm:justify-end
                        "
                    >
                        <p
                            className="
                                hidden
                                text-right
                                text-xs
                                leading-5
                                text-[#777770]
                                lg:block
                            "
                        >
                            Browse the projects
                            <br />
                            one slide at a time.
                        </p>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => changeSlide(-1)}
                                aria-label="Previous project"
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    border
                                    border-[#d7d7d0]
                                    transition-colors
                                    hover:border-[#151515]
                                    hover:bg-[#151515]
                                    hover:text-white
                                    focus-visible:outline
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-3
                                    focus-visible:outline-[#151515]
                                "
                            >
                                <ArrowLeft
                                    size={17}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => changeSlide(1)}
                                aria-label="Next project"
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    bg-[#151515]
                                    text-white
                                    transition-colors
                                    hover:bg-[#41413c]
                                    focus-visible:outline
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-3
                                    focus-visible:outline-[#151515]
                                "
                            >
                                <ArrowRight
                                    size={17}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}

                <div
                    className="
                        mt-6
                        flex
                        gap-2
                    "
                    aria-hidden="true"
                >
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            type="button"
                            tabIndex={-1}
                            onClick={() => goTo(index)}
                            className={`
                                h-[3px]
                                flex-1
                                transition-colors
                                duration-300
                                ${index === activeIndex
                                    ? "bg-[#151515]"
                                    : "bg-[#deded8]"
                                }
                            `}
                        />
                    ))}
                </div>

                {/* Bottom Navigation */}

                <a
                    href="#experience"
                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#777770]
                        transition-colors
                        hover:text-[#151515]
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-[#151515]
                    "
                >
                    Continue
                    <ArrowDown
                        size={13}
                        aria-hidden="true"
                    />
                </a>
            </div>
        </section>
    );
}

export default Projects;