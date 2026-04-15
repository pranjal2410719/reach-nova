# Backend Setup Guide

## Prerequisites

- PostgreSQL database running
- Node.js 18+

## 1. Environment Variables

Update `.env` with your database connection:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/reach_nova"
JWT_SECRET=your-secret-key-min-32-chars
```

## 2. Database Setup

Generate Prisma client:
```bash
npm run db:generate
```

Push schema to database:
```bash
npm run db:push
```

Or migrate (recommended for production):
```bash
npm run db:migrate
```

## 3. Seed Data

Create test users:
```bash
npm run db:seed
```

This creates:
- **Influencer**: `influencer@test.com` / `password123`
- **Brand**: `brand@test.com` / `password123`

## 4. Run Development Server

```bash
npm run dev
```

Backend runs at `http://localhost:3000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | List campaigns (filters: search, category, status, page, limit) |
| POST | `/api/campaigns` | Create campaign (BRAND only) |
| GET | `/api/campaigns/[id]` | Get campaign |
| PUT | `/api/campaigns/[id]` | Update campaign |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Apply to campaign (INFLUENCER only) |
| GET | `/api/applications/user` | Get user's applications |
| GET | `/api/applications/campaign/[id]` | Get applications for campaign (BRAND only) |
| PUT | `/api/applications/[id]` | Update application status (BRAND only) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |

---

## Authentication

- JWT stored in httpOnly cookie
- Cookie name: `token`
- Expiry: 7 days

## Role-Based Access

- `INFLUENCER`: Apply to campaigns, view own applications
- `BRAND`: Create campaigns, manage applications
- `ADMIN`: Full access