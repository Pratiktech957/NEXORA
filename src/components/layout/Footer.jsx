import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
    Mail,
    ArrowUpRight,
    ArrowUp,
} from "lucide-react";

const footerLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "About", href: "#about" },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-32 border-t border-gray-200 bg-[#fafafa]">
            <div className="mx-auto max-w-[1100px] px-5 py-12 md:px-6">

                {/* Main Footer */}
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

                    {/* Brand */}
                    <div>
                        <motion.a
                            href="/"
                            whileHover={{ y: -1 }}
                            transition={{ duration: 0.2 }}
                            className="group inline-flex items-center gap-2.5"
                        >
                            {/* PM 3D Logo */}
                            <span className="relative block h-8 w-8">

                                {/* Back Layer */}
                                <span
                                    className="
                    absolute
                    left-[3px]
                    top-[3px]
                    h-8
                    w-8
                    rounded-lg
                    bg-blue-600
                    transition-transform
                    duration-200
                    group-hover:translate-x-[1px]
                    group-hover:translate-y-[1px]
                  "
                                />

                                {/* Front Layer */}
                                <span
                                    className="
                    absolute
                    left-0
                    top-0
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-800
                    bg-[#111111]
                    text-[11px]
                    font-bold
                    tracking-[-0.02em]
                    text-white
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                    transition-transform
                    duration-200
                    group-hover:-translate-x-[1px]
                    group-hover:-translate-y-[1px]
                  "
                                >
                                    PM
                                </span>

                            </span>

                            {/* Name */}
                            <span
                                className="
                  text-[17px]
                  font-bold
                  tracking-[-0.04em]
                  text-[#111111]
                  transition-colors
                  duration-200
                  group-hover:text-blue-600
                "
                            >
                                Pratik Mohanty
                            </span>
                        </motion.a>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                            Software Engineer focused on full-stack development,
                            AI-powered applications, backend systems, and modern
                            web technologies.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3
                            className="
                mb-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
                        >
                            Navigate
                        </h3>

                        <div className="flex flex-col gap-3">

                            {footerLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                    className="
                    w-fit
                    text-sm
                    text-gray-500
                    transition-colors
                    duration-200
                    hover:text-[#111111]
                  "
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            {/* Resume */}
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="
                  flex
                  w-fit
                  items-center
                  gap-1
                  text-sm
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-[#111111]
                "
                            >
                                Resume
                                <ArrowUpRight size={14} />
                            </motion.a>

                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3
                            className="
                mb-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
                        >
                            Connect
                        </h3>

                        <div className="flex flex-col gap-3">

                            {/* GitHub */}
                            <motion.a
                                href="https://github.com/pratiktech957"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-[#111111]
                "
                            >
                                <FaGithub size={16} />

                                <span>GitHub</span>

                                <ArrowUpRight size={13} />
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href="https://www.linkedin.com/in/pratik-mohanty-tech"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-[#111111]
                "
                            >
                                <FaLinkedin size={16} />

                                <span>LinkedIn</span>

                                <ArrowUpRight size={13} />
                            </motion.a>

                            {/* Email */}
                            <motion.a
                                href="mailto:praj24196@gmail.com"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  text-sm
                  text-gray-500
                  transition-colors
                  duration-200
                  hover:text-[#111111]
                "
                            >
                                <Mail size={16} />

                                <span>Email</span>

                                <ArrowUpRight size={13} />
                            </motion.a>

                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-gray-200" />

                {/* Bottom Footer */}
                <div
                    className="
            flex
            flex-col
            gap-4
            text-xs
            text-gray-400
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >

                    {/* Copyright */}
                    <p>
                        © {currentYear} Pratik Mohanty. All rights reserved.
                    </p>

                    {/* Made By + Back To Top */}
                    <div className="flex items-center gap-4">

                        <span>
                            Made by{" "}
                            <span className="font-medium text-gray-600">
                                Pratik Mohanty
                            </span>
                        </span>

                        {/* Back To Top */}
                        <motion.a
                            href="#home"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            aria-label="Back to top"
                            className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-gray-200
                bg-white
                text-gray-500
                shadow-sm
                transition-colors
                duration-200
                hover:border-gray-300
                hover:text-[#111111]
              "
                        >
                            <ArrowUp size={15} />
                        </motion.a>

                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;