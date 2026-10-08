import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useState } from "react";

import Jarvis from "../jarvis/Jarvis";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isTyping, setIsTyping] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setIsTyping(true);
        setIsSent(false);
    };

    const handleBlur = () => {
        setIsTyping(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsTyping(false);
        setIsSent(true);

        const subject = encodeURIComponent(
            `Portfolio Contact from ${form.name}`
        );

        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );

        window.location.href =
            `mailto:praj24196@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section
            id="contact"
            className="
                relative
                overflow-hidden
                bg-[#fafafa]
                px-5
                py-24
                md:px-6
                md:py-32
            "
        >
            <div className="mx-auto max-w-[1150px]">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-blue-600" />

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-blue-600
                            "
                        >
                            Contact
                        </span>
                    </div>

                    <h2
                        className="
                            max-w-3xl
                            text-4xl
                            font-semibold
                            leading-tight
                            tracking-tight
                            text-[#111]
                            md:text-6xl
                        "
                    >
                        Let's build something
                        <span className="text-gray-400">
                            {" "}useful.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-xl
                            text-sm
                            leading-7
                            text-gray-500
                            md:text-base
                        "
                    >
                        Have an idea, project, or opportunity?
                        Send me a message. JARVIS is listening.
                    </p>
                </motion.div>

                {/* =====================================================
                    CONTACT WORKSPACE
                ===================================================== */}

                <div
                    className="
                        grid
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        lg:grid-cols-[1fr_0.8fr]
                    "
                >

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        className="p-6 md:p-10"
                    >
                        <div className="mb-8">
                            <p
                                className="
                                    font-mono
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-gray-400
                                "
                            >
                                Send a message
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* NAME */}

                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    "
                                >
                                    Name
                                </label>

                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Your name"
                                    required
                                    className="
                                        w-full
                                        border-b
                                        border-gray-200
                                        bg-transparent
                                        px-0
                                        py-3
                                        text-sm
                                        text-[#111]
                                        outline-none
                                        transition-colors
                                        placeholder:text-gray-300
                                        focus:border-blue-600
                                    "
                                />
                            </div>

                            {/* EMAIL */}

                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    "
                                >
                                    Email
                                </label>

                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="you@example.com"
                                    required
                                    className="
                                        w-full
                                        border-b
                                        border-gray-200
                                        bg-transparent
                                        px-0
                                        py-3
                                        text-sm
                                        text-[#111]
                                        outline-none
                                        transition-colors
                                        placeholder:text-gray-300
                                        focus:border-blue-600
                                    "
                                />
                            </div>

                            {/* MESSAGE */}

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    "
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Tell me about your idea..."
                                    rows={5}
                                    required
                                    className="
                                        w-full
                                        resize-none
                                        border-b
                                        border-gray-200
                                        bg-transparent
                                        px-0
                                        py-3
                                        text-sm
                                        leading-6
                                        text-[#111]
                                        outline-none
                                        transition-colors
                                        placeholder:text-gray-300
                                        focus:border-blue-600
                                    "
                                />
                            </div>

                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-3
                                    rounded-full
                                    bg-[#111]
                                    px-6
                                    py-3
                                    text-sm
                                    font-medium
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:bg-blue-600
                                "
                            >
                                Send Message

                                <ArrowUpRight
                                    size={16}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-0.5
                                        group-hover:-translate-y-0.5
                                    "
                                />
                            </button>
                        </form>
                    </motion.div>

                    {/* =================================================
                        JARVIS PANEL
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="
                            relative
                            flex
                            min-h-[430px]
                            items-center
                            justify-center
                            overflow-hidden
                            border-t
                            border-gray-200
                            bg-[#f7f8fa]
                            sm:min-h-[470px]
                            lg:min-h-[520px]
                            lg:border-l
                            lg:border-t-0
                        "
                    >

                        {/* Background glow */}

                        <motion.div
                            animate={{
                                scale: isTyping
                                    ? 1.25
                                    : 1,

                                opacity: isTyping
                                    ? 0.22
                                    : 0.09,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                h-[300px]
                                w-[300px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-blue-500
                                blur-[100px]
                            "
                        />

                        {/* JARVIS */}

                        <div
                            className="
                                relative
                                z-10
                                w-full
                            "
                        >
                            <Jarvis
                                isTyping={isTyping}
                                wave={isSent}
                            />
                        </div>

                    </motion.div>
                </div>

                {/* =====================================================
                    EMAIL
                ===================================================== */}

                <div
                    className="
                        mt-8
                        flex
                        items-center
                        gap-3
                        text-sm
                        text-gray-400
                    "
                >
                    <Mail size={16} />

                    <a
                        href="mailto:praj24196@gmail.com"
                        className="
                            transition-colors
                            hover:text-blue-600
                        "
                    >
                        praj24196@gmail.com
                    </a>
                </div>

            </div>
        </section>
    );
}

export default Contact;