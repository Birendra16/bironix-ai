# BironixAI

**BironixAI** is a production-grade, multi-agent AI platform built on a microservices architecture. It routes user queries to specialized AI agents — covering general chat, real-time web search, code generation, PDF analysis, presentation creation, and image vision — all from a single, modern chat interface.

---

## ✨ Features

| Agent | Capability |
|---|---|
| 🤖 **Chat** | Context-aware conversation with rolling memory (last 20 messages) |
| 🔍 **Search** | Real-time web search via Tavily, with inline image results |
| 💻 **Coding** | Full project generation (HTML/CSS/JS) with live in-browser preview and Monaco editor |
| 📄 **PDF** | Document context Q&A *(in development)* |
| 📊 **PPT** | Presentation generation *(in development)* |
| 🖼️ **Vision** | Image understanding and generation *(in development)* |

**Platform highlights:**
- 🧠 **Redis-backed conversation memory** — per-session context, TTL-managed, 24-hour persistence
- 🔐 **Google OAuth** via Firebase — session stored in Redis, cookie-based auth
- 🎨 **Artifact panel** — collapsible side panel with Monaco editor, file tabs, and sandboxed iframe preview
- 🔀 **Intelligent auto-routing** — LLM-based query classifier routes to the right agent automatically
- ⚡ **Model flexibility** — Groq (GPT-oss-120b), DeepSeek (via OpenRouter), Claude Sonnet (via OpenRouter), Gemini 2.5 Flash
- 📱 **Responsive UI** — dark-mode-first design, collapsible sidebar and artifact panel

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Frontend                           │
│         (Vite · Redux Toolkit · TailwindCSS · Firebase)         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP + Cookies
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway :8000                          │
│      (Express · express-http-proxy · Redis session auth)        │
└──────┬───────────────────┬────────────────────┬────────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
 ┌──────────┐       ┌──────────┐        ┌──────────────┐
 │   Auth   │       │   Chat   │        │    Agent     │
 │  :8001   │       │  :8002   │        │    :8003     │
 │          │       │          │        │              │
 │ Firebase │       │ MongoDB  │        │  LangGraph   │
 │  Admin   │       │ Messages │        │  Workflow    │
 │  Redis   │       │  Convos  │        │  + Redis     │
 └──────────┘       └──────────┘        └──────┬───────┘
                                               │
                           ┌───────────────────┼───────────────────┐
                           ▼                   ▼                   ▼
                     ┌──────────┐       ┌──────────┐       ┌──────────┐
                     │  Chat    │       │  Search  │       │  Coding  │
                     │  Agent   │       │  Agent   │       │  Agent   │
                     │ (Groq)   │       │ (Tavily) │       │(DeepSeek)│
                     └──────────┘       └──────────┘       └──────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|---|---|
| **Runtime** | Node.js 22 (ESM) |
| **Framework** | Express.js v5 |
| **Gateway** | express-http-proxy |
| **Auth** | Firebase Admin SDK · Redis sessions |
| **AI Orchestration** | LangGraph (StateGraph) |
| **LLM Providers** | Groq · OpenRouter · Google Gemini |
| **Web Search** | Tavily Search API |
| **Database** | MongoDB Atlas (Mongoose) |
| **Cache / Memory** | Redis (ioredis) · Docker Compose |
| **Dev Server** | Nodemon |

### Frontend
| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Redux Toolkit |
| **HTTP Client** | Axios |
| **Auth** | Firebase (Google OAuth) |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Animations** | Motion (`motion/react`) |
| **Markdown** | react-markdown · remark-gfm |
| **Icons** | Lucide React · React Icons |

---

## 📁 Project Structure

```
bironix-ai/
├── backend/
│   ├── gateway/                  # API Gateway (port 8000)
│   │   ├── controllers/          # User session controller
│   │   ├── middleware/           # Redis-based auth middleware
│   │   └── utils/                # Proxy header decorator
│   ├── services/
│   │   ├── auth/                 # Auth service (port 8001)
│   │   │   ├── config/           # Firebase Admin + MongoDB
│   │   │   ├── controllers/      # Login / Logout
│   │   │   ├── models/           # User model
│   │   │   └── routes/
│   │   ├── chat/                 # Chat service (port 8002)
│   │   │   ├── config/           # MongoDB
│   │   │   ├── controllers/      # Conversations + Messages CRUD
│   │   │   ├── models/           # Conversation + Message schemas
│   │   │   └── routes/
│   │   └── agent/                # Agent service (port 8003)
│   │       ├── agents/           # chat · search · coding · pdf · ppt · vision
│   │       ├── config/           # LLM models · Redis memory · Tavily
│   │       ├── graph/            # LangGraph state · router · workflow
│   │       ├── routes/
│   │       └── utils/
│   ├── shared/
│   │   └── redis/                # Shared Redis client (ioredis)
│   └── docker-compose.yml        # Redis container
└── frontend/
    ├── public/
    ├── utils/
    │   ├── axios.js              # Axios instance with base URL + credentials
    │   └── firebase.js           # Firebase app + Google provider
    └── src/
        ├── components/
        │   ├── Artifact.jsx      # Code editor + live preview panel
        │   ├── ChatArea.jsx      # Chat layout orchestrator
        │   ├── ChatInput.jsx     # Input bar + agent selector
        │   ├── MessageBubble.jsx # Individual message renderer
        │   ├── MessageList.jsx   # Message feed
        │   ├── Nav.jsx           # Top navigation bar
        │   └── SideBar.jsx       # Conversation history sidebar
        ├── features/             # Async API thunks
        ├── pages/
        │   └── Home.jsx          # Main app page + Google login gate
        └── redux/
            └── slices/           # conversationSlice · messageSlice · userSlice
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- Docker (for Redis)
- MongoDB Atlas account
- Firebase project with Google Auth enabled
- API keys: Groq · OpenRouter · Tavily · Google Gemini

---

### 1. Clone the repository

```bash
git clone https://github.com/Birendra16/bironix-ai.git
cd bironix-ai
```

---

### 2. Start Redis

```bash
cd backend
docker compose up -d
```

---

### 3. Configure environment variables

Each service has its own `.env` file. Create them based on the samples below:

**`backend/gateway/.env`**
```env
PORT=8000
AUTH_SERVICE=http://localhost:8001
CHAT_SERVICE=http://localhost:8002
AGENT_SERVICE=http://localhost:8003
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
```

**`backend/services/auth/.env`**
```env
PORT=8001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/auth
REDIS_URL=redis://localhost:6379
```

> Place your Firebase service account key at `backend/services/auth/serviceAccountKey.json`

**`backend/services/chat/.env`**
```env
PORT=8002
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chat
```

**`backend/services/agent/.env`**
```env
PORT=8003
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/agent
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
TAVILY_API_KEY=your_tavily_api_key
CHAT_SERVICE=http://localhost:8002
REDIS_URL=redis://localhost:6379
```

**`frontend/.env`**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_SERVER_URL=http://localhost:8000
```

---

### 4. Install dependencies

```bash
# Gateway
cd backend/gateway && npm install

# Auth service
cd ../services/auth && npm install

# Chat service
cd ../chat && npm install

# Agent service
cd ../agent && npm install

# Frontend
cd ../../../frontend && npm install
```

---

### 5. Run all services

Open **6 terminals** (or use a process manager like `pm2` / `concurrently`):

```bash
# Terminal 1 — API Gateway
cd backend/gateway && npm run dev

# Terminal 2 — Auth Service
cd backend/services/auth && npm run dev

# Terminal 3 — Chat Service
cd backend/services/chat && npm run dev

# Terminal 4 — Agent Service
cd backend/services/agent && npm run dev

# Terminal 5 — Frontend
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 Request Flow

```
User types a message
      │
      ▼
Frontend (ChatInput) → POST /api/agent/chat
      │
      ▼
API Gateway — verifies Redis session cookie
      │
      ▼
Agent Service — saves user message to Chat Service
      │
      ▼
LangGraph Router — classifies query → selects agent
      │
      ├─ chat agent    → Groq (gpt-oss-120b)
      ├─ search agent  → Tavily → chat agent (with context)
      ├─ coding agent  → Intent classify → OpenRouter (DeepSeek)
      └─ ...
      │
      ▼
Result returned → saves assistant message to Chat Service
      │          → updates Redis memory
      ▼
Frontend renders response + artifact (if any)
```

---

## 🤖 Agent Routing

The router LLM automatically selects the right agent based on the user query. Users can also **manually select** an agent via the agent pill selector in the chat input bar.

| Selector | Routes to | Model |
|---|---|---|
| Auto | LLM decides | — |
| Chat | `chat` agent | Groq (gpt-oss-120b) |
| Coding | `coding` agent | OpenRouter (DeepSeek) |
| Search | `search` agent | Tavily + Groq |
| PDF | `pdf` agent | *(in development)* |
| PPT | `ppt` agent | *(in development)* |
| Image | `vision` agent | *(in development)* |

---

## 🗺️ Roadmap

- [ ] Unified dev runner with `concurrently`
- [ ] PDF document upload and Q&A
- [ ] PowerPoint generation
- [ ] Image generation (Vision agent)
- [ ] Usage/token tracking UI (Coins indicator)
- [ ] Rate limiting on the API Gateway
- [ ] Graceful Redis reconnect handling
- [ ] Docker Compose for full local stack
- [ ] CI/CD pipeline

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Birendra Bohara](https://github.com/Birendra16)

</div>

