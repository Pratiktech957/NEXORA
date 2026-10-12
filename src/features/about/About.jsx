import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    Database,
    Server,
    ShieldCheck,
    Terminal,
    Sparkles,
    MapPin,
} from "lucide-react";

/* ---------------- Data ---------------- */

const focusAreas = [
    {
        index: "01",
        icon: Code2,
        title: "Full-Stack Development",
        description:
            "Building responsive interfaces and complete web applications using React, Node.js, Express, and modern web technologies.",
        tags: ["React", "Node.js", "Express", "Tailwind"],
    },
    {
        index: "02",
        icon: Server,
        title: "Backend Engineering",
        description:
            "Designing REST APIs, authentication systems, real-time services, and backend architectures that are reliable and maintainable.",
        tags: ["REST", "Auth", "WebSockets", "Caching"],
    },
    {
        index: "03",
        icon: Database,
        title: "Data & AI",
        description:
            "Working with databases, RAG systems, LLM integrations, and AI-powered applications to solve practical problems.",
        tags: ["MongoDB", "Postgres", "RAG", "LLMs"],
    },
    {
        index: "04",
        icon: ShieldCheck,
        title: "Security & DevOps",
        description:
            "Exploring secure API design, authentication, authorization, Docker, caching, monitoring, and production-oriented workflows.",
        tags: ["Docker", "JWT", "Monitoring", "CI/CD"],
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

const stats = [
    { value: "CS", label: "Computer Science", sub: "Student · Building" },
    { value: "6+", label: "Core Stacks", sub: "Frontend → Backend" },
    { value: "AI", label: "Applied Focus", sub: "RAG · LLMs" },
    { value: "∞", label: "Iterations", sub: "Ship. Learn. Repeat." },
];

/* ---------------- Motion presets ---------------- */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
    }),
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const lineGrow = {
    hidden: { scaleX: 0 },
    show: {
        scaleX: 1,
        transition: { duration: 0.9, ease: EASE },
    },
};

/* ---------------- Component ---------------- */

function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-white px-5 py-24 md:px-6 md:py-32"
        >
            {/* Fine editorial grid */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.03]
                    [background-image:linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)]
                    [background-size:56px_56px]
                    [mask-image:radial-gradient(ellipse_at_50%_40%,#000_20%,transparent_85%)]
                "
            />

            <div className="relative mx-auto max-w-[1180px]">
                {/* =========================================
                    SECTION 01 — HEADER
                ========================================= */}
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="max-w-4xl"
                    >
                        <motion.div
                            variants={fadeUp}
                            custom={0}
                            className="mb-6 flex items-center gap-3"
                        >
                            <motion.span
                                variants={lineGrow}
                                style={{ originX: 0 }}
                                className="h-px w-10 bg-blue-600"
                            />
                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                                About Me
                            </span>
                        </motion.div>

                        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[#111] md:text-6xl lg:text-7xl">
                            <motion.span
                                variants={fadeUp}
                                custom={1}
                                className="block"
                            >
                                I build systems,
                            </motion.span>
                            <motion.span
                                variants={fadeUp}
                                custom={2}
                                className="block text-gray-400"
                            >
                                not just interfaces.
                            </motion.span>
                        </h2>

                        <motion.p
                            variants={fadeUp}
                            custom={3}
                            className="mt-8 max-w-xl text-base leading-7 text-gray-500 md:text-lg"
                        >
                            Production-oriented engineering, focused on what happens
                            behind the interface.
                        </motion.p>
                    </motion.div>

                    {/* Right meta rail */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-gray-400 lg:items-end"
                    >
                        <motion.div
                            variants={fadeInRight}
                            className="flex items-center gap-2"
                        >
                            <MapPin size={13} className="text-gray-400" />
                            <span>India · Remote-friendly</span>
                        </motion.div>
                        <motion.div
                            variants={fadeInRight}
                            className="flex items-center gap-2"
                        >
                            <Terminal size={13} className="text-blue-600" />
                            <span>Available for collaboration</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* =========================================
                    SECTION 02 — INTRO
                ========================================= */}
                <div className="mt-20 grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
                    {/* Left — sticky rail */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="lg:sticky lg:top-32 lg:self-start"
                    >
                        <motion.div
                            variants={fadeInLeft}
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

                        {/* Divider */}
                        <motion.div
                            variants={lineGrow}
                            style={{ originX: 0 }}
                            className="mt-8 h-px w-full max-w-[220px] bg-gray-200"
                        />

                        <motion.p
                            variants={fadeInLeft}
                            className="mt-8 max-w-[260px] text-sm leading-6 text-gray-500"
                        >
                            A CS student building toward production-grade software —
                            one system at a time.
                        </motion.p>
                    </motion.div>

                    {/* Right — main editorial text */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.p
                            variants={fadeInRight}
                            className="text-xl font-medium leading-9 text-[#222] md:text-2xl md:leading-10"
                        >
                            I'm a Computer Science student focused on becoming a
                            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                {" "}
                                production-oriented Software Engineer
                            </span>
                            , with a strong interest in full-stack development,
                            backend engineering, AI-powered systems, and scalable
                            software.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            className="mt-9 grid gap-6 md:grid-cols-2"
                        >
                            <p className="text-sm leading-7 text-gray-500 md:text-base">
                                My journey started with frontend development and
                                gradually expanded into backend engineering,
                                databases, APIs, authentication, real-time
                                communication, and AI integration.
                            </p>

                            <p className="text-sm leading-7 text-gray-500 md:text-base">
                                I enjoy understanding what happens behind the
                                interface — designing APIs, structuring data,
                                securing applications, debugging systems, and
                                learning how software behaves when it moves closer
                                to production.
                            </p>
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="mt-6 text-sm leading-7 text-gray-500 md:text-base"
                        >
                            Alongside development, I'm strengthening my fundamentals
                            in data structures and algorithms, operating systems,
                            computer networks, databases, system design, and
                            software engineering.
                        </motion.p>

                        {/* Inline stat strip */}
                        <motion.div
                            variants={fadeUp}
                            custom={3}
                            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-4"
                        >
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white px-4 py-5 transition-colors duration-300 hover:bg-[#fafafa]"
                                >
                                    <p className="font-mono text-2xl font-semibold tracking-tight text-[#111]">
                                        {s.value}
                                    </p>
                                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                        {s.label}
                                    </p>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                                        {s.sub}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* =========================================
                    SECTION 03 — FOCUS AREAS
                ========================================= */}
                <div className="mt-28">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-10 flex items-end justify-between gap-6 border-b border-gray-200 pb-6"
                    >
                        <div>
                            <motion.p
                                variants={fadeUp}
                                className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400"
                            >
                                What I Work With
                            </motion.p>

                            <motion.h3
                                variants={fadeUp}
                                custom={1}
                                className="mt-3 text-2xl font-semibold tracking-tight text-[#111] md:text-3xl"
                            >
                                Areas of focus
                            </motion.h3>
                        </div>

                        <motion.span
                            variants={fadeUp}
                            custom={2}
                            className="hidden font-mono text-xs uppercase tracking-widest text-gray-400 sm:block"
                        >
                            04 / Areas
                        </motion.span>
                    </motion.div>

                    <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-2">
                        {focusAreas.map((area, index) => {
                            const Icon = area.icon;

                            return (
                                <motion.article
                                    key={area.title}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={scaleIn}
                                    transition={{ delay: index * 0.08 }}
                                    className="
                                        group
                                        relative
                                        bg-white
                                        p-7
                                        transition-colors
                                        duration-300
                                        hover:bg-[#fafafa]
                                        md:p-10
                                    "
                                >
                                    {/* Index number */}
                                    <span
                                        className="
                                            absolute
                                            right-7
                                            top-7
                                            font-mono
                                            text-xs
                                            tracking-widest
                                            text-gray-300
                                            transition-colors
                                            duration-300
                                            group-hover:text-blue-600
                                            md:right-10
                                            md:top-10
                                        "
                                    >
                                        {area.index}
                                    </span>

                                    <div className="flex items-start justify-between">
                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                border-gray-200
                                                text-blue-600
                                                transition-all
                                                duration-300
                                                group-hover:border-blue-300
                                                group-hover:bg-blue-50
                                                group-hover:scale-105
                                            "
                                        >
                                            <Icon size={20} strokeWidth={1.7} />
                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="
                                                mt-6
                                                mr-8
                                                text-gray-300
                                                transition-all
                                                duration-300
                                                group-hover:-translate-y-1
                                                group-hover:translate-x-1
                                                group-hover:text-blue-600
                                                md:mr-10
                                            "
                                        />
                                    </div>

                                    <h4 className="mt-8 text-lg font-semibold tracking-tight text-[#111] md:text-xl">
                                        {area.title}
                                    </h4>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {area.description}
                                    </p>

                                    {/* Tag row */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {area.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="
                                                    inline-flex
                                                    items-center
                                                    rounded-full
                                                    border
                                                    border-gray-200
                                                    px-3
                                                    py-1
                                                    font-mono
                                                    text-[10px]
                                                    uppercase
                                                    tracking-wider
                                                    text-gray-500
                                                    transition-colors
                                                    duration-300
                                                    group-hover:border-gray-300
                                                    group-hover:text-gray-700
                                                "
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom accent line */}
                                    <span
                                        className="
                                            pointer-events-none
                                            absolute
                                            bottom-0
                                            left-0
                                            h-[2px]
                                            w-0
                                            bg-blue-600
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />
                                </motion.article>
                            );
                        })}
                    </div>
                </div>

                {/* =========================================
                    SECTION 04 — PHILOSOPHY
                ========================================= */}
                <div className="mt-28">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-10"
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400"
                        >
                            Engineering Philosophy
                        </motion.p>

                        <motion.h3
                            variants={fadeUp}
                            custom={1}
                            className="mt-3 text-2xl font-semibold tracking-tight text-[#111] md:text-3xl"
                        >
                            How I approach building software
                        </motion.h3>
                    </motion.div>

                    <div className="grid border-t border-gray-200 md:grid-cols-3">
                        {philosophy.map((item, index) => (
                            <motion.article
                                key={item.number}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.25 }}
                                variants={fadeUp}
                                custom={index}
                                className="
                                    group
                                    relative
                                    border-b
                                    border-gray-200
                                    py-10
                                    md:border-b-0
                                    md:border-r
                                    md:px-10
                                    md:first:pl-0
                                    md:last:border-r-0
                                    md:last:pr-0
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs tracking-widest text-gray-400 transition-colors duration-300 group-hover:text-blue-600">
                                        {item.number}
                                    </span>
                                    <span className="h-px w-6 bg-gray-200 transition-all duration-500 group-hover:w-10 group-hover:bg-blue-600" />
                                </div>

                                <h4 className="mt-6 text-2xl font-semibold tracking-tight text-[#111] md:text-3xl">
                                    {item.title}
                                </h4>

                                <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
                                    {item.description}
                                </p>

                                {/* Index watermark */}
                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-0
                                        top-8
                                        font-serif
                                        text-6xl
                                        font-normal
                                        leading-none
                                        text-gray-100
                                        transition-colors
                                        duration-500
                                        group-hover:text-blue-100
                                        md:right-10
                                    "
                                >
                                    {item.number}
                                </span>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* =========================================
                    SECTION 05 — BOTTOM STATEMENT / CTA
                ========================================= */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="
                        mt-24
                        grid
                        gap-6
                        border-t
                        border-gray-200
                        pt-10
                        md:grid-cols-[1fr_auto]
                        md:items-center
                    "
                >
                    <motion.div variants={fadeUp} className="max-w-2xl">
                        <div className="flex items-center gap-2 text-blue-600">
                            <Sparkles size={14} />
                            <span className="font-mono text-[11px] uppercase tracking-widest">
                                Ongoing
                            </span>
                        </div>
                        <p className="mt-3 text-base leading-7 text-gray-500 md:text-lg">
                            Always learning, building, debugging, and improving —
                            with the goal of becoming a stronger engineer one
                            system at a time.
                        </p>
                    </motion.div>

                    <motion.a
                        variants={fadeUp}
                        custom={1}
                        href="#contact"
                        className="
                            group
                            inline-flex
                            shrink-0
                            items-center
                            gap-3
                            self-start
                            rounded-full
                            bg-[#111]
                            px-6
                            py-3.5
                            text-sm
                            font-medium
                            text-white
                            transition-all
                            duration-300
                            hover:bg-blue-600
                            md:self-auto
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
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

export default About;