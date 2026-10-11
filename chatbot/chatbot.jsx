import { useEffect, useRef, useState } from "react";
import {
    Bot,
    X,
    Send,
    Sparkles,
    RotateCcw,
    User,
} from "lucide-react";

const INITIAL_MESSAGE = {
    role: "assistant",
    content:
        "Hello! I'm JARVIS, your AI assistant. Ask me about Pratik's projects, skills, experience, or software engineering.",
};

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, loading, open]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    async function sendMessage() {
        const text = input.trim();

        if (!text || loading) return;

        // Send previous messages as history.
        const history = messages
            .filter(
                (item) =>
                    ["user", "assistant"].includes(item.role) &&
                    typeof item.content === "string"
            )
            .map(({ role, content }) => ({ role, content }))
            .slice(-10);

        setMessages((previous) => [
            ...previous,
            { role: "user", content: text },
        ]);

        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    history,
                }),
            });

            const contentType =
                response.headers.get("content-type") || "";

            if (!contentType.includes("application/json")) {
                const raw = await response.text();

                throw new Error(
                    `API returned HTTP ${response.status}: ${raw || "Empty response"
                    }`
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error || `Request failed (${response.status})`
                );
            }

            if (!data.message || typeof data.message !== "string") {
                throw new Error("The API returned an invalid response.");
            }

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: data.message,
                },
            ]);
        } catch (error) {
            console.error("JARVIS API error:", error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content:
                        error.message ||
                        "Unable to connect to JARVIS. Please try again.",
                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    function clearChat() {
        if (loading) return;
        setMessages([INITIAL_MESSAGE]);
    }

    return (
        <>
            {/* Floating chatbot launcher */}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Open JARVIS chatbot"
                    className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.2)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_0_45px_rgba(34,211,238,0.3)] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
                >
                    <span className="absolute h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
                    <Bot size={27} className="relative z-10" />
                    <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </button>
            )}

            {/* Chat window */}
            <section
                role="dialog"
                aria-label="JARVIS AI chatbot"
                aria-hidden={!open}
                className={`fixed bottom-0 right-0 z-[9999] flex h-[min(580px,100dvh)] w-full flex-col overflow-hidden border border-white/10 bg-[#071019] text-white shadow-2xl transition-all duration-300 sm:bottom-7 sm:right-7 sm:h-[580px] sm:w-[390px] sm:rounded-2xl ${open
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-4 scale-95 opacity-0"
                    }`}
            >
                {/* Header */}
                <header className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300">
                            <Bot size={23} />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold tracking-[0.2em]">
                                    JARVIS
                                </h2>
                                <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                                    AI
                                </span>
                            </div>

                            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Portfolio assistant
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={clearChat}
                            disabled={loading}
                            aria-label="Clear conversation"
                            title="Clear conversation"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
                        >
                            <RotateCcw size={16} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close JARVIS"
                            title="Close chatbot"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <X size={19} />
                        </button>
                    </div>
                </header>

                {/* Conversation */}
                <main className="flex-1 overflow-y-auto px-3 py-5 sm:px-4">
                    <div className="mb-6 text-center">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-300">
                            <Sparkles size={20} />
                        </div>

                        <p className="text-[9px] font-bold tracking-[0.22em] text-cyan-300/70">
                            JARVIS ASSISTANT
                        </p>

                        <p className="mx-auto mt-2 max-w-[260px] text-xs leading-relaxed text-slate-500">
                            Ask questions and explore Pratik's portfolio.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {messages.map((message, index) => {
                            const isUser = message.role === "user";

                            return (
                                <div
                                    key={`${message.role}-${index}`}
                                    className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {!isUser && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
                                            <Bot size={15} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[82%] whitespace-pre-wrap break-words rounded-xl px-3 py-2.5 text-xs leading-relaxed ${isUser
                                                ? "rounded-br-sm border border-cyan-400/10 bg-cyan-500/15 text-cyan-50"
                                                : "rounded-bl-sm border border-white/[0.07] bg-white/[0.04] text-slate-300"
                                            } ${message.error
                                                ? "border-red-400/30 text-red-300"
                                                : ""
                                            }`}
                                    >
                                        {message.content}
                                    </div>

                                    {isUser && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300">
                                            <User size={14} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="flex items-end gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
                                    <Bot size={15} />
                                </div>

                                <div
                                    role="status"
                                    aria-label="JARVIS is responding"
                                    className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-white/[0.07] bg-white/[0.04] px-4 py-3"
                                >
                                    {[0, 1, 2].map((dot) => (
                                        <span
                                            key={dot}
                                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300"
                                            style={{
                                                animationDelay: `${dot * 120}ms`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/* Input */}
                <footer className="border-t border-white/[0.08] bg-black/20 p-3">
                    <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 pl-3 transition focus-within:border-cyan-400/40">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            rows={1}
                            maxLength={4000}
                            aria-label="Message JARVIS"
                            placeholder="Ask JARVIS anything..."
                            className="max-h-24 min-h-9 flex-1 resize-none bg-transparent py-2 text-xs leading-relaxed text-slate-200 outline-none placeholder:text-slate-500 disabled:opacity-50"
                        />

                        <button
                            type="button"
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            aria-label="Send message"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between px-1 pt-2 text-[9px] tracking-wide text-slate-600">
                        <span>JARVIS AI</span>
                        <span>Enter to send · Shift+Enter for newline</span>
                    </div>
                </footer>
            </section>
        </>
    );
}
