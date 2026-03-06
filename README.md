# Athly — Strava MCP + Frontend Integration

This monorepo contains two projects that work together to deliver a personalized running training platform powered by your Strava data.

```
athly-test-repo/
├── strava-mcp/    # MCP server + REST API (Node.js + Express + MongoDB)
└── athly-test/    # Frontend dashboard (React + Vite + Tailwind)
```

---

## How It Works

```
Strava API
    │
    ▼
strava-mcp (port 3000)
 ├── MCP tools (used by Cursor AI)
 ├── REST API (/api/week-plans, /api/plan-next-week)
 └── MongoDB (persists weekly plans)
        │
        ▼
 athly-test (port 5173)
  └── React dashboard (reads plans, shows workouts)
```

1. **strava-mcp** authenticates with the Strava API via OAuth and exposes both MCP tools (for AI agents like Cursor) and a REST API (for the frontend).
2. When the `plan-next-week` tool is called — either from Cursor or by the frontend — it fetches your recent Strava runs, generates a personalized 5-day training plan, and persists it to MongoDB.
3. **athly-test** reads those plans from the REST API and displays them in a visual dashboard.

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) (for MongoDB via Docker Compose)
- A [Strava API application](https://www.strava.com/settings/api) (free, one-time setup)

---

## 1. Strava API Credentials

Before starting anything, you need Strava API credentials:

1. Go to [strava.com/settings/api](https://www.strava.com/settings/api)
2. Create an app (or use an existing one)
   - **Authorization Callback Domain:** `localhost`
3. Copy your **Client ID**, **Client Secret**, **Access Token**, and **Refresh Token**

---

## 2. Set Up `strava-mcp`

### 2a. Configure environment variables

```bash
cd strava-mcp
cp .env.example .env   # if .env.example exists, otherwise create .env
```

Edit `.env`:

```env
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_ACCESS_TOKEN=your_access_token
STRAVA_REFRESH_TOKEN=your_refresh_token
MONGODB_URI=mongodb://localhost:27017/strava-mcp
PORT=3000
```

### 2b. Start with Docker Compose (recommended)

This starts both the MCP server and MongoDB:

```bash
cd strava-mcp
docker compose up --build
```

The server will be available at `http://localhost:3000`.

### 2c. Start locally (without Docker)

You need a running MongoDB instance (locally or Atlas), then:

```bash
cd strava-mcp
npm install
npm run build
npm start
```

---

## 3. Set Up `athly-test`

```bash
cd athly-test
npm install
```

Create a `.env.local` file (optional — defaults to `http://localhost:3000`):

```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 4. Connect to Strava

With `strava-mcp` running, open a browser and go to:

```
http://localhost:8111/setup
```

Or, if using Cursor, simply say:

> "Connect my Strava account"

Follow the OAuth flow: enter your Client ID and Secret, authorize the app on Strava, and you're done. Credentials are saved locally at `~/.config/strava-mcp/config.json`.

---

## 5. Generate a Training Plan

### Via the Frontend (athly-test)

1. Open `http://localhost:5173`
2. If no plan exists, click **"Gerar Plano"** on the dashboard
3. The frontend will call `POST /api/plan-next-week` on the MCP server
4. Your personalized plan will appear automatically

### Via Cursor AI (MCP)

With the `strava-mcp` server running and configured in Cursor, you can ask the AI:

> "Gere meu plano de treino para a próxima semana"
>
> "Analyze my last 5 runs and create a weekly training schedule"

Cursor will call the `plan-next-week` MCP tool, analyze your Strava runs, and present a structured plan with coaching insights focused on helping you run **5km in under 26 minutes** (target pace: 5:12/km).

### Via REST API (curl)

```bash
# Generate a new plan
curl -X POST http://localhost:3000/api/plan-next-week \
  -H "Content-Type: application/json" \
  -d '{"numberOfRuns": 5}'

# Get the latest saved plan
curl http://localhost:3000/api/week-plans/latest

# Get all saved plans
curl http://localhost:3000/api/week-plans
```

---

## REST API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/plan-next-week` | Generate a new week plan from Strava data |
| `GET` | `/api/week-plans/latest` | Retrieve the most recent saved plan |
| `GET` | `/api/week-plans` | List all saved plans |
| `GET` | `/api/week-plans/:id` | Get a specific plan by ID |

### `POST /api/plan-next-week` body

```json
{
  "numberOfRuns": 5,
  "weekStartDate": "2026-03-09"
}
```

Both fields are optional. `numberOfRuns` defaults to `5`; `weekStartDate` defaults to next Monday.

---

## Weekly Plan Structure

Each generated plan covers **Monday through Friday** with 3 structured blocks per session:

| Day | Session | Intensity |
|-----|---------|-----------|
| Monday | Recovery Run | Easy |
| Tuesday | Interval Training | High |
| Wednesday | Tempo Run | Moderate |
| Thursday | Easy Aerobic Run | Easy |
| Friday | Long Run | Moderate |

Each workout includes:
- **Warmup** — 10 min easy jog
- **Main workout** — tailored to session type
- **Cooldown** — 5 min easy jog

---

## Cursor MCP Configuration

To use the MCP tools in Cursor, add to your `~/.cursor/mcp.json` (or the project-level `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "strava": {
      "command": "node",
      "args": ["/absolute/path/to/strava-mcp/dist/server.js"]
    }
  }
}
```

Or using the published npm package (no local build needed):

```json
{
  "mcpServers": {
    "strava": {
      "command": "npx",
      "args": ["-y", "@r-huijts/strava-mcp-server"]
    }
  }
}
```

Restart Cursor after changing the MCP config.

---

## Troubleshooting

**Frontend shows "Nenhum plano encontrado"**
- Make sure `strava-mcp` is running on port 3000
- Verify the `VITE_API_URL` in `athly-test/.env.local` points to the correct address
- Check that your Strava account is connected and has recent run activities

**`plan-next-week` returns "No recent runs found"**
- You need at least one run logged on Strava with the connected account

**MongoDB connection error**
- If using Docker Compose, make sure the `mongo` service is healthy before the MCP server starts (the `depends_on` healthcheck handles this automatically)
- If running locally, verify `MONGODB_URI` in `.env` points to a running MongoDB instance

**Strava token expired / "Authentication failed"**
- Tokens refresh automatically. If it fails, reconnect: open `http://localhost:8111/setup` or say "Connect my Strava account" in Cursor

**MCP tools not visible in Cursor**
- Validate your `mcp.json` is valid JSON (no trailing commas)
- Restart Cursor after any config changes
- Run `npx @r-huijts/strava-mcp-server` in the terminal to confirm the server starts without errors

---

## Criar repositório Git público

Siga estes passos para publicar o projeto no GitHub (ou em outro host).

### 1. Inicializar o Git (na raiz do projeto)

```bash
cd /caminho/para/athly-test-repo
git init
```

### 2. Adicionar os arquivos e fazer o primeiro commit

```bash
git add .
git status   # confira: não deve aparecer .env, node_modules, dist
git commit -m "Initial commit: Athly — Strava MCP + frontend integration"
```

### 3. Criar o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new).
2. **Repository name:** por exemplo `athly` ou `athly-strava-mcp`.
3. **Description:** opcional, ex: "Running training platform with Strava MCP + React dashboard".
4. Escolha **Public**.
5. **Não** marque "Add a README" (você já tem um na pasta).
6. Clique em **Create repository**.

### 4. Conectar o repositório local e enviar o código

No GitHub, a página do repositório novo mostra algo como:

```bash
git remote add origin https://github.com/SEU_USUARIO/athly.git
git branch -M main
git push -u origin main
```

Use a URL do **seu** repositório (HTTPS ou SSH). Exemplo com SSH:

```bash
git remote add origin git@github.com:SEU_USUARIO/athly.git
git branch -M main
git push -u origin main
```

### 5. Conferir

- Verifique que **nenhum** arquivo `.env` ou `node_modules` foi enviado (o `.gitignore` na raiz evita isso).
- Credenciais do Strava devem ficar apenas em `.env` (local) ou em variáveis de ambiente do servidor; nunca no repositório.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| MCP / REST server | Node.js, TypeScript, Express, `@modelcontextprotocol/sdk` |
| Database | MongoDB |
| Containerization | Docker Compose |
| Frontend | React 19, Vite, Tailwind CSS 4, Zustand, React Router |
| AI integration | Cursor MCP, `plan-next-week` tool |
