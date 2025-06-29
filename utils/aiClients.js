require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

class AIClients {
    static async chatWithOpenAI(message, chatHistory) {
        if (!OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }

        const messages = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7,
                stream: false
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    static async chatWithClaude(message, chatHistory) {
        if (!ANTHROPIC_API_KEY) {
            throw new Error('Anthropic API key not configured');
        }

        const messages = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': ANTHROPIC_API_KEY,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1000,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Claude API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    static async chatWithGemini(message, chatHistory) {
        if (!GOOGLE_API_KEY) {
            throw new Error('Google API key not configured');
        }

        const history = chatHistory.slice(0, -1).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    ...history,
                    {
                        role: 'user',
                        parts: [{ text: message }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    static async chatWithLLaMA(message, chatHistory) {
        if (!HUGGINGFACE_API_KEY) {
            throw new Error('Hugging Face API key not configured');
        }

        let prompt = '';
        chatHistory.forEach(msg => {
            prompt += `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
        });
        prompt += 'Assistant:';

        const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`LLaMA API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        let responseText = data[0]?.generated_text || 'Sorry, I couldn\'t generate a response.';
        
        responseText = responseText.replace(/^Assistant:\s*/, '').trim();
        
        return responseText;
    }
}

module.exports = AIClients;

