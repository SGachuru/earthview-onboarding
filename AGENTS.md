# Development Commands

## Running Frontend and Backend Together

```bash
npm run dev          # Start both frontend (port 5173) and backend (port 3000)
npm run start        # Start both in production mode
npm run dev:mock     # Start both with mock DB (no MongoDB required)
npm run dev:all      # Start both with mock DB and ngrok tunnel (port 5173)
```

## Individual Services

```bash
npm run dev --prefix backend   # Backend only (nodemon, port 3000)
npm run dev --prefix frontend  # Frontend only (vite, port 5173)
```

## Ports

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API proxy: /api -> localhost:3000 (configured in vite.config.js)