import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
    Trophy,
} from "lucide-react";
import { useState } from "react";

import hackathons from "./hackathons.data";

// Professional profile and certificate links
const LINKEDIN_URL =
    "https://www.linkedin.com/in/pratik-mohanty-tech/?isSelfProfile=true";

const GOOGLE_DRIVE_URL = "https://drive.google.com/drive/folders/1dV-KEMJOTtEIWgd2olZZtakX3ew6SGZA?usp=drive_link";

function Hackathons() {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!hackathons.length) return null;

    const activeHackathon = hackathons[activeIndex];

    const previousHackathon = () => {
        setActiveIndex((current) =>
            current === 0 ? hackathons.length - 1 : current - 1
        );
    };

    const nextHackathon = () => {
        setActiveIndex((current) =>
            current === hackathons.length - 1 ? 0 : current + 1
        );
    };

    return (
        <section
            id="hackathons"
            className="relative overflow-hidden bg-[#111111] px-5 py-24 text-white md:px-6 md:py-32"
        >
            {/* Background grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:50px_50px]"
            />

            {/* Ambient background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[35%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[130px]"
            />

            <div className="relative mx-auto max-w-[1150px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">
                            <Trophy size={13} />
                            Hackathon Archive
                        </div>

                        <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">
                            Built under
                            <br />
                            <span className="text-white/30">
                                pressure.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-6 text-white/40">
                        A record of hackathons, innovation events,
                        collaborations, and competitive problem-solving
                        experiences.
                    </p>
                </motion.div>

                {/* Archive panel */}
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                        <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            Archive /{" "}
                            {String(activeIndex + 1).padStart(2, "0")}
                        </div>

                        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
                            {String(hackathons.length).padStart(2, "0")} entries
                        </span>
                    </div>

                    {/* Selected hackathon */}
                    <div className="relative min-h-[440px] px-6 py-10 sm:px-10 sm:py-14 md:min-h-[440px] md:px-14">
                        {/* Decorative number */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-5 top-5 select-none font-mono text-[100px] font-bold leading-none text-white/[0.025] sm:text-[160px]"
                        >
                            {activeHackathon.number}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeHackathon.id}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 flex min-h-[320px] flex-col"
                            >
                                {/* Event type and year */}
                                <div className="mb-5 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                                    <span>{activeHackathon.type}</span>
                                    <span className="h-px w-7 bg-blue-400/40" />
                                    <span>{activeHackathon.year}</span>
                                </div>

                                {/* Event title */}
                                <h3 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-5xl">
                                    {activeHackathon.title}
                                </h3>

                                {/* Achievement */}
                                {activeHackathon.achievement && (
                                    <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80">
                                        <Trophy
                                            size={13}
                                            className="text-blue-400"
                                        />
                                        {activeHackathon.achievement}
                                    </div>
                                )}

                                {/* Description */}
                                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45">
                                    {activeHackathon.description}
                                </p>

                                {/* Highlights, when provided */}
                                {activeHackathon.highlights?.length > 0 && (
                                    <ul className="mt-5 space-y-2">
                                        {activeHackathon.highlights.map(
                                            (highlight) => (
                                                <li
                                                    key={highlight}
                                                    className="flex items-start gap-2 text-xs leading-5 text-white/45"
                                                >
                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400/70" />
                                                    {highlight}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}

                                {/* Skills and tags */}
                                {activeHackathon.tags?.length > 0 && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {activeHackathon.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] text-white/45"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* LinkedIn and Google Drive links */}
                                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                                    <a
                                        href={LINKEDIN_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-medium text-white/70 transition-colors hover:text-blue-400"
                                    >
                                        LinkedIn & certificates
                                        <ArrowUpRight size={15} />
                                    </a>

                                    <a
                                        href={GOOGLE_DRIVE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-medium text-blue-300 transition-colors hover:text-blue-200"
                                    >
                                        View certificate folder
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Previous / next controls */}
                        <div className="absolute bottom-6 right-6 z-20 flex gap-2 sm:bottom-8 sm:right-8">
                            <button
                                type="button"
                                onClick={previousHackathon}
                                aria-label="Previous hackathon"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition hover:bg-white hover:text-black"
                            >
                                <ArrowLeft size={16} />
                            </button>

                            <button
                                type="button"
                                onClick={nextHackathon}
                                aria-label="Next hackathon"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition hover:bg-white hover:text-black"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Number-based event selector */}
                    <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-4 md:px-7">
                        {hackathons.map((hackathon, index) => {
                            const active = index === activeIndex;

                            return (
                                <button
                                    key={hackathon.id}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    aria-label={`View ${hackathon.title}`}
                                    aria-pressed={active}
                                    className={`flex min-w-[115px] flex-1 flex-col items-start gap-2 rounded-lg border px-3 py-3 text-left transition ${active
                                        ? "border-blue-400/60 bg-blue-400/[0.08]"
                                        : "border-white/10 hover:border-white/25"
                                        }`}
                                >
                                    <span
                                        className={`font-mono text-[10px] ${active
                                            ? "text-blue-400"
                                            : "text-white/30"
                                            }`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="line-clamp-2 text-[10px] leading-4 text-white/65 sm:text-xs">
                                        {hackathon.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Counter and verification links */}
                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between gap-6 text-[9px] uppercase tracking-[0.18em] text-white/25 sm:justify-start">
                        <span>
                            {String(activeIndex + 1).padStart(2, "0")}
                            {" / "}
                            {String(hackathons.length).padStart(2, "0")}
                        </span>

                        <span>Select an entry</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-medium text-white/75 transition hover:border-blue-400/50 hover:text-blue-400"
                        >
                            LinkedIn Profile
                            <ExternalLink size={14} />
                        </a>

                        <a
                            href={GOOGLE_DRIVE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-400/[0.08] px-5 py-3 text-xs font-medium text-blue-300 transition hover:bg-blue-400/15"
                        >
                            View All Certificates
                            <ArrowUpRight size={15} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hackathons;