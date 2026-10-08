import { motion } from "framer-motion";
import {
    ArrowUpRight,
    ExternalLink,
    Rotate3d,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: 8,
    },

    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function ProjectCard({ project, index }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.2,
            }}
            className="
        group
        [perspective:1400px]
      "
        >
            {/* =========================================
          FLIP CONTAINER
      ========================================= */}

            <motion.div
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                    scale: 1.015,
                }}
                className="
          relative
          min-h-[540px]
          w-full
          cursor-pointer
          [transform-style:preserve-3d]
        "
                onClick={() => setIsFlipped((prev) => !prev)}
            >
                {/* =========================================
            FRONT
        ========================================= */}

                <div
                    className="
            absolute
            inset-0
            overflow-hidden
            rounded-3xl
            border
            border-[#e5e7eb]
            bg-white
            shadow-[0_8px_35px_rgba(0,0,0,0.04)]
            [backface-visibility:hidden]
          "
                >
                    {/* -----------------------------------------
              IMAGE
          ----------------------------------------- */}

                    <div
                        className="
              relative
              h-[330px]
              overflow-hidden
              bg-[#f3f4f6]
            "
                    >
                        <motion.img
                            src={project.image}
                            alt={`${project.title} project preview`}
                            loading={index === 0 ? "eager" : "lazy"}
                            whileHover={{
                                scale: 1.06,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="
                h-full
                w-full
                object-cover
              "
                        />

                        {/* Image overlay */}

                        <div
                            className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/30
                via-transparent
                to-transparent
              "
                        />

                        {/* Number */}

                        <div
                            className="
                absolute
                left-5
                top-5
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/20
                text-xs
                font-semibold
                text-white
                backdrop-blur-md
              "
                        >
                            {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Year */}

                        <div
                            className="
                absolute
                right-5
                top-5
                rounded-full
                border
                border-white/50
                bg-white/85
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-[#374151]
                backdrop-blur-md
              "
                        >
                            {project.year}
                        </div>

                        {/* Center icon */}

                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute
                bottom-5
                right-5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/20
                text-white
                backdrop-blur-md
              "
                        >
                            <Rotate3d size={17} />
                        </motion.div>
                    </div>

                    {/* -----------------------------------------
              FRONT CONTENT
          ----------------------------------------- */}

                    <div className="p-6 md:p-7">
                        <div
                            className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#2563eb]
              "
                        >
                            {project.category}
                        </div>

                        <h3
                            className="
                text-2xl
                font-semibold
                tracking-[-0.035em]
                text-[#111111]
              "
                        >
                            {project.title}
                        </h3>

                        <p
                            className="
                mt-2
                text-sm
                font-medium
                text-[#6b7280]
              "
                        >
                            {project.subtitle}
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                            <span
                                className="
                  text-xs
                  font-medium
                  text-[#9ca3af]
                "
                            >
                                Hover / click to explore
                            </span>

                            <motion.span
                                animate={{
                                    x: [0, 4, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                }}
                                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#e5e7eb]
                  text-[#374151]
                "
                            >
                                <ArrowUpRight size={15} />
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* =========================================
            BACK
        ========================================= */}

                <div
                    className="
            absolute
            inset-0
            overflow-hidden
            rounded-3xl
            border
            border-[#dbe4ff]
            bg-[#111111]
            p-6
            text-white
            shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
            md:p-7
          "
                >
                    {/* Background grid */}

                    <div
                        aria-hidden="true"
                        className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.05]
              [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
              [background-size:28px_28px]
            "
                    />

                    <div className="relative flex h-full flex-col">

                        {/* Back header */}

                        <div className="flex items-start justify-between">
                            <div>
                                <div
                                    className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-blue-400
                  "
                                >
                                    {project.category}
                                </div>

                                <h3
                                    className="
                    mt-2
                    text-xl
                    font-semibold
                    tracking-[-0.025em]
                  "
                                >
                                    {project.title}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setIsFlipped(false);
                                }}
                                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white/60
                  transition-colors
                  hover:border-white/30
                  hover:text-white
                "
                                aria-label="Flip project card back"
                            >
                                <Rotate3d size={15} />
                            </button>
                        </div>

                        {/* Divider */}

                        <div className="my-6 h-px bg-white/10" />

                        {/* Description */}

                        <div>
                            <p
                                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
                            >
                                Overview
                            </p>

                            <p
                                className="
                  mt-3
                  text-sm
                  leading-6
                  text-white/70
                "
                            >
                                {project.description}
                            </p>
                        </div>

                        {/* Highlights */}

                        <div className="mt-6">
                            <p
                                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
                            >
                                Key Engineering Work
                            </p>

                            <div className="mt-3 space-y-2.5">
                                {project.highlights
                                    .slice(0, 3)
                                    .map((highlight) => (
                                        <div
                                            key={highlight}
                                            className="
                        flex
                        items-start
                        gap-2.5
                        text-xs
                        leading-5
                        text-white/65
                      "
                                        >
                                            <span
                                                className="
                          mt-1.5
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-blue-400
                        "
                                            />

                                            {highlight}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Stack */}

                        <div className="mt-6">
                            <p
                                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
                            >
                                Stack
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.technologies
                                    .slice(0, 6)
                                    .map((technology) => (
                                        <span
                                            key={technology}
                                            className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.06]
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-medium
                        text-white/65
                      "
                                        >
                                            {technology}
                                        </span>
                                    ))}
                            </div>
                        </div>

                        {/* Actions */}

                        <div
                            className="
                mt-auto
                flex
                flex-wrap
                gap-3
                border-t
                border-white/10
                pt-5
              "
                        >
                            <a
                                href={`/projects/${project.id}`}
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#111111]
                  transition-colors
                  hover:bg-blue-500
                  hover:text-white
                "
                            >
                                Case Study

                                <ArrowUpRight size={14} />
                            </a>

                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white/70
                    transition-colors
                    hover:border-white/30
                    hover:text-white
                  "
                                >
                                    <FaGithub size={14} />

                                    GitHub
                                </a>
                            )}

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white/70
                    transition-colors
                    hover:border-white/30
                    hover:text-white
                  "
                                >
                                    <ExternalLink size={14} />

                                    Live
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ProjectCard;