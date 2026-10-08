import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Trophy,
} from "lucide-react";
import { useState } from "react";

import hackathons from "./hackathons.data";

function Hackathons() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeHackathon = hackathons[activeIndex];

    const previousHackathon = () => {
        setActiveIndex((current) =>
            current === 0
                ? hackathons.length - 1
                : current - 1
        );
    };

    const nextHackathon = () => {
        setActiveIndex((current) =>
            current === hackathons.length - 1
                ? 0
                : current + 1
        );
    };

    if (!hackathons.length) {
        return null;
    }

    return (
        <section
            id="hackathons"
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
            {/* Background */}

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
          [background-size:50px_50px]
        "
            />

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.07]
          blur-[130px]
        "
            />

            <div className="relative mx-auto max-w-[1150px]">

                {/* =========================================
            HEADER
        ========================================= */}

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
                    }}
                    className="
            mb-12
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-end
            md:justify-between
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
                text-blue-400
              "
                        >
                            <Trophy size={13} />

                            Hackathon Archive
                        </div>

                        <h2
                            className="
                text-4xl
                font-semibold
                tracking-[-0.05em]
                sm:text-5xl
                md:text-6xl
              "
                        >
                            Built under
                            <br />

                            <span className="text-white/30">
                                pressure.
                            </span>
                        </h2>
                    </div>

                    <div
                        className="
              max-w-sm
              text-sm
              leading-6
              text-white/40
            "
                    >
                        A visual archive of competitions,
                        challenges, collaborations, and
                        moments where ideas had to become
                        working solutions.
                    </div>
                </motion.div>

                {/* =========================================
            MAIN ARCHIVE
        ========================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
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
                    }}
                    className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.025]
          "
                >

                    {/* =======================================
              TOP BAR
          ======================================= */}

                    <div
                        className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-5
              py-4
              md:px-7
            "
                    >
                        <div
                            className="
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white/30
              "
                        >
                            <span
                                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-400
                "
                            />

                            Archive / {String(
                                activeIndex + 1
                            ).padStart(2, "0")}
                        </div>

                        <div
                            className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/25
              "
                        >
                            {String(hackathons.length).padStart(
                                2,
                                "0"
                            )}{" "}
                            entries
                        </div>
                    </div>

                    {/* =======================================
              MAIN IMAGE
          ======================================= */}

                    <div
                        className="
              relative
              h-[320px]
              overflow-hidden
              sm:h-[420px]
              md:h-[560px]
            "
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeHackathon.id}
                                initial={{
                                    opacity: 0,
                                    scale: 1.06,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.98,
                                }}
                                transition={{
                                    duration: 0.55,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="
                  absolute
                  inset-0
                "
                            >
                                <img
                                    src={
                                        activeHackathon.image ||
                                        "/images/hackathons/placeholder.svg"
                                    }
                                    alt={activeHackathon.title}
                                    className="
                    h-full
                    w-full
                    object-cover
                  "
                                />

                                {/* Image gradient */}

                                <div
                                    className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/20
                    to-transparent
                  "
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* =====================================
                IMAGE INFORMATION
            ===================================== */}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeHackathon.id}-info`}
                                initial={{
                                    opacity: 0,
                                    x: -25,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 25,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                                className="
                  absolute
                  bottom-7
                  left-5
                  right-5
                  md:bottom-9
                  md:left-8
                "
                            >
                                <div
                                    className="
                    mb-3
                    flex
                    items-center
                    gap-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-blue-400
                  "
                                >
                                    {activeHackathon.organization}

                                    <span className="h-px w-8 bg-blue-400/40" />

                                    {activeHackathon.year}
                                </div>

                                <h3
                                    className="
                    max-w-2xl
                    text-2xl
                    font-semibold
                    tracking-[-0.035em]
                    sm:text-3xl
                    md:text-5xl
                  "
                                >
                                    {activeHackathon.title}
                                </h3>

                                {activeHackathon.achievement && (
                                    <div
                                        className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/20
                      bg-black/30
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-white/80
                      backdrop-blur-md
                    "
                                    >
                                        <Trophy
                                            size={12}
                                            className="text-blue-400"
                                        />

                                        {activeHackathon.achievement}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* =====================================
                ARROWS
            ===================================== */}

                        <div
                            className="
                absolute
                bottom-7
                right-5
                flex
                gap-2
                md:bottom-9
                md:right-8
              "
                        >
                            <button
                                type="button"
                                onClick={previousHackathon}
                                aria-label="Previous hackathon"
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  text-white/70
                  backdrop-blur-md
                  transition-all
                  hover:border-white/40
                  hover:bg-white
                  hover:text-black
                "
                            >
                                <ArrowLeft size={16} />
                            </button>

                            <button
                                type="button"
                                onClick={nextHackathon}
                                aria-label="Next hackathon"
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  text-white/70
                  backdrop-blur-md
                  transition-all
                  hover:border-white/40
                  hover:bg-white
                  hover:text-black
                "
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* =======================================
              THUMBNAIL STRIP
          ======================================= */}

                    <div
                        className="
              overflow-x-auto
              border-t
              border-white/10
              px-4
              py-4
              scrollbar-none
              md:px-6
            "
                    >
                        <div
                            className="
                flex
                min-w-max
                gap-3
              "
                        >
                            {hackathons.map(
                                (hackathon, index) => {
                                    const active =
                                        index === activeIndex;

                                    return (
                                        <button
                                            key={hackathon.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveIndex(index)
                                            }
                                            className={`
                        group
                        relative
                        h-[64px]
                        w-[92px]
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        border
                        transition-all
                        duration-300
                        md:h-[72px]
                        md:w-[105px]
                        ${active
                                                    ? "border-blue-400 opacity-100"
                                                    : "border-white/10 opacity-40 hover:opacity-75"
                                                }
                      `}
                                        >
                                            <img
                                                src={
                                                    hackathon.image ||
                                                    "/images/hackathons/placeholder.svg"
                                                }
                                                alt=""
                                                className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                                            />

                                            <div
                                                className={`
                          absolute
                          inset-0
                          ${active
                                                        ? "bg-blue-500/10"
                                                        : "bg-black/30"
                                                    }
                        `}
                                            />

                                            <span
                                                className="
                          absolute
                          bottom-1.5
                          left-2
                          text-[8px]
                          font-semibold
                          text-white
                        "
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* =========================================
            COUNTER
        ========================================= */}

                <div
                    className="
            mt-6
            flex
            items-center
            justify-between
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-white/20
          "
                >
                    <span>
                        {String(activeIndex + 1).padStart(2, "0")}
                        {" / "}
                        {String(hackathons.length).padStart(
                            2,
                            "0"
                        )}
                    </span>

                    <span>
                        Select an entry
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Hackathons;