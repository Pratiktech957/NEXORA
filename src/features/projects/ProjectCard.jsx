import { motion } from "framer-motion";
import {
    ArrowUpRight,
    ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const easing = [0.22, 1, 0.36, 1];

function ProjectCard({
    project,
    index,
    reduceMotion = false,
}) {
    const number = String(index + 1).padStart(2, "0");

    return (
        <motion.article
            id={`project-${number}`}
            aria-labelledby={`project-title-${project.id}`}
            aria-roledescription="slide"
            initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 44,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: reduceMotion ? 0 : -36,
            }}
            transition={{
                duration: reduceMotion ? 0.01 : 0.42,
                ease: easing,
            }}
            className="
                grid
                min-h-0
                overflow-hidden
                border
                border-[#deded8]
                bg-white
                lg:min-h-[590px]
                lg:grid-cols-[1.08fr_0.92fr]
            "
        >
            {/* Large Project Image */}

            <div
                className="
                    group
                    relative
                    min-h-[290px]
                    overflow-hidden
                    bg-[#e9e9e4]
                    sm:min-h-[390px]
                    lg:min-h-[590px]
                "
            >
                <img
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.035]
                        motion-reduce:transition-none
                    "
                />

                {/* Image Overlay */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/55
                        via-black/5
                        to-black/10
                    "
                />

                {/* Top Image Labels */}

                <div
                    className="
                        absolute
                        left-5
                        right-5
                        top-5
                        flex
                        items-start
                        justify-between
                        sm:left-7
                        sm:right-7
                        sm:top-7
                    "
                >
                    <span
                        className="
                            border
                            border-white/60
                            bg-black/10
                            px-3
                            py-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-white
                            backdrop-blur-sm
                        "
                    >
                        Selected Project / {number}
                    </span>

                    <span className="text-xs font-medium text-white/90">
                        {project.year}
                    </span>
                </div>

                {/* Bottom Image Typography */}

                <div
                    className="
                        absolute
                        bottom-6
                        left-5
                        right-5
                        sm:bottom-8
                        sm:left-7
                        sm:right-7
                    "
                >
                    <p
                        className="
                            mb-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-white/75
                        "
                    >
                        {project.category}
                    </p>

                    <p
                        className="
                            max-w-2xl
                            text-3xl
                            font-semibold
                            leading-[0.95]
                            tracking-[-0.06em]
                            text-white
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        {project.title}
                    </p>
                </div>
            </div>

            {/* Project Information */}

            <div
                className="
                    flex
                    min-w-0
                    flex-col
                    p-5
                    sm:p-8
                    lg:p-10
                    xl:p-12
                "
            >
                {/* Overview Header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-[#e5e5df]
                        pb-5
                    "
                >
                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[#777770]
                        "
                    >
                        Project Overview
                    </span>

                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-[#a0a098]
                        "
                    >
                        {number} / 03
                    </span>
                </div>

                {/* Title */}

                <h3
                    id={`project-title-${project.id}`}
                    className="
                        mt-6
                        text-2xl
                        font-semibold
                        leading-tight
                        tracking-[-0.045em]
                        sm:mt-8
                        sm:text-3xl
                        xl:text-4xl
                    "
                >
                    {project.subtitle}
                </h3>

                {/* Description */}

                <p
                    className="
                        mt-4
                        text-sm
                        leading-7
                        text-[#62625c]
                        sm:text-base
                        sm:leading-8
                    "
                >
                    {project.description}
                </p>

                {/* Engineering Highlights */}

                {Array.isArray(project.highlights) &&
                    project.highlights.length > 0 && (
                        <div className="mt-6">
                            <p
                                className="
                                    mb-3
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#777770]
                                "
                            >
                                Engineering Highlights
                            </p>

                            <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                                {project.highlights
                                    .slice(0, 4)
                                    .map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="
                                                flex
                                                items-start
                                                gap-2
                                                text-xs
                                                leading-5
                                                text-[#555550]
                                                sm:text-sm
                                            "
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="
                                                    mt-[7px]
                                                    h-1
                                                    w-1
                                                    shrink-0
                                                    rounded-full
                                                    bg-[#151515]
                                                "
                                            />

                                            {highlight}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                {/* Technology Stack */}

                {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                        <div className="mt-6">
                            <p
                                className="
                                    mb-3
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#777770]
                                "
                            >
                                Technology Stack
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(
                                    (technology) => (
                                        <span
                                            key={technology}
                                            className="
                                                border
                                                border-[#deded8]
                                                bg-[#fafaf8]
                                                px-2.5
                                                py-1.5
                                                text-[10px]
                                                font-medium
                                                text-[#5f5f59]
                                                sm:text-[11px]
                                            "
                                        >
                                            {technology}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                {/* Project Links */}

                <div
                    className="
                        mt-auto
                        mt-7
                        flex
                        flex-wrap
                        items-center
                        gap-5
                        border-t
                        border-[#e5e5df]
                        pt-6
                    "
                >
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on GitHub`}
                            className="
                                inline-flex
                                min-h-11
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                transition-colors
                                hover:text-[#777770]
                                focus-visible:outline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[#151515]
                            "
                        >
                            <FaGithub
                                size={16}
                                aria-hidden="true"
                            />

                            GitHub

                            <ArrowUpRight
                                size={14}
                                aria-hidden="true"
                            />
                        </a>
                    )}

                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo of ${project.title}`}
                            className="
                                inline-flex
                                min-h-11
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                transition-colors
                                hover:text-[#777770]
                                focus-visible:outline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[#151515]
                            "
                        >
                            <ExternalLink
                                size={14}
                                aria-hidden="true"
                            />

                            Live Demo
                        </a>
                    )}

                    <span
                        className="
                            ml-auto
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-[#999991]
                        "
                    >
                        {project.year}
                    </span>
                </div>
            </div>
        </motion.article>
    );
}

export default ProjectCard;