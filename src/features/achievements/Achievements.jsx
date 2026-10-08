import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import achievements from "./achievements.data";

function Achievements() {
    return (
        <section
            id="achievements"
            className="relative overflow-hidden bg-[#111111] px-5 py-24 text-white md:px-6 md:py-32"
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
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/[0.06]
          blur-[120px]
        "
            />

            <div className="relative mx-auto max-w-[1150px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-blue-500" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                                Achievements
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                            Built under pressure.
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
                            A few milestones from hackathons and competitive technical
                            events.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Trophy size={18} />
                        <span>{String(achievements.length).padStart(2, "0")} milestones</span>
                    </div>
                </motion.div>

                {/* Achievement rows */}
                <div className="border-y border-white/10">
                    {achievements.map((achievement, index) => (
                        <motion.article
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.55,
                                delay: index * 0.1,
                            }}
                            className="
                group
                grid
                gap-6
                border-b
                border-white/10
                py-8
                last:border-b-0
                md:grid-cols-[90px_1fr_auto]
                md:items-center
              "
                        >
                            {/* Number */}
                            <span className="font-mono text-sm text-gray-600">
                                {achievement.number}
                            </span>

                            {/* Main */}
                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-blue-400">
                                        {achievement.type}
                                    </span>

                                    <span className="text-xs text-gray-600">
                                        {achievement.year}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-400 md:text-2xl">
                                    {achievement.title}
                                </h3>

                                <p className="mt-1 text-sm font-medium text-gray-400">
                                    {achievement.event}
                                </p>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                                    {achievement.description}
                                </p>
                            </div>

                            {/* Arrow */}
                            <div
                                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  text-gray-500
                  transition-all
                  duration-300
                  group-hover:border-blue-400/30
                  group-hover:bg-blue-400/10
                  group-hover:text-blue-400
                "
                            >
                                <ArrowUpRight size={17} />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Achievements;