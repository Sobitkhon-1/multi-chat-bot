const express = require('express');
const router = express.Router();
const { RateLimiterMemory } = require('rate-limiter-flexible');
const aiClients = require('../utils/aiClients');

// Rate limiting
const rateLimiter = new RateLimiterMemory({
    keyGenerator: (req) => req.ip,
    points: 30, // Number of requests
    duration: 60, // Per 60 seconds
});

// Rate limiting middleware
const rateLimitMiddleware = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch (rejRes) {
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set('Retry-After', String(secs));
        res.status(429).json({
            error: 'Too many requests',
            retryAfter: secs
        });
    }
};

// OpenAI ChatGPT endpoint
router.post('/openai', rateLimitMiddleware, async (req, res) => {
    try {
        const { message, chatHistory } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }

        const response = await aiClients.chatWithOpenAI(message, chatHistory || []);
        res.json({ response });

    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from ChatGPT',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable'
        });
    }
});

// Anthropic Claude endpoint
router.post('/claude', rateLimitMiddleware, async (req, res) => {
    try {
        const { message, chatHistory } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }

        const response = await aiClients.chatWithClaude(message, chatHistory || []);
        res.json({ response });

    } catch (error) {
        console.error('Claude API error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from Claude',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable'
        });
    }
});

// Google Gemini endpoint
router.post('/gemini', rateLimitMiddleware, async (req, res) => {
    try {
        const { message, chatHistory } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }

        const response = await aiClients.chatWithGemini(message, chatHistory || []);
        res.json({ response });

    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from Gemini',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable'
        });
    }
});

// Hugging Face LLaMA endpoint
router.post('/llama', rateLimitMiddleware, async (req, res) => {
    try {
        const { message, chatHistory } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string' });
        }

        const response = await aiClients.chatWithLLaMA(message, chatHistory || []);
        res.json({ response });

    } catch (error) {
        console.error('LLaMA API error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from LLaMA',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable'
        });
    }
});

module.exports = router;