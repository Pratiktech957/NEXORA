
const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/chat`;

export async function sendChatMessage(message, history = []) {
    if (typeof message !== "string" || !message.trim()) {
        throw new Error("Please enter a message.");
    }

    let response;

    try {
        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message.trim(),
                history,
            }),
        });
    } catch {
        throw new Error(
            "Unable to reach JARVIS. Please check your internet connection or backend server."
        );
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error(
            `Invalid server response (HTTP ${response.status}).`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.message || `Chat request failed (HTTP ${response.status}).`
        );
    }

    if (data.success !== true || typeof data.message !== "string") {
        throw new Error("Invalid response received from JARVIS.");
    }

    return data.message;
}
