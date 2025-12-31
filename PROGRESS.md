# Moving Pictures - Project Progress

**Last Updated**: December 31, 2025
**Repository**: https://github.com/lyubo-velikoff/moving-pictures

---

## Project Overview

A theatrical TV show showcase website featuring "Speed and Love" (双轨) - a 2025 Chinese action romance drama. Built with Next.js 16, Framer Motion, TypeScript, and real data from TMDB + MyDramaList.

---

## Completed Tasks ✅

### Phase 1: Project Setup
- [x] Created GitHub repository under `lyubo-velikoff`
- [x] Initialized Next.js 16 with Bun package manager
- [x] Configured TypeScript with strict mode
- [x] Set up Tailwind CSS v4 with custom dark theme
- [x] Installed and configured Framer Motion
- [x] Set up Vitest + React Testing Library
- [x] Set up Playwright for E2E testing
- [x] Created project folder structure

### Phase 2: Data Layer
- [x] Created TMDB API client (`src/lib/tmdb/`)
  - Typed API responses
  - Transformers for TMDB → App types
  - Support for shows, credits, episodes, videos, images
- [x] Created MyDramaList scraper (`src/lib/mdl/`)
  - HTML parsing for ratings
  - 24-hour caching
  - Graceful error handling
- [x] Created show service (`src/lib/shows/`)
  - Combines TMDB + MDL data
  - Multi-show architecture ready
- [x] Created show configuration (`src/config/shows.ts`)
  - Speed and Love registered with TMDB ID 279041

### Phase 3: API Routes
- [x] `GET /api/shows` - List all shows
- [x] `GET /api/shows/[slug]` - Show details
- [x] `GET /api/shows/[slug]/credits` - Cast & crew
- [x] `GET /api/shows/[slug]/episodes` - Episode breakdown
- [x] `GET /api/shows/[slug]/videos` - Trailers
- [x] `GET /api/shows/[slug]/images` - Gallery photos
- [x] ISR caching configured (24h for shows, 6h for episodes, 7d for images)

### Phase 4: UI Components
- [x] Design system with CSS variables
  - Dark cinematic theme
  - Warm racing accent colors (red/orange gradients)
  - Glassmorphism effects
  - Custom scrollbar
- [x] Base UI components (`src/components/ui/`)
  - Button (primary, secondary, ghost, outline variants)
  - Card (default, glass, elevated variants)
  - Badge (default, accent, outline, success, warning)
  - Rating (progress bar + star rating)
  - Skeleton (loading states)
  - OptimizedImage (TMDB image wrapper)
- [x] Animated components (`src/components/features/`)
  - ParallaxHero (scroll-linked background)
  - FadeInSection (scroll-triggered reveal)
  - StaggerChildren (staggered animations)
  - TextReveal (word-by-word reveal)
  - CharacterReveal (character-by-character)
  - AnimatedCounter (counting animation)
  - AnimatedPercentage (circular progress)

### Phase 5: Page Implementation
- [x] Hero section with parallax backdrop
- [x] Ratings section with animated counters (TMDB, MDL, IMDb)
- [x] Cast section with horizontal scroll carousel
- [x] Episodes section with expandable cards
- [x] Footer with TMDB attribution
- [x] Mock data for development without API token

### Phase 6: Testing
- [x] 37 unit tests passing
  - Button component tests
  - Badge component tests
  - Config/shows tests
  - Config/index tests (image URL helpers)
- [x] E2E test file created with 9 test cases

---

## Remaining Tasks 📋

### Phase 7: Authentication & Like/Watched System
- [ ] **Set up Vercel Postgres database**
  - Create database in Vercel dashboard
  - Get connection strings
- [ ] **Install Auth.js dependencies**
  ```bash
  bun add next-auth@beta @auth/drizzle-adapter drizzle-orm postgres
  bun add -D drizzle-kit
  ```
- [ ] **Create OAuth apps**
  - Google: https://console.cloud.google.com → OAuth 2.0 credentials
  - GitHub: https://github.com/settings/developers → New OAuth App
- [ ] **Configure Auth.js**
  - Create `src/app/api/auth/[...nextauth]/route.ts`
  - Create `src/lib/auth.ts` with providers
  - Create Drizzle schema for users, accounts, sessions
- [ ] **Build user preferences API**
  - `POST /api/user/shows/[id]/like`
  - `POST /api/user/shows/[id]/watched`
  - `GET /api/user/shows`
- [ ] **Create like/watched UI**
  - Heart button with animation
  - "Add to Watchlist" toggle
  - Login prompt for unauthenticated users
  - User profile dropdown

### Phase 8: E2E Testing
- [ ] Run E2E tests with Playwright
  ```bash
  bun run test:e2e
  ```
- [ ] Add more E2E test cases for interactions
- [ ] Test mobile responsiveness

### Phase 9: Deployment
- [ ] **Get TMDB API token**
  1. Go to https://www.themoviedb.org/signup
  2. Create account and verify email
  3. Go to Settings → API → Create → Developer
  4. Copy API Read Access Token (v4 auth)
- [ ] **Deploy to Vercel**
  ```bash
  vercel
  ```
- [ ] Configure environment variables in Vercel:
  - `TMDB_API_TOKEN`
  - `AUTH_SECRET` (generate with `openssl rand -base64 32`)
  - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`
  - `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`
  - Postgres connection strings (auto-set by Vercel)
- [ ] Verify production deployment
- [ ] Test ISR revalidation

---

## Quick Commands

```bash
# Development
bun run dev

# Build
bun run build

# Testing
bun run test        # Unit tests (watch)
bun run test:run    # Unit tests (once)
bun run test:e2e    # E2E tests

# Linting
bun run lint
```

---

## File Structure

```
moving-pictures/
├── src/
│   ├── app/
│   │   ├── api/shows/          # API routes
│   │   ├── globals.css         # Theme & design tokens
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── features/           # Animated components
│   │   ├── sections/           # Page sections
│   │   └── ui/                 # Base components
│   ├── config/                 # Show registry & constants
│   ├── lib/
│   │   ├── mdl/               # MyDramaList scraper
│   │   ├── shows/             # Show service
│   │   └── tmdb/              # TMDB API client
│   ├── types/                 # TypeScript types
│   └── test/                  # Test setup
├── e2e/                       # Playwright tests
├── .env.example               # Environment template
├── .env.local                 # Local environment (not committed)
├── original-prompt.md         # Original requirements
└── PROGRESS.md               # This file
```

---

## Environment Variables Needed

```env
# Required for API data
TMDB_API_TOKEN=your_tmdb_v4_token

# Required for authentication (Phase 7)
AUTH_SECRET=generate_with_openssl_rand_base64_32
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GITHUB_ID=your_github_app_id
AUTH_GITHUB_SECRET=your_github_app_secret

# Auto-set by Vercel Postgres
POSTGRES_URL=...
POSTGRES_PRISMA_URL=...
POSTGRES_URL_NON_POOLING=...
```

---

## Speed and Love (双轨) Data

| Field | Value |
|-------|-------|
| TMDB ID | 279041 |
| MDL Slug | 760405-shuang-gui |
| IMDb ID | tt36596644 |
| Episodes | 29 |
| Runtime | 45 min |
| Network | iQIYI |
| Air Dates | Dec 12-22, 2025 |
| Cast | Yu Shuxin, He Yu, Fei Qiming, Mike Angelo |

---

## Notes for Next Session

1. The app currently uses **mock data** (`src/lib/mock-data.ts`) because no real TMDB token is configured
2. When you add a real TMDB token, update `src/app/page.tsx` to fetch from the API instead of using mock data
3. The Auth.js setup requires:
   - Creating a Vercel Postgres database first
   - Setting up OAuth apps in Google and GitHub
   - Running Drizzle migrations
4. Multi-show architecture is ready - just add more shows to `src/config/shows.ts`
