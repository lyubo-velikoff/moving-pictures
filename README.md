# Moving Pictures

A stunning, theatrical TV show showcase website featuring **Speed and Love** (双轨) - a 2025 Chinese action romance drama. Built with Next.js 16, Framer Motion, and real data from TMDB and MyDramaList.

## Features

- **Dramatic Animations** - Full-screen parallax hero, scroll-triggered reveals, animated counters
- **Multi-source Ratings** - Aggregated ratings from TMDB, MyDramaList, and IMDb
- **Episode Guide** - Complete episode breakdown with expandable synopses
- **Cast Gallery** - Horizontal scroll carousel with hover effects
- **Dark Cinematic Theme** - Racing-inspired color palette with glassmorphism effects
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Type-safe** - Written in TypeScript with strict typing
- **Tested** - Unit tests with Vitest, E2E tests with Playwright

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Data Sources**: TMDB API + MyDramaList scraping
- **Testing**: Vitest + React Testing Library + Playwright
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0 or later
- [Node.js](https://nodejs.org/) 18 or later (for some dependencies)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lyubo-velikoff/moving-pictures.git
   cd moving-pictures
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Get a TMDB API token:
   - Go to https://www.themoviedb.org/signup
   - Create an account and verify email
   - Go to Settings → API → Create → Developer
   - Fill application details (Personal/Educational use)
   - Copy API Read Access Token (v4 auth)
   - Add to `.env.local`: `TMDB_API_TOKEN=your_token`

5. Start the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run test         # Run unit tests (watch mode)
bun run test:run     # Run unit tests once
bun run test:e2e     # Run E2E tests
bun run test:e2e:ui  # Run E2E tests with UI
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   └── page.tsx        # Home page
├── components/
│   ├── features/       # Animated components
│   ├── sections/       # Page sections
│   └── ui/             # Base UI components
├── config/             # Configuration & show registry
├── lib/                # Utilities
│   ├── mdl/           # MyDramaList scraper
│   ├── shows/         # Show service
│   └── tmdb/          # TMDB API client
├── types/              # TypeScript types
└── test/               # Test utilities
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_TOKEN` | TMDB API Read Access Token (v4) | Yes |
| `AUTH_SECRET` | Auth.js secret key | For auth features |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | For Google login |
| `AUTH_GOOGLE_SECRET` | Google OAuth secret | For Google login |
| `AUTH_GITHUB_ID` | GitHub OAuth app ID | For GitHub login |
| `AUTH_GITHUB_SECRET` | GitHub OAuth secret | For GitHub login |

## Data Sources

- **[TMDB](https://www.themoviedb.org/)**: Show details, cast, episodes, images, trailers
- **[MyDramaList](https://mydramalist.com/)**: Asian drama ratings and scores

This product uses the TMDB API but is not endorsed or certified by TMDB.

## About Speed and Love (双轨)

- **Genre**: Action, Romance, Drama
- **Episodes**: 29 (45 min each)
- **Network**: iQIYI
- **Cast**: Yu Shuxin (Esther Yu), He Yu, Fei Qiming, Mike Angelo

After her parents' divorce separates her from her beloved adopted brother, a young woman moves to Thailand to find him, discovering he's now a street racer and underground fighter.

## License

MIT
