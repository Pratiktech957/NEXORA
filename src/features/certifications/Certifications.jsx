import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Award,
    BadgeCheck,
    ShieldCheck,
} from "lucide-react";
import certifications from "./certifications.data";

const icons = {
    "fortinet-fundamentals": ShieldCheck,
    "internshala-web-development": BadgeCheck,
    "tcs-ion-ai-python": Award,
};

function Certifications() {
    return (
        <section
            id="certifications"
            className="relative overflow-hidden bg-[#fafafa] px-5 py-24 md:px-6 md:py-32"
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 max-w-2xl"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-blue-600" />

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Certifications
                        </span>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-[#111] md:text-5xl">
                        Knowledge backed by
                        <span className="text-gray-400"> certifications.</span>
                    </h2>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                        Certifications that complement my practical experience across
                        web development, artificial intelligence, Python, and cybersecurity.
                    </p>
                </motion.div>

                {/* Certification list */}
                <div className="divide-y divide-gray-200 border-y border-gray-200">
                    {certifications.map((certificate, index) => {
                        const Icon = icons[certificate.id] || Award;

                        return (
                            <motion.article
                                key={certificate.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                }}
                                whileHover={{ x: 6 }}
                                className="
                  group
                  flex
                  flex-col
                  gap-6
                  py-7
                  transition-colors
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
                            >
                                <div className="flex items-center gap-5">
                                    {/* Icon */}
                                    <div
                                        className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-blue-600
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:border-blue-200
                      group-hover:shadow-md
                    "
                                    >
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-base font-semibold text-[#111] md:text-lg">
                                            {certificate.title}
                                        </h3>

                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                            <span>{certificate.issuer}</span>

                                            <span className="text-gray-300">•</span>

                                            <span>{certificate.category}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side */}
                                <div className="flex items-center justify-between gap-6 md:justify-end">
                                    <div className="text-left md:text-right">
                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            {certificate.credential}
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-600">
                                            {certificate.year}
                                        </p>
                                    </div>

                                    <div
                                        className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-200
                      text-gray-400
                      transition-all
                      duration-300
                      group-hover:border-blue-200
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                                    >
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Certifications;