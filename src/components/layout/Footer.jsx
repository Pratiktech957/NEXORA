import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUpRight, ArrowUp } from "lucide-react";

const footerLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "About", href: "#about" },
];

const socials = [
    { icon: FaGithub, label: "GitHub", href: "https://github.com/pratiktech957" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/pratik-mohanty-tech" },
    { icon: Mail, label: "Email", href: "mailto:praj24196@gmail.com" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function GlassLink({ children, className = "", ...props }) {
    return (
        <motion.a
            variants={item}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className={`
        group relative flex w-fit items-center gap-2 overflow-hidden rounded-lg
        px-2.5 py-1.5 text-sm text-gray-600
        transition-all duration-300
        hover:text-[#111]
        ${className}
      `}
            {...props}
        >
            {/* liquid glass hover layer */}
            <span
                className="
          pointer-events-none absolute inset-0 -z-10 rounded-lg
          bg-white/40 backdrop-blur-md
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
            />
            {/* glossy top edge */}
            <span
                className="
          pointer-events-none absolute inset-x-1 top-0 h-px -z-10 rounded-full
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
            />
            {/* soft blue glow on hover */}
            <span
                className="
          pointer-events-none absolute inset-0 -z-20 rounded-lg
          bg-blue-500/10 blur-md
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
            />
            {children}
        </motion.a>
    );
}

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-32 overflow-hidden">
            {/* liquid glass shell */}
            <div className="relative border-t border-white/40 bg-white/50 backdrop-blur-xl">
                {/* ambient gradient blobs */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
                    animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"
                    animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* glowing top border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative mx-auto max-w-[1100px] px-5 py-14 md:px-6"
                >
                    <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
                        {/* Brand */}
                        <motion.div variants={item}>
                            <motion.a
                                href="/"
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="group inline-flex items-center gap-2.5"
                            >
                                <span className="relative block h-8 w-8">
                                    <span className="absolute left-[3px] top-[3px] h-8 w-8 rounded-lg bg-blue-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                                    <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-800 bg-[#111] text-[11px] font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                        PM
                                    </span>
                                    {/* glow */}
                                    <span className="absolute inset-0 -z-10 rounded-lg bg-blue-500/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                                </span>
                                <span className="text-[17px] font-bold tracking-tight text-[#111] transition-colors duration-300 group-hover:text-blue-600">
                                    Pratik Mohanty
                                </span>
                            </motion.a>

                            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                                Software Engineer focused on full-stack development, AI-powered
                                applications, backend systems, and modern web technologies.
                            </p>
                        </motion.div>

                        {/* Navigate */}
                        <nav>
                            <motion.h3
                                variants={item}
                                className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400"
                            >
                                Navigate
                            </motion.h3>
                            <div className="flex flex-col gap-1.5">
                                {footerLinks.map(({ label, href }) => (
                                    <GlassLink key={label} href={href}>
                                        {label}
                                    </GlassLink>
                                ))}
                                <GlassLink href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                    Resume <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </GlassLink>
                            </div>
                        </nav>

                        {/* Connect */}
                        <div>
                            <motion.h3
                                variants={item}
                                className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400"
                            >
                                Connect
                            </motion.h3>
                            <div className="flex flex-col gap-1.5">
                                {socials.map(({ icon: Icon, label, href }) => (
                                    <GlassLink key={label} href={href} target="_blank" rel="noopener noreferrer">
                                        <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                                        <span>{label}</span>
                                        <ArrowUpRight
                                            size={13}
                                            className="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                        />
                                    </GlassLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <motion.div
                        variants={item}
                        className="mt-12 flex flex-col gap-4 border-t border-white/50 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <p>© {year} Pratik Mohanty. All rights reserved.</p>

                        <div className="flex items-center gap-4">
                            <span>
                                Made by <span className="font-medium text-gray-700">Pratik Mohanty</span>
                            </span>

                            <motion.a
                                href="#home"
                                whileHover={{ y: -4, scale: 1.05 }}
                                whileTap={{ scale: 0.92 }}
                                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                aria-label="Back to top"
                                className="
                  group relative flex h-9 w-9 items-center justify-center
                  overflow-hidden rounded-xl border border-white/60
                  bg-white/40 text-gray-600 backdrop-blur-md
                  shadow-[0_4px_14px_rgba(0,0,0,0.06)]
                  transition-colors duration-300
                  hover:text-[#111]
                "
                            >
                                <span className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/0 via-blue-500/10 to-indigo-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                                <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;