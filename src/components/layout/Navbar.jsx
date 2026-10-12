import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

// Served from /public/images/resume/resume.pdf (Vite serves /public from the site root).
const RESUME_URL = "/images/resume/resume.pdf";

const navItems = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Hackathons", href: "#hackathons", id: "hackathons" },
    { label: "About", href: "#about", id: "about" },
];

// Staggered entrance variants for desktop links + resume button.
const desktopListVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.06, delayChildren: 0.12 },
    },
};

const desktopItemVariants = {
    hidden: { opacity: 0, y: -8 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
};

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const menuButtonRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    // Detect scrolling; React bails out when the value has not changed.
    useEffect(() => {
        const updateScrollState = () => {
            const nextValue = window.scrollY > 12;
            setIsScrolled((previous) =>
                previous === nextValue ? previous : nextValue
            );
        };

        updateScrollState();

        window.addEventListener("scroll", updateScrollState, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", updateScrollState);
        };
    }, []);

    // Highlight the section currently visible in the viewport.
    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean);

        if (!sections.length) return;

        const inBand = new Set();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        inBand.add(entry.target);
                    } else {
                        inBand.delete(entry.target);
                    }
                });

                if (!inBand.size) {
                    setActiveSection("");
                    return;
                }

                const topmost = [...inBand].sort(
                    (a, b) =>
                        a.getBoundingClientRect().top -
                        b.getBoundingClientRect().top
                )[0];

                setActiveSection(topmost.id);
            },
            {
                root: null,
                rootMargin: "-18% 0px -65% 0px",
                threshold: 0,
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // Close the mobile menu with Escape and return focus to the toggle button.
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    // Reset the menu when the viewport grows to the desktop layout.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleChange = (event) => {
            if (event.matches) setIsMenuOpen(false);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const motionTransition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.2, ease: "easeOut" };

    // Pill spring shared between active indicator + hover pill.
    const pillSpring = shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 420, damping: 32 };

    return (
        <motion.header
            initial={
                shouldReduceMotion ? false : { y: -18, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            transition={
                shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className={`sticky top-0 z-50 w-full transition-[padding] duration-300 motion-reduce:transition-none ${isScrolled
                ? "px-4 pt-2 md:px-6"
                : "px-4 pt-3 md:px-6"
                }`}
        >
            <nav
                aria-label="Main navigation"
                className={`
          relative mx-auto flex min-h-[64px] max-w-[1100px]
          items-center justify-between gap-3
          rounded-2xl border px-4 backdrop-blur-xl
          transition-[box-shadow,background-color,border-color,max-width]
          duration-300 motion-reduce:transition-none md:px-6
          ${isScrolled
                        ? "max-w-[1040px] border-gray-200 bg-[#fafafa]/98 shadow-[0_8px_28px_rgba(17,17,17,0.10)]"
                        : "max-w-[1100px] border-gray-200/80 bg-[#fafafa]/95 shadow-[0_4px_0_rgba(17,17,17,0.04),0_10px_30px_rgba(17,17,17,0.07)]"
                    }
        `}
            >
                {/* PM brand with 3D micro-interaction */}
                <motion.a
                    href="/"
                    aria-label="Pratik Mohanty — Home"
                    onClick={closeMenu}
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    transition={motionTransition}
                    className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
                >
                    <span className="relative block h-8 w-8">
                        {/* Blue backing layer — moves opposite to the badge on hover */}
                        <span
                            aria-hidden="true"
                            className="absolute left-[3px] top-[3px] h-8 w-8 rounded-lg bg-blue-600 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
                        />

                        {/* Black PM badge — tilts slightly and shifts on hover */}
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-800 bg-[#111111] text-[11px] font-bold tracking-[-0.02em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] group-hover:-rotate-2"
                        >
                            PM
                        </span>
                    </span>

                    <span className="whitespace-nowrap text-[15px] font-bold tracking-[-0.04em] text-[#111111] sm:text-[17px]">
                        Pratik Mohanty
                    </span>
                </motion.a>

                {/* Desktop navigation */}
                <motion.div
                    variants={desktopListVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="show"
                    className="hidden items-center gap-0.5 md:flex lg:gap-1"
                >
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;

                        return (
                            <motion.a
                                key={item.id}
                                href={item.href}
                                variants={desktopItemVariants}
                                aria-current={isActive ? "location" : undefined}
                                whileHover={
                                    shouldReduceMotion ? undefined : { y: -1 }
                                }
                                transition={motionTransition}
                                className={`
                  group relative rounded-lg px-2.5 py-2
                  text-[13px] font-medium outline-none
                  transition-colors duration-200 motion-reduce:transition-none
                  focus-visible:ring-2 focus-visible:ring-blue-600
                  lg:px-3 lg:text-sm
                  ${isActive
                                        ? "text-[#111111]"
                                        : "text-gray-600 hover:text-[#111111]"
                                    }
                `}
                            >
                                {item.label}

                                {/* Hover pill — subtle background behind inactive links */}
                                {!isActive && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 -z-10 rounded-lg bg-gray-100/0 transition-colors duration-200 motion-reduce:transition-none group-hover:bg-gray-100"
                                    />
                                )}

                                {/* Sliding active pill indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="navbar-active-indicator"
                                        aria-hidden="true"
                                        className="absolute inset-x-2.5 bottom-1 h-[2px] rounded-full bg-blue-600 lg:inset-x-3"
                                        transition={pillSpring}
                                    />
                                )}

                                {/* Hover underline for inactive links only */}
                                {!isActive && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-2.5 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-blue-600/60 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-x-100 group-focus-visible:scale-x-100 lg:inset-x-3"
                                    />
                                )}
                            </motion.a>
                        );
                    })}

                    {/* Desktop resume action */}
                    <motion.a
                        variants={desktopItemVariants}
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={
                            shouldReduceMotion
                                ? undefined
                                : { y: -2, scale: 1.02 }
                        }
                        whileTap={
                            shouldReduceMotion ? undefined : { scale: 0.97 }
                        }
                        transition={motionTransition}
                        className="group ml-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-[0_2px_0_#1d4ed8] transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none hover:bg-blue-700 hover:shadow-[0_4px_0_#1d4ed8] active:bg-blue-800 active:shadow-[0_1px_0_#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:px-4"
                    >
                        Resume
                        <ArrowUpRight
                            size={15}
                            strokeWidth={2}
                            aria-hidden="true"
                            className="transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                        />
                    </motion.a>
                </motion.div>

                {/* Mobile menu toggle */}
                <motion.button
                    ref={menuButtonRef}
                    type="button"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((previous) => !previous)}
                    whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.94 }
                    }
                    transition={motionTransition}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#111111] shadow-sm outline-none transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:hidden"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isMenuOpen ? (
                            <motion.span
                                key="close"
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { rotate: -90, opacity: 0 }
                                }
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { rotate: 90, opacity: 0 }
                                }
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : { duration: 0.18 }
                                }
                                className="flex items-center justify-center"
                            >
                                <X size={19} strokeWidth={2} aria-hidden="true" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="menu"
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { rotate: 90, opacity: 0 }
                                }
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { rotate: -90, opacity: 0 }
                                }
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : { duration: 0.18 }
                                }
                                className="flex items-center justify-center"
                            >
                                <Menu size={19} strokeWidth={2} aria-hidden="true" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -7, height: 0 }
                        }
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -7, height: 0 }
                        }
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="mx-auto mt-2 max-w-[1100px] overflow-hidden rounded-2xl border border-gray-200/80 bg-[#fafafa] p-2 shadow-[0_10px_30px_rgba(17,17,17,0.10)] md:hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item, index) => {
                                const isActive = activeSection === item.id;

                                return (
                                    <motion.a
                                        key={item.id}
                                        href={item.href}
                                        onClick={closeMenu}
                                        initial={
                                            shouldReduceMotion
                                                ? false
                                                : { opacity: 0, x: -8 }
                                        }
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={
                                            shouldReduceMotion
                                                ? { duration: 0 }
                                                : {
                                                    delay: 0.05 + index * 0.045,
                                                    duration: 0.22,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }
                                        }
                                        aria-current={
                                            isActive ? "location" : undefined
                                        }
                                        className={`
                      flex min-h-11 items-center justify-between
                      rounded-xl px-4 py-3 text-sm font-medium
                      outline-none transition-colors
                      focus-visible:ring-2 focus-visible:ring-blue-600
                      ${isActive
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-[#111111]"
                                            }
                    `}
                                    >
                                        {item.label}
                                        {isActive && (
                                            <span
                                                aria-hidden="true"
                                                className="h-1.5 w-1.5 rounded-full bg-blue-600"
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}

                            <motion.a
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, x: -8 }
                                }
                                animate={{ opacity: 1, x: 0 }}
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : {
                                            delay:
                                                0.05 +
                                                navItems.length * 0.045,
                                            duration: 0.22,
                                            ease: [0.22, 1, 0.36, 1],
                                        }
                                }
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white shadow-[0_2px_0_#1d4ed8] transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                            >
                                View Resume
                                <ArrowUpRight
                                    size={15}
                                    aria-hidden="true"
                                />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;