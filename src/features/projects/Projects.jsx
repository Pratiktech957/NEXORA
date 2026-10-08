import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import ProjectCard from "./ProjectCard";
import projects from "./projects.data";

function Projects() {
    return (
        <section
            id="projects"
            className="
        relative
        z-20
        overflow-hidden
        bg-[#fafafa]
        px-5
        py-24
        md:px-6
        md:py-32
      "
        >
            <div className="mx-auto max-w-[1100px]">

                {/* Header */}

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
                    className="mb-14"
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
              text-[#2563eb]
            "
                    >
                        <Sparkles size={13} />

                        Selected Projects
                    </div>

                    <h2
                        className="
              max-w-3xl
              text-4xl
              font-semibold
              tracking-[-0.045em]
              text-[#111111]
              sm:text-5xl
              md:text-6xl
            "
                    >
                        Built. Tested.
                        <br />
                        <span className="text-[#9ca3af]">
                            Still improving.
                        </span>
                    </h2>

                    <p
                        className="
              mt-6
              max-w-xl
              text-sm
              leading-7
              text-[#6b7280]
              md:text-base
            "
                    >
                        Explore some of the systems I've built across
                        full-stack development, AI, real-time
                        applications, and backend engineering.
                    </p>
                </motion.div>

                {/* Project Cards */}

                <div
                    className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
          "
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.2,
                    }}
                    className="
            mt-14
            flex
            justify-center
          "
                >
                    <a
                        href="#experience"
                        className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#9ca3af]
              transition-colors
              hover:text-[#2563eb]
            "
                    >
                        Continue

                        <ArrowDown
                            size={14}
                            className="
                transition-transform
                group-hover:translate-y-1
              "
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Projects;