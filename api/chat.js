import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const { message, history = [] } = req.body || {};

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: "GROQ_API_KEY is not configured",
            });
        }

        const messages = [
            {
                role: "system",
                content:
                    "You are JARVIS, the AI assistant for Pratik Mohanty's software engineering portfolio. Answer professionally and concisely. Do not invent facts about Pratik.",
            },

            ...history
                .filter(
                    (item) =>
                        item &&
                        ["user", "assistant"].includes(item.role) &&
                        typeof item.content === "string"
                )
                .slice(-10),

            {
                role: "user",
                content: message.trim(),
            },
        ];

        const completion = await groq.chat.completions.create({
            model:
                process.env.GROQ_MODEL ||
                "llama-3.3-70b-versatile",
            messages,
            temperature: 0.4,
            max_tokens: 500,
        });

        const reply =
            completion.choices?.[0]?.message?.content ||
            "I couldn't generate a response.";

        return res.status(200).json({
            success: true,
            message: reply,
        });
    } catch (error) {
        console.error("JARVIS API error:", error.message);

        return res.status(500).json({
            error: "JARVIS could not process the request.",
        });
    }
}