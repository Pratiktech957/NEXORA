
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const chatController = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        // Validate the incoming message
        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid message.",
            });
        }

        if (message.length > 4000) {
            return res.status(400).json({
                success: false,
                message: "Message is too long. Maximum 4000 characters.",
            });
        }

        // Accept only valid conversation history
        const validHistory = Array.isArray(history)
            ? history
                .filter(
                    (item) =>
                        item &&
                        ["user", "assistant"].includes(item.role) &&
                        typeof item.content === "string"
                )
                .slice(-10)
                .map((item) => ({
                    role: item.role,
                    content: item.content.slice(0, 4000),
                }))
            : [];

        const completion = await groq.chat.completions.create({
            model:
                process.env.GROQ_MODEL || "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content: `
You are JARVIS, the AI assistant on Pratik's developer portfolio.

Your job is to help visitors understand Pratik's skills,
projects, experience, and software development interests.

Be professional, friendly, concise, and helpful.
Do not invent personal details, qualifications, or experience.
If you do not know a fact about Pratik, say so honestly.
For unrelated questions, respond briefly and politely.
          `.trim(),
                },
                ...validHistory,
                {
                    role: "user",
                    content: message.trim(),
                },
            ],

            temperature: 0.5,
            max_tokens: 500,
        });

        const reply =
            completion.choices?.[0]?.message?.content?.trim();

        if (!reply) {
            throw new Error("Groq returned an empty response.");
        }

        return res.status(200).json({
            success: true,
            message: reply,
        });
    } catch (error) {
        // Keep the detailed error in the backend terminal
        console.error("JARVIS controller error:", {
            status: error.status,
            code: error.code,
            message: error.message,
        });

        if (error.status === 429) {
            return res.status(429).json({
                success: false,
                message: "JARVIS is busy right now. Please try again shortly.",
            });
        }

        return res.status(502).json({
            success: false,
            message: "Unable to connect to JARVIS right now. Please try again.",
        });
    }
};

module.exports = { chatController };
