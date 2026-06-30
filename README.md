# EarthView Onboarding

This is a monorepo containing two separate projects:

## Structure

```
├── backend/     # Express.js API server
│   ├── package.json
│   ├── server.js
│   ├── src/
│   └── .env
└── frontend/    # React + Vite application
    ├── package.json
    └── src/
```

## Running the Applications

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend proxies `/api` requests to the backend at `http://localhost:3000`.