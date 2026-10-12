
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.GROQ_API_KEY) {
    console.error("Missing GROQ_API_KEY in backend/.env");
    process.exit(1);
}

app.use(
    cors({
        origin:
            process.env.FRONTEND_URL || "http://localhost:5173",
    })
);

app.use(express.json({ limit: "20kb" }));

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pratik Portfolio Backend is running.",
    });
});

// Chat API
app.use("/api/chat", chatRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found.",
    });
});

// Handle malformed JSON and other Express errors
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error("Express error:", err.message);

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body.",
        });
    }

    return res.status(500).json({
        success: false,
        message: "An internal server error occurred.",
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
