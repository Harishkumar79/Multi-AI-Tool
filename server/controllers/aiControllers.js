const axios = require("axios");
const { text } = require("express");

// deepseek AI
exports.useDeepseekAI = async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("OpenAI Error:", error.response?.data || error.message);
        res.status(500).json({ error: "openAI error" });
    }
}

// gemimi AI
exports.useGeminiAI = async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
        );

        res.json(response.data)

    } catch (error) {
        console.error("geminiAI Error:", error.response?.data || error.message);
        res.status(500).json({ error: "geminiAI error" });
    }
}

// huggingface
exports.useMistralAI = async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            `https://api.mistral.ai/v1/chat/completions`,
            {
                model: "mistral-large-latest",
                messages:[{role: "user",content: prompt}]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.MISTRALAI_API_KEY}`
                },
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error("huggingface Error:", error.response?.data || error.message);
        res.status(500).json({ error: "huggingface error" });
    }
}

// cohere AI
exports.useCohereAI = async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            "https://api.cohere.ai/v1/chat",
            {
                message: prompt,
                model: "command-r-plus"

            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.COHEREAI_API_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error("cohereAI Error:", error.response?.data || error.message);
        res.status(500).json({ error: "cohereAI error" });
    }
}