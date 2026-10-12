
import { useEffect, useRef, useState } from "react";
import {
    Bot,
    X,
    Send,
    Sparkles,
    RotateCcw,
    User,
} from "lucide-react";

import { sendChatMessage } from "./api/chat";

const INITIAL_MESSAGE = {
    role: "assistant",
    content:
        "Hello! I'm JARVIS, Pratik's portfolio assistant. Ask me about his projects, skills, experience, or software engineering.",
};

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const requestIdRef = useRef(0);
    const messagesRef = useRef([INITIAL_MESSAGE]);
    const loadingRef = useRef(false);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages, loading, open]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        return () => {
            requestIdRef.current += 1;
        };
    }, []);

    async function sendMessage() {
        const text = input.trim();

        if (!text || loadingRef.current) return;

        const requestId = ++requestIdRef.current;

        // Build history from earlier messages, excluding the greeting.
        const history = messagesRef.current
            .slice(1)
            .filter(
                (item) =>
                    ["user", "assistant"].includes(item.role) &&
                    typeof item.content === "string" &&
                    !item.error
            )
            .slice(-10)
            .map(({ role, content }) => ({ role, content }));

        const userMessage = {
            role: "user",
            content: text,
        };

        const updatedMessages = [
            ...messagesRef.current,
            userMessage,
        ];

        messagesRef.current = updatedMessages;
        setMessages(updatedMessages);
        setInput("");
        loadingRef.current = true;
        setLoading(true);

        try {
            const reply = await sendChatMessage(text, history);

            if (requestId !== requestIdRef.current) return;

            const nextMessages = [
                ...messagesRef.current,
                {
                    role: "assistant",
                    content: reply,
                },
            ];

            messagesRef.current = nextMessages;
            setMessages(nextMessages);
        } catch (error) {
            if (requestId !== requestIdRef.current) return;

            console.error("JARVIS API error:", error);

            const nextMessages = [
                ...messagesRef.current,
                {
                    role: "assistant",
                    content:
                        error.message ||
                        "Unable to connect to JARVIS. Please try again.",
                    error: true,
                },
            ];

            messagesRef.current = nextMessages;
            setMessages(nextMessages);
        } finally {
            if (requestId === requestIdRef.current) {
                loadingRef.current = false;
                setLoading(false);
                inputRef.current?.focus();
            }
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    function clearChat() {
        if (loadingRef.current) return;

        requestIdRef.current += 1;

        messagesRef.current = [INITIAL_MESSAGE];
        setMessages([INITIAL_MESSAGE]);
        setInput("");
    }

    function closeChat() {
        setOpen(false);
    }

    return (
        <>
            {/* Floating launcher */}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Open JARVIS chatbot"
                    className="
            group fixed bottom-5 right-5 z-[9999]
            flex h-14 w-14 items-center justify-center
            rounded-full border border-[#050507]
            bg-[#050507] text-white
            shadow-[0_20px_40px_-18px_rgba(5,5,7,0.5)]
            transition-all duration-300
            hover:-translate-y-1 hover:border-[#1e5cff]
            hover:bg-[#1e5cff]
            hover:shadow-[0_24px_50px_-18px_rgba(30,92,255,0.55)]
            sm:bottom-7 sm:right-7 sm:h-16 sm:w-16
          "
                >
                    <Bot size={24} />

                    <span
                        aria-hidden="true"
                        className="
              absolute right-1 top-1 h-2.5 w-2.5
              rounded-full bg-[#16c79a] ring-2 ring-white
            "
                    />
                </button>
            )}

            {/* Chat window */}
            <section
                role="dialog"
                aria-label="JARVIS AI chatbot"
                aria-modal="false"
                aria-hidden={!open}
                className={`
          fixed bottom-0 right-0 z-[9999]
          flex h-[min(600px,100dvh)] w-full flex-col
          overflow-hidden border border-[#050507]/10
          bg-white text-[#050507]
          shadow-[0_40px_80px_-40px_rgba(5,5,7,0.35)]
          transition-all duration-300
          sm:bottom-7 sm:right-7 sm:h-[600px]
          sm:w-[400px] sm:rounded-2xl
          ${open
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-4 scale-95 opacity-0"
                    }
        `}
            >
                {/* Header */}
                <header
                    className="
            flex items-center justify-between border-b
            border-[#050507]/[0.07] bg-white px-4 py-3.5
          "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                flex h-11 w-11 items-center justify-center
                rounded-xl border border-[#050507]
                bg-[#050507] text-white
              "
                        >
                            <Bot size={22} />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h2
                                    className="
                    font-mono text-[11px] font-semibold
                    uppercase tracking-[0.24em] text-[#050507]
                  "
                                >
                                    JARVIS
                                </h2>

                                <span
                                    className="
                    rounded border border-[#1e5cff]/25
                    bg-[#1e5cff]/[0.06] px-1.5 py-0.5
                    font-mono text-[9px] font-semibold
                    uppercase tracking-widest text-[#1e5cff]
                  "
                                >
                                    AI
                                </span>
                            </div>

                            <div
                                className="
                  mt-1 flex items-center gap-1.5
                  text-[10px] text-[#7b8089]
                "
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span
                                        className="
                      absolute inset-0 animate-ping
                      rounded-full bg-[#16c79a] opacity-60
                    "
                                    />
                                    <span className="relative h-1.5 w-1.5 rounded-full bg-[#16c79a]" />
                                </span>

                                <span className="font-mono uppercase tracking-widest">
                                    Portfolio assistant
                                </span>
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
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-lg text-[#7b8089] transition
                hover:bg-[#050507]/[0.05] hover:text-[#050507]
                disabled:opacity-40
              "
                        >
                            <RotateCcw size={15} />
                        </button>

                        <button
                            type="button"
                            onClick={closeChat}
                            aria-label="Close JARVIS"
                            title="Close chatbot"
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-lg text-[#7b8089] transition
                hover:bg-[#050507]/[0.05] hover:text-[#050507]
              "
                        >
                            <X size={18} />
                        </button>
                    </div>
                </header>

                {/* Conversation */}
                <main
                    className="flex-1 overflow-y-auto px-3 py-5 sm:px-4"
                    aria-live="polite"
                >
                    <div className="mb-6 text-center">
                        <div
                            className="
                mx-auto mb-3 flex h-11 w-11 items-center
                justify-center rounded-xl border
                border-[#1e5cff]/20 bg-[#1e5cff]/[0.06]
                text-[#1e5cff]
              "
                        >
                            <Sparkles size={18} />
                        </div>

                        <p
                            className="
                font-mono text-[9px] font-bold uppercase
                tracking-[0.28em] text-[#1e5cff]
              "
                        >
                            JARVIS Assistant
                        </p>

                        <p
                            className="
                mx-auto mt-2 max-w-[260px]
                text-[11.5px] leading-relaxed text-[#7b8089]
              "
                        >
                            Ask about Pratik&apos;s projects, skills, and
                            engineering work.
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
                                        <div
                                            className="
                        flex h-7 w-7 shrink-0 items-center
                        justify-center rounded-lg border
                        border-[#050507] bg-[#050507] text-white
                      "
                                        >
                                            <Bot size={14} />
                                        </div>
                                    )}

                                    <div
                                        className={`
                      max-w-[82%] whitespace-pre-wrap break-words
                      rounded-2xl px-3.5 py-2.5
                      text-[12.5px] leading-relaxed
                      ${isUser
                                                ? "rounded-br-md bg-[#050507] text-white"
                                                : "rounded-bl-md border border-[#050507]/[0.08] bg-[#fbfbfc] text-[#3d4149]"
                                            }
                      ${message.error
                                                ? "border !border-red-300 !bg-red-50 !text-red-600"
                                                : ""
                                            }
                    `}
                                    >
                                        {message.content}
                                    </div>

                                    {isUser && (
                                        <div
                                            className="
                        flex h-7 w-7 shrink-0 items-center
                        justify-center rounded-lg border
                        border-[#050507]/10 bg-white text-[#3d4149]
                      "
                                        >
                                            <User size={13} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="flex items-end gap-2">
                                <div
                                    className="
                    flex h-7 w-7 items-center justify-center
                    rounded-lg border border-[#050507]
                    bg-[#050507] text-white
                  "
                                >
                                    <Bot size={14} />
                                </div>

                                <div
                                    role="status"
                                    aria-label="JARVIS is responding"
                                    className="
                    flex items-center gap-1 rounded-2xl
                    rounded-bl-md border border-[#050507]/[0.08]
                    bg-[#fbfbfc] px-4 py-3
                  "
                                >
                                    {[0, 1, 2].map((dot) => (
                                        <span
                                            key={dot}
                                            className="
                        h-1.5 w-1.5 animate-bounce
                        rounded-full bg-[#1e5cff]
                      "
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

                {/* Message input */}
                <footer className="border-t border-[#050507]/[0.07] bg-white p-3">
                    <div
                        className="
              flex items-end gap-2 rounded-xl border
              border-[#050507]/10 bg-white p-1.5 pl-3
              transition focus-within:border-[#050507]
              focus-within:shadow-[0_0_0_3px_rgba(30,92,255,0.10)]
            "
                    >
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
                            className="
                max-h-24 min-h-9 flex-1 resize-none
                bg-transparent py-2 text-[12.5px]
                leading-relaxed text-[#050507] outline-none
                placeholder:text-[#7b8089] disabled:opacity-50
              "
                        />

                        <button
                            type="button"
                            onClick={sendMessage}
                            disabled={!input.trim() || loading}
                            aria-label="Send message"
                            className="
                flex h-9 w-9 shrink-0 items-center
                justify-center rounded-lg bg-[#050507]
                text-white transition hover:bg-[#1e5cff]
                disabled:cursor-not-allowed disabled:opacity-30
              "
                        >
                            <Send size={15} />
                        </button>
                    </div>

                    <div
                        className="
              flex items-center justify-between px-1 pt-2
              font-mono text-[9px] uppercase tracking-widest
              text-[#7b8089]
            "
                    >
                        <span>JARVIS · Groq</span>

                        <span className="hidden sm:inline">
                            Enter to send · Shift+Enter newline
                        </span>

                        <span className="sm:hidden">Enter to send</span>
                    </div>
                </footer>
            </section>
        </>
    );
}
