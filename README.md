# multi-chat-bot# Multi-AI Chat Application

A modern, responsive chat interface that supports multiple AI providers including OpenAI ChatGPT, Anthropic Claude, Google Gemini, and Meta LLaMA.

## Features

- 🤖 **Multiple AI Models**: Chat with ChatGPT, Claude, Gemini, and LLaMA
- 💬 **Real-time Chat**: Instant responses with typing indicators
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **Chat History**: Persistent chat sessions with localStorage
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 🔒 **Security**: Rate limiting and input validation
- ⚡ **Fast**: Optimized for performance

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-ai-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Getting API Keys

### OpenAI (ChatGPT)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/login and navigate to API Keys
3. Create a new API key

### Anthropic (Claude)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up/login and get your API key
3. Add credits to your account

### Google (Gemini)
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Get your API key
3. Enable the Generative Language API

### Hugging Face (LLaMA)
1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up/login and go to Settings > Access Tokens
3. Create a new token

## Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy:
   ```bash
   git push heroku main
   ```

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

### Docker
1. Build the image:
   ```bash
   docker build -t multi-ai-chat .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env multi-ai-chat
   ```

## Project Structure

```
multi-ai-chat/
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── public/               # Frontend files
│   ├── index.html        # Main HTML file
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       └── app.js        # Frontend JavaScript
├── routes/               # API routes
│   └── chat.js           # Chat endpoints
├── middleware/           # Custom middleware
│   └── auth.js           # Authentication (optional)
└── utils/                # Utility functions
    └── aiClients.js      # AI API clients
```

## API Endpoints

- `POST /api/chat/openai` - Chat with ChatGPT
- `POST /api/chat/claude` - Chat with Claude
- `POST /api/chat/gemini` - Chat with Gemini
- `POST /api/chat/llama` - Chat with LLaMA

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- OpenAI for ChatGPT API
- Anthropic for Claude API
- Google for Gemini API
- Hugging Face for LLaMA access
- All contributors to this project

---

**Note**: Make sure to keep your API keys secure and never commit them to version control.