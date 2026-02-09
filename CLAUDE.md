# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 14 (App Router) web app for running a Super Bowl prop bets challenge. Players submit picks on 25 prop bets (e.g., coin toss, total points, player stats), and an admin panel allows setting correct answers and viewing a live scoreboard. The player with the most correct picks wins.

**Tech Stack:**
- Next.js 14 (App Router) + TypeScript + React 18
- Tailwind CSS v3 (custom NFL team colors)
- Prisma v6 + PostgreSQL (Supabase)
- Authentication: JWT (jose) with httpOnly cookies
- Deployment: Vercel

## Development Commands

```bash
# Install dependencies (use cache workaround if needed)
npm install --cache /tmp/npm-cache-fix

# Run dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Database operations
npx prisma generate           # Generate Prisma client
npx prisma migrate dev        # Run migrations in dev
npx prisma migrate deploy     # Run migrations in production
npx prisma studio            # Open Prisma Studio (GUI)
npx prisma db seed           # Seed database with 25 prop bets + admin user
```

## Architecture

### Data Model (Prisma Schema)

**Core entities:**
- `PropBet`: A single prop bet question with `choiceA` and `choiceB` (e.g., "Coin toss: Heads vs Tails")
- `Entry`: A player's submission with `playerName`, `venmoUsername`, `tiebreaker` (total points guess)
- `Pick`: Junction table linking Entry → PropBet with a `selection` ("A" or "B")
- `AnswerKey`: Admin-submitted correct answers (PropBet → `correctChoice`)
- `TiebreakerAnswer`: The actual total points scored (for tiebreaker ranking)
- `AdminUser`: Admin login credentials (bcrypt hashed)
- `Settings`: Global settings like `submissionsClosed` flag

**Key relationships:**
- Each Entry has 25 Picks (one per PropBet)
- AnswerKey has one record per PropBet (admin can submit partial answers)
- Scoreboard is computed by comparing Picks to AnswerKey

### Authentication Flow

- Admin login at `/login` → validates credentials → sets httpOnly JWT cookie (`admin_token`)
- `src/lib/auth.ts` provides:
  - `getAuthFromRequest(request)`: for API routes
  - `getAuthFromCookies()`: for Server Components
- Protected routes (admin panel, answer key API) check auth and return 401 if missing

### API Routes

All in `src/app/api/`:

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/props` | GET | No | Fetch all prop bets (ordered) |
| `/api/props` | PUT | Yes | Edit a prop bet |
| `/api/props` | POST | Yes | Replace all prop bets (bulk upload) |
| `/api/entries` | GET | Yes | List all entries (admin view) |
| `/api/entries` | POST | No | Submit new entry with picks |
| `/api/entries` | DELETE | Yes | Delete an entry |
| `/api/entries/[id]` | GET | No | Get single entry with picks |
| `/api/answer-key` | GET | No | Fetch submitted answers (may be partial) |
| `/api/answer-key` | POST | Yes | Submit/update answer key + tiebreaker |
| `/api/scoreboard` | GET | No | Compute and return ranked scores |
| `/api/settings` | GET | No | Get `submissionsClosed` flag |
| `/api/settings` | POST | Yes | Toggle `submissionsClosed` |
| `/api/auth/login` | POST | No | Login (returns JWT cookie) |
| `/api/auth/logout` | POST | Yes | Logout (clears cookie) |
| `/api/auth/me` | GET | Yes | Check auth status |

### Frontend Pages

- `/` (Home): Landing page with team logos, "Make Your Picks" and "Scoreboard" buttons. Shows "Submissions Closed" if disabled. Admin link if logged in.
- `/picks`: Form to submit picks (shows disabled state if submissions closed)
- `/scoreboard`: Public scoreboard (clickable entries)
- `/entry/[id]`: View a specific entry's picks (with correct/incorrect indicators if answer key exists)
- `/admin`: Admin panel with:
  - Toggle submissions open/closed
  - Edit questions inline or bulk replace via JSON upload
  - Submit answer key (partial or full)
  - View entries (with delete)
  - View scoreboard
- `/login`: Admin login form

### Scoring Logic

In `/api/scoreboard`:
1. Fetch all AnswerKey records
2. For each Entry, count correct Picks (compare `selection` to `correctChoice`)
3. Calculate tiebreaker diff: `|entry.tiebreaker - tiebreakerAnswer.correctTotal|`
4. Sort by score DESC, then tiebreaker diff ASC

### Database Environment

- Uses PostgreSQL on Supabase
- `DATABASE_URL`: Connection pooling (transaction mode for Prisma queries)
- `DIRECT_URL`: Direct connection (session mode for migrations)
- Both URLs are in `.env` (not committed)

### Prisma Quirks

- Using Prisma v6 (v7 changed schema syntax)
- `postinstall` script runs `prisma generate` automatically
- Seed file uses bcrypt for admin password (generates random password on first seed)
- Singleton pattern in `src/lib/prisma.ts` to avoid multiple instances in dev hot-reload

### Styling

- Tailwind v3 with custom color palette:
  - `nfl-navy`, `nfl-red` (generic NFL branding)
  - `seahawks-navy`, `seahawks-green`, `seahawks-grey`
  - `patriots-blue`, `patriots-red`, `patriots-silver`
  - `surface-{500-900}` (dark UI backgrounds)
- Team logos in `/public` (SVG format)

## Deployment Notes

- Deployed on Vercel
- Environment variables must be set in Vercel dashboard:
  - `DATABASE_URL`
  - `DIRECT_URL`
  - `ADMIN_JWT_SECRET`
- Run migrations on Supabase before deploying: `npx prisma migrate deploy`
- Seed data can be run locally or via Vercel's shell

## Common Patterns

**Adding a new prop bet field:**
1. Update `prisma/schema.prisma` (add column to `PropBet`)
2. Create migration: `npx prisma migrate dev --name add_field`
3. Update `prisma/seed.ts` to include new field
4. Update frontend forms and API routes that read/write PropBet

**Adding a new admin feature:**
1. Create API route in `src/app/api/` with auth check:
   ```ts
   const auth = await getAuthFromRequest(request);
   if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   ```
2. Add UI in `src/app/admin/page.tsx` (client component with state management)

**Modifying the scoring algorithm:**
- Edit `/api/scoreboard/route.ts` (all scoring logic is centralized here)
- Scoreboard recomputes on every GET request (no caching)

**Changing the database schema:**
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description_of_change`
3. Commit both the schema and the generated migration files
4. Deploy: `npx prisma migrate deploy` (run in production environment)
