import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "About", href: "#about" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="sticky top-0 z-50 w-full px-4 pt-3 md:px-6"
        >
            <nav
                className="
          relative mx-auto flex min-h-[64px] max-w-[1100px]
          items-center justify-between
          rounded-2xl
          border border-gray-200/80
          bg-[#fafafa]/90
          px-5
          shadow-[0_4px_0_rgba(17,17,17,0.04),0_10px_30px_rgba(17,17,17,0.08)]
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-[1px]
          hover:shadow-[0_5px_0_rgba(17,17,17,0.05),0_14px_35px_rgba(17,17,17,0.10)]
          md:px-6
        "
            >
                {/* ========================================
            LOGO
        ======================================== */}

                <motion.a
                    href="/"
                    aria-label="Pratik Mohanty home"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-2.5"
                >
                    {/* 3D PM Badge */}
                    <span className="relative block h-8 w-8">
                        {/* Back layer */}
                        <span
                            className="
                absolute
                left-[3px]
                top-[3px]
                h-8
                w-8
                rounded-lg
                bg-blue-600
              "
                        />

                        {/* Main layer */}
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
            "
                    >
                        Pratik Mohanty
                    </span>
                </motion.a>

                {/* ========================================
            DESKTOP NAVIGATION
        ======================================== */}

                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            whileHover={{ y: -1 }}
                            transition={{ duration: 0.2 }}
                            className="
                group
                relative
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-gray-500
                transition-colors
                duration-200
                hover:text-[#111111]
              "
                        >
                            {item.label}

                            {/* Animated underline */}
                            <span
                                className="
                  absolute
                  bottom-1
                  left-3
                  right-3
                  h-[1.5px]
                  origin-left
                  scale-x-0
                  rounded-full
                  bg-blue-600
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-x-100
                "
                            />
                        </motion.a>
                    ))}

                    {/* Resume */}
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            y: -2,
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="
              ml-2
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              shadow-[0_2px_0_#1d4ed8]
              transition-colors
              duration-200
              hover:bg-blue-700
            "
                    >
                        Resume
                    </motion.a>
                </div>

                {/* ========================================
            MOBILE MENU BUTTON
        ======================================== */}

                <motion.button
                    type="button"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    whileTap={{ scale: 0.92 }}
                    className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-[#111111]
            shadow-sm
            md:hidden
          "
                >
                    {isMenuOpen ? (
                        <X size={19} strokeWidth={2} />
                    ) : (
                        <Menu size={19} strokeWidth={2} />
                    )}
                </motion.button>
            </nav>

            {/* ========================================
          MOBILE MENU
      ======================================== */}

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: -8,
                            scale: 0.98,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                        className="
              mx-auto
              mt-2
              max-w-[1100px]
              overflow-hidden
              rounded-2xl
              border
              border-gray-200/80
              bg-[#fafafa]/95
              p-2
              shadow-[0_10px_30px_rgba(17,17,17,0.10)]
              backdrop-blur-xl
              md:hidden
            "
                    >
                        <div className="flex flex-col">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMenu}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.04,
                                        duration: 0.2,
                                    }}
                                    className="
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-gray-600
                    transition-colors
                    hover:bg-gray-100
                    hover:text-[#111111]
                  "
                                >
                                    {item.label}
                                </motion.a>
                            ))}

                            {/* Mobile Resume */}
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="
                  mt-1
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_2px_0_#1d4ed8]
                  transition-colors
                  hover:bg-blue-700
                "
                            >
                                View Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;