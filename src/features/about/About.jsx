import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    Database,
    Server,
    ShieldCheck,
    Terminal,
} from "lucide-react";

const focusAreas = [
    {
        icon: Code2,
        title: "Full-Stack Development",
        description:
            "Building responsive interfaces and complete web applications using React, Node.js, Express, and modern web technologies.",
    },
    {
        icon: Server,
        title: "Backend Engineering",
        description:
            "Designing REST APIs, authentication systems, real-time services, and backend architectures that are reliable and maintainable.",
    },
    {
        icon: Database,
        title: "Data & AI",
        description:
            "Working with databases, RAG systems, LLM integrations, and AI-powered applications to solve practical problems.",
    },
    {
        icon: ShieldCheck,
        title: "Security & DevOps",
        description:
            "Exploring secure API design, authentication, authorization, Docker, caching, monitoring, and production-oriented workflows.",
    },
];

const philosophy = [
    {
        number: "01",
        title: "Understand",
        description:
            "Start with the problem, requirements, and system before jumping into implementation.",
    },
    {
        number: "02",
        title: "Build",
        description:
            "Turn ideas into practical software with clean structure, useful abstractions, and maintainable code.",
    },
    {
        number: "03",
        title: "Improve",
        description:
            "Debug, test, secure, measure, and continuously improve the system after it works.",
    },
];

function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-white px-5 py-24 md:px-6 md:py-32"
        >
            {/* Background grid */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)]
          [background-size:50px_50px]
        "
            />

            <div className="relative mx-auto max-w-[1150px]">
                {/* =========================
            HEADER
        ========================== */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65 }}
                    className="max-w-3xl"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-blue-600" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                            About Me
                        </span>
                    </div>

                    <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight text-[#111] md:text-6xl">
                        I build systems,
                        <br />
                        <span className="text-gray-400">not just interfaces.</span>
                    </h2>
                </motion.div>

                {/* =========================
            INTRO
        ========================== */}
                <div className="mt-16 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
                    {/* Left label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-start gap-3"
                    >
                        <Terminal
                            size={18}
                            strokeWidth={1.8}
                            className="mt-1 text-blue-600"
                        />

                        <div>
                            <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
                                Software Engineer
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Full-Stack · Backend · AI
                            </p>
                        </div>
                    </motion.div>

                    {/* Main text */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65 }}
                    >
                        <p className="text-xl font-medium leading-9 text-[#222] md:text-2xl">
                            I'm a Computer Science student focused on becoming a
                            production-oriented Software Engineer, with a strong interest in
                            full-stack development, backend engineering, AI-powered systems,
                            and scalable software.
                        </p>

                        <p className="mt-7 text-sm leading-7 text-gray-500 md:text-base">
                            My journey started with frontend development and gradually
                            expanded into backend engineering, databases, APIs,
                            authentication, real-time communication, and AI integration.
                        </p>

                        <p className="mt-5 text-sm leading-7 text-gray-500 md:text-base">
                            I enjoy understanding what happens behind the interface —
                            designing APIs, structuring data, securing applications,
                            debugging systems, and learning how software behaves when it
                            moves closer to production.
                        </p>

                        <p className="mt-5 text-sm leading-7 text-gray-500 md:text-base">
                            Alongside development, I'm strengthening my fundamentals in
                            data structures and algorithms, operating systems, computer
                            networks, databases, system design, and software engineering.
                        </p>
                    </motion.div>
                </div>

                {/* =========================
            FOCUS AREAS
        ========================== */}
                <div className="mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                                What I Work With
                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-[#111]">
                                Areas of focus
                            </h3>
                        </div>

                        <span className="hidden font-mono text-xs text-gray-400 sm:block">
                            04 AREAS
                        </span>
                    </motion.div>

                    <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-2">
                        {focusAreas.map((area, index) => {
                            const Icon = area.icon;

                            return (
                                <motion.article
                                    key={area.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                    }}
                                    className="
                    group
                    bg-white
                    p-7
                    transition-colors
                    duration-300
                    hover:bg-[#fafafa]
                    md:p-9
                  "
                                >
                                    <div className="flex items-start justify-between">
                                        <div
                                            className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        text-blue-600
                        transition-all
                        duration-300
                        group-hover:border-blue-200
                        group-hover:bg-blue-50
                      "
                                        >
                                            <Icon size={20} strokeWidth={1.7} />
                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="
                        text-gray-300
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-blue-600
                      "
                                        />
                                    </div>

                                    <h4 className="mt-7 text-lg font-semibold text-[#111]">
                                        {area.title}
                                    </h4>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {area.description}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>

                {/* =========================
            ENGINEERING PHILOSOPHY
        ========================== */}
                <div className="mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="mb-8"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Engineering Philosophy
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-[#111]">
                            How I approach building software
                        </h3>
                    </motion.div>

                    <div className="grid border-t border-gray-200 md:grid-cols-3">
                        {philosophy.map((item, index) => (
                            <motion.article
                                key={item.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="
                  border-b
                  border-gray-200
                  py-8
                  md:border-b-0
                  md:border-r
                  md:px-8
                  md:first:pl-0
                  md:last:border-r-0
                "
                            >
                                <span className="font-mono text-xs text-gray-400">
                                    {item.number}
                                </span>

                                <h4 className="mt-5 text-xl font-semibold text-[#111]">
                                    {item.title}
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {item.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* =========================
            BOTTOM STATEMENT
        ========================== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="
            mt-20
            flex
            flex-col
            gap-5
            border-t
            border-gray-200
            pt-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >
                    <p className="max-w-2xl text-sm leading-7 text-gray-400">
                        Always learning, building, debugging, and improving — with the
                        goal of becoming a stronger engineer one system at a time.
                    </p>

                    <a
                        href="#contact"
                        className="
              group
              inline-flex
              shrink-0
              items-center
              gap-2
              text-sm
              font-medium
              text-[#111]
              transition-colors
              hover:text-blue-600
            "
                    >
                        Let's connect

                        <ArrowUpRight
                            size={16}
                            className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default About;