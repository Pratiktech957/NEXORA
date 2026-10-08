import { motion } from "framer-motion";
import {
    ArrowUpRight,
    BriefcaseBusiness,
    Check,
    MapPin,
} from "lucide-react";
import { useState } from "react";
import experience from "./experience.data";

function Experience() {
    const [activeId, setActiveId] = useState(
        experience[0]?.id
    );

    const activeExperience =
        experience.find(
            (item) => item.id === activeId
        ) || experience[0];

    return (
        <section
            id="experience"
            className="
        relative
        overflow-hidden
        bg-[#111111]
        px-5
        py-24
        text-white
        md:px-6
        md:py-32
      "
        >
            {/* =========================================
          BACKGROUND GRID
      ========================================= */}

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
          [background-size:48px_48px]
        "
            />

            {/* Blue ambient glow */}

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          right-[-200px]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/[0.08]
          blur-[130px]
        "
            />

            <div className="relative mx-auto max-w-[1100px]">

                {/* =========================================
            HEADER
        ========================================= */}

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
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mb-16"
                >
                    <div
                        className="
              mb-5
              flex
              items-center
              gap-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-blue-400
            "
                    >
                        <BriefcaseBusiness size={13} />

                        Experience
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2
                                className="
                  text-4xl
                  font-semibold
                  tracking-[-0.045em]
                  sm:text-5xl
                  md:text-6xl
                "
                            >
                                Where I learned
                                <br />

                                <span className="text-white/35">
                                    to build for real.
                                </span>
                            </h2>

                            <p
                                className="
                  mt-6
                  max-w-xl
                  text-sm
                  leading-7
                  text-white/50
                  md:text-base
                "
                            >
                                Hands-on experience building web
                                applications, working with development
                                workflows, debugging real problems, and
                                shipping software.
                            </p>
                        </div>

                        {/* Experience count */}

                        <div
                            className="
                flex
                items-center
                gap-4
                border-t
                border-white/10
                pt-4
                md:border-l
                md:border-t-0
                md:pl-5
                md:pt-0
              "
                        >
                            <span
                                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                "
                            >
                                {String(experience.length).padStart(
                                    2,
                                    "0"
                                )}
                            </span>

                            <span
                                className="
                  max-w-[90px]
                  text-[10px]
                  uppercase
                  leading-4
                  tracking-[0.15em]
                  text-white/35
                "
                            >
                                Professional Experiences
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================
            EXPERIENCE WORKSPACE
        ========================================= */}

                <div
                    className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[240px_1fr]
          "
                >

                    {/* =======================================
              LEFT TIMELINE
          ======================================= */}

                    <div className="relative">

                        {/* Vertical line */}

                        <div
                            aria-hidden="true"
                            className="
                absolute
                bottom-5
                left-[7px]
                top-5
                w-px
                bg-white/10
              "
                        />

                        {/* Timeline items */}

                        <div className="relative space-y-8">
                            {experience.map((item, index) => {
                                const isActive =
                                    item.id === activeId;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                            setActiveId(item.id)
                                        }
                                        className="
                      group
                      relative
                      flex
                      w-full
                      items-start
                      gap-5
                      text-left
                    "
                                    >
                                        {/* Timeline dot */}

                                        <motion.span
                                            animate={{
                                                scale: isActive ? 1 : 0.7,
                                                backgroundColor: isActive
                                                    ? "#3b82f6"
                                                    : "#374151",
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className="
                        relative
                        z-10
                        mt-1
                        h-[15px]
                        w-[15px]
                        shrink-0
                        rounded-full
                        border
                        border-[#111111]
                        ring-1
                        ring-white/10
                      "
                                        />

                                        {/* Text */}

                                        <div>
                                            <p
                                                className={`
                          text-xs
                          font-semibold
                          transition-colors
                          ${isActive
                                                        ? "text-white"
                                                        : "text-white/35 group-hover:text-white/65"
                                                    }
                        `}
                                            >
                                                {item.year}
                                            </p>

                                            <p
                                                className={`
                          mt-1
                          text-[11px]
                          transition-colors
                          ${isActive
                                                        ? "text-blue-400"
                                                        : "text-white/25"
                                                    }
                        `}
                                            >
                                                {item.company}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* =======================================
              EXPERIENCE PANEL
          ======================================= */}

                    <motion.div
                        key={activeExperience.id}
                        initial={{
                            opacity: 0,
                            x: 25,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.035]
              p-6
              backdrop-blur-sm
              md:p-8
            "
                    >
                        {/* Top status */}

                        <div
                            className="
                mb-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
              "
                        >
                            <div
                                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-3
                  py-1.5
                "
                            >
                                <span className="relative flex h-2 w-2">
                                    <span
                                        className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-blue-400
                      opacity-60
                    "
                                    />

                                    <span
                                        className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-blue-400
                    "
                                    />
                                </span>

                                <span
                                    className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white/55
                  "
                                >
                                    {activeExperience.status}
                                </span>
                            </div>

                            <span
                                className="
                  text-xs
                  font-medium
                  text-white/30
                "
                            >
                                {activeExperience.period}
                            </span>
                        </div>

                        {/* Company */}

                        <div>
                            <h3
                                className="
                  text-2xl
                  font-semibold
                  tracking-[-0.035em]
                  md:text-3xl
                "
                            >
                                {activeExperience.role}
                            </h3>

                            <p
                                className="
                  mt-2
                  text-sm
                  font-medium
                  text-blue-400
                "
                            >
                                {activeExperience.company}
                            </p>

                            <div
                                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-4
                  text-[11px]
                  text-white/35
                "
                            >
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={12} />

                                    {activeExperience.location}
                                </span>

                                <span>
                                    {activeExperience.type}
                                </span>
                            </div>
                        </div>

                        {/* Divider */}

                        <div className="my-8 h-px bg-white/10" />

                        {/* Description */}

                        <p
                            className="
                max-w-2xl
                text-sm
                leading-7
                text-white/55
              "
                        >
                            {activeExperience.description}
                        </p>

                        {/* Responsibilities */}

                        <div className="mt-8">
                            <p
                                className="
                  mb-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/30
                "
                            >
                                What I worked on
                            </p>

                            <div className="grid gap-3 md:grid-cols-2">
                                {activeExperience.responsibilities.map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        p-3.5
                      "
                                        >
                                            <Check
                                                size={14}
                                                className="
                          mt-0.5
                          shrink-0
                          text-blue-400
                        "
                                            />

                                            <span
                                                className="
                          text-xs
                          leading-5
                          text-white/50
                        "
                                            >
                                                {item}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Technologies */}

                        <div className="mt-8">
                            <p
                                className="
                  mb-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/30
                "
                            >
                                Technologies
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {activeExperience.technologies.map(
                                    (technology) => (
                                        <motion.span
                                            key={technology}
                                            whileHover={{
                                                y: -2,
                                            }}
                                            className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        text-white/50
                        transition-colors
                        hover:border-blue-400/30
                        hover:text-blue-300
                      "
                                        >
                                            {technology}
                                        </motion.span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Corner number */}

                        <div
                            aria-hidden="true"
                            className="
                pointer-events-none
                absolute
                bottom-[-40px]
                right-[-20px]
                select-none
                text-[180px]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-white/[0.025]
              "
                        >
                            {activeExperience.year}
                        </div>

                        {/* Explore arrow */}

                        <div
                            className="
                absolute
                right-7
                top-7
                hidden
                text-white/15
                md:block
              "
                        >
                            <ArrowUpRight size={20} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Experience;