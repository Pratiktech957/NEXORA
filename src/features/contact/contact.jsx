
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { ArrowUpRight, Mail } from "lucide-react";

import Fox3D from "./Fox3D";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [currentAnimation, setCurrentAnimation] =
        useState("idle");

    const [isSent, setIsSent] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setIsSent(false);
    };

    const handleFocus = () => {
        setCurrentAnimation("walk");
    };

    const handleBlur = () => {
        setCurrentAnimation("idle");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setCurrentAnimation("hit");
        setIsSent(true);

        const subject = encodeURIComponent(
            `Portfolio Contact from ${form.name}`
        );

        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );

        window.location.href =
            `mailto:praj24196@gmail.com?subject=${subject}&body=${body}`;

        // Reset the visual interaction after submission.
        window.setTimeout(() => {
            setCurrentAnimation("idle");
        }, 1500);
    };

    const isTyping = currentAnimation === "walk";

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[#fafafa] px-5 py-24 md:px-6 md:py-32"
        >
            <div className="mx-auto max-w-[1150px]">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-blue-600" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Contact
                        </span>
                    </div>

                    <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#111] md:text-6xl">
                        Let's build something
                        <span className="text-gray-400">
                            {" "}useful.
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                        Have an idea, project, or opportunity?
                        Send me a message and watch the fox come alive.
                    </p>
                </motion.div>

                {/* CONTACT WORKSPACE */}
                <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white lg:grid-cols-[1fr_0.8fr]">
                    {/* CONTACT FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="p-6 md:p-10"
                    >
                        <p className="mb-8 font-mono text-xs uppercase tracking-wider text-gray-400">
                            Send a message
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* NAME */}
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Name
                                </label>

                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    placeholder="Your name"
                                    autoComplete="name"
                                    required
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-[#111] outline-none transition-colors placeholder:text-gray-300 focus:border-blue-600"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Email
                                </label>

                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-[#111] outline-none transition-colors placeholder:text-gray-300 focus:border-blue-600"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    placeholder="Tell me about your idea..."
                                    rows={5}
                                    required
                                    className="w-full resize-none border-b border-gray-200 bg-transparent px-0 py-3 text-sm leading-6 text-[#111] outline-none transition-colors placeholder:text-gray-300 focus:border-blue-600"
                                />
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="group inline-flex items-center gap-3 rounded-full bg-[#111] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-600"
                            >
                                Send Message

                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </button>
                        </form>
                    </motion.div>

                    {/* FOX 3D PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                        className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden border-t border-gray-200 bg-[#f7f8fa] sm:min-h-[470px] lg:min-h-[520px] lg:border-l lg:border-t-0"
                    >
                        {/* BACKGROUND GLOW */}
                        <motion.div
                            animate={{
                                scale: isTyping ? 1.2 : 1,
                                opacity: isTyping ? 0.2 : 0.08,
                            }}
                            transition={{ duration: 0.5 }}
                            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-[100px]"
                        />

                        {/* FOX CANVAS */}
                        <div className="relative z-10 h-[400px] w-full sm:h-[440px]">
                            <Canvas
                                camera={{
                                    position: [0, 0.8, 6],
                                    fov: 38,
                                    near: 0.1,
                                    far: 100,
                                }}
                                dpr={[1, 1.5]}
                                gl={{
                                    antialias: true,
                                    alpha: true,
                                }}
                            >
                                <ambientLight intensity={1.8} />

                                <directionalLight
                                    position={[4, 6, 5]}
                                    intensity={2.5}
                                />

                                <pointLight
                                    position={[2, 3, 4]}
                                    intensity={1.2}
                                />

                                <Suspense
                                    fallback={
                                        <Html center>
                                            <p className="whitespace-nowrap text-xs text-gray-500">
                                                Loading fox...
                                            </p>
                                        </Html>
                                    }
                                >
                                    <Fox3D
                                        isTyping={isTyping}
                                        isSent={isSent}
                                        scale={0.55}
                                        position={[0, -0.5, 0]}
                                        rotation={[0, -0.15, 0]}
                                    />
                                </Suspense>
                            </Canvas>
                        </div>

                        {/* STATUS */}
                        <div className="relative z-10 mb-8 flex items-center gap-2">
                            <span
                                className={`h-2 w-2 rounded-full ${isTyping
                                        ? "animate-pulse bg-blue-500"
                                        : isSent
                                            ? "bg-blue-500"
                                            : "bg-emerald-500"
                                    }`}
                            />

                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                                {isTyping
                                    ? "Fox is active"
                                    : isSent
                                        ? "Message prepared"
                                        : "Fox is online"}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* EMAIL */}
                <div className="mt-8 flex items-center gap-3 text-sm text-gray-400">
                    <Mail size={16} />

                    <a
                        href="mailto:praj24196@gmail.com"
                        className="transition-colors hover:text-blue-600"
                    >
                        praj24196@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact;
