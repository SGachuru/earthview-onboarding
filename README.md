# EarthView Onboarding

A full-stack customer onboarding application with a React frontend and Express.js backend API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Authentication](#authentication)
- [Running the Applications](#running-the-applications)
- [Environment Variables](#environment-variables)

## Features

- User authentication (register, login, JWT-based session)
- Customer onboarding form with geolocation support
- Dashboard with customer statistics
- Customer listing with status badges
- Customer details view
- Responsive UI with navigation

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose) with optional in-memory mock mode
- **Authentication**: JWT (jsonwebtoken), bcryptjs for password hashing

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with interceptor for auth handling

## Project Structure

```
earthview-onboarding/
├── backend/                    # Express.js API server
│   ├── package.json
│   ├── server.js              # Entry point, starts the server
│   ├── src/
│   │   ├── app.js           # Express app configuration, routes
│   │   ├── config/
│   │   │   └── db.js        # MongoDB connection (or mock mode)
│   │   ├── controllers/
│   │   │   ├── authController.js     # Auth: register, login, getMe
│   │   │   └── customerController.js # Customers: CRUD, stats
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # protect, admin middleware
│   │   ├── models/
│   │   │   ├── userModel.js          # Mongoose User schema
│   │   │   ├── customerModel.js      # Mongoose Customer schema
│   │   │   └── mockModels.js         # In-memory mock models
│   │   └── routes/
│   │       ├── authRoutes.js         # /api/auth endpoints
│   │       └── customerRoutes.js     # /api/customers endpoints
│   └── .env                    # Environment variables
├── frontend/                   # React + Vite application
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js         # Vite config with /api proxy
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── index.css
│       ├── App.jsx            # App wrapper, route definitions
│       ├── api/
│       │   └── axios.js       # Axios instance with auth interceptor
│       ├── components/
│       │   ├── Navbar.jsx     # Navigation component
│       │   ├── Navbar.css
│       │   ├── ProtectedRoute.jsx  # Auth guard component
│       │   └── ProtectedRoute.css
│       ├── context/
│       │   └── AuthContext.jsx # Auth state management
│       └── pages/
│           ├── Login.jsx          # Login page
│           ├── Dashboard.jsx      # Stats dashboard
│           ├── CustomerList.jsx   # Customer listing
│           ├── CustomerDetails.jsx # Customer details view
│           └── OnboardingForm.jsx  # Customer onboarding form
└── package.json               # Root scripts (concurrently)
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Frontend proxy: `/api` -> `http://localhost:3000`

### Auth Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": { "id": "string", "name": "string", "email": "string", "role": "user|admin" }
}
```

#### POST /api/auth/login
Login with credentials.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": { "id": "string", "name": "string", "email": "string", "role": "user|admin" }
}
```

#### GET /api/auth/me
Get current user profile (requires auth).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": { "id": "string", "name": "string", "email": "string", "role": "string" }
}
```

### Customer Endpoints

All customer endpoints require authentication. Include `Authorization: Bearer <token>` header.

#### GET /api/customers
Get all customers.

**Response:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

#### POST /api/customers
Create a new customer.

**Request Body:** Form data from OnboardingForm
```json
{
  "date": "string",
  "company": "string",
  "firstName": "string",
  "middleName": "string",
  "lastName": "string",
  "physicalAddress": "string",
  "email": "string",
  "phone": "string",
  "permitNumber": "string",
  "latitude": "string",
  "longitude": "string",
  "salesRepName": "string",
  "salesRepSignature": "string",
  "salesRepDate": "string",
  "adminApproval": boolean,
  "financeApproval": boolean,
  "implementationApproval": boolean,
  "managingDirectorApproval": boolean,
  "comments": "string"
}
```

#### GET /api/customers/:id
Get a customer by ID.

**Response:**
```json
{
  "success": true,
  "data": { "customer object" }
}
```

#### PUT /api/customers/:id
Update a customer.

**Request Body:** Partial customer data

**Response:**
```json
{
  "success": true,
  "data": { "updated customer" }
}
```

#### DELETE /api/customers/:id
Delete a customer.

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

#### GET /api/customers/stats
Get customer statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCustomers": 0,
    "pendingOnboarding": 0,
    "completedOnboarding": 0
  }
}
```

## Frontend Documentation

### Pages

| Path | Component | Description |
|------|-----------|-------------|
| `/login` | Login.jsx | Authentication page |
| `/` | Dashboard.jsx | Redirect to dashboard |
| `/dashboard` | Dashboard.jsx | Statistics overview |
| `/customers` | CustomerList.jsx | List all customers |
| `/onboarding` | OnboardingForm.jsx | Customer onboarding form |
| `/customers/:id` | CustomerDetails.jsx | View customer details |

### Auth Context

`AuthContext.jsx` provides:
- `user` - Current user object (from localStorage)
- `login(credentials)` - Authenticate and store token/user
- `register(userData)` - Register new user
- `logout()` - Clear stored credentials
- `loading` - Auth state loading flag

### Axios Instance

`api/axios.js` configures:
- Base URL: `/api` (proxied to backend)
- Automatic token injection via `Authorization: Bearer` header
- 401 handling: clears localStorage and redirects to `/login`

## Authentication

- JWT tokens are stored in localStorage
- Tokens expire after 30 days
- Protected routes redirect unauthenticated users to `/login`
- Admin user seeded automatically on first run with email/password: `admin/admin`

## Running the Applications

### From root (recommended)
```bash
npm run dev          # Start both frontend (5173) and backend (3000)
npm run start        # Production mode
npm run dev:mock     # Start with mock DB (no MongoDB required)
npm run dev:all      # Start with mock DB and ngrok tunnel (port 5173)
```

### Individual services
```bash
# Backend only
npm run dev --prefix backend
npm run start --prefix backend

# Frontend only
npm run dev --prefix frontend
```

### Ports
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/earthview
JWT_SECRET=your_jwt_secret_key
USE_MOCK_DB=true    # Optional: skip MongoDB connection
```

### Frontend (.env)
```
VITE_API_URL=/api
```