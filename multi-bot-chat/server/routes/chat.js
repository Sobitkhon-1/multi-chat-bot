const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { bot, message } = req.body;

  try {
    let reply = "Bot not available.";
    if (bot === "gemini") {
      const result = await axios.post(
        \`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=\${process.env.GEMINI_API_KEY}\`,
        { contents: [{ parts: [{ text: message }] }] }
      );
      reply = result.data.candidates[0].content.parts[0].text;
    } else if (bot === "groq") {
      const result = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            Authorization: \`Bearer \${process.env.GROQ_API_KEY}\`,
            "Content-Type": "application/json",
          },
        }
      );
      reply = result.data.choices[0].message.content;
    } else if (bot === "openai") {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
            "Content-Type": "application/json",
          },
        }
      );
      reply = result.data.choices[0].message.content;
    }

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing message." });
  }
});

module.exports = router;
