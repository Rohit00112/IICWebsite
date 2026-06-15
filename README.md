# Itahari International College (IIC) Website

Marketing and admissions site for Itahari International College, built with Next.js 16 (App Router), React 19, MongoDB, and Tailwind CSS 4. Includes a public marketing surface (Home, About, Courses, Admissions, News, Contact, Life at Itahari International College) plus an authenticated `/admin` panel for managing news and courses.

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router, server components)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 4, Framer Motion, anime.js
- **3D / FX:** three.js + @react-three/fiber + drei (`TechGrid`, etc.)
- **Smooth scroll:** Lenis
- **Database:** MongoDB via Mongoose 9
- **Auth:** JWT (`jose`) + bcryptjs + authenticator-app TOTP 2FA
- **Validation / Sanitization:** Zod, isomorphic-dompurify
- **Rich text:** react-quill-new (admin), react-markdown + rehype-raw + remark-gfm (rendering)

## Project Layout

```
app/
  api/                # REST endpoints (auth, courses, news, og)
  admin/              # Authenticated admin UI (news + courses CRUD)
  about-us/ admissions/ contact/ courses/ life-at-iic/ news/ login/
  layout.tsx page.tsx error.tsx not-found.tsx loading.tsx
  robots.ts sitemap.ts
components/
  effects/            # Tilt, Magnetic, ParticleBackground, TechGrid, RevealText, AnimeReveal, AnimeStagger
  layout/             # Navbar, Footer, etc.
  sections/           # Page sections (home, admissions, news, ...)
  admin/ common/
lib/
  auth.ts db.ts courses.ts news.ts rate-limit.ts sanitize.ts validations/
models/               # Mongoose models: Admin, Course, News
data/                 # Seed JSON for courses & news
scripts/seed.ts       # Seed script (DB + admin user)
public/               # Static assets (images, fonts, icons)
proxy.ts              # Edge proxy / middleware helper
```

## Prerequisites

- Node.js 20+ (or Bun — `bun.lock` is committed)
- A MongoDB cluster (Atlas or local)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

2. Create `.env.local` in the project root:

   ```env
   MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/iic_website
   JWT_SECRET=<long-random-string>
   TWO_FACTOR_ENCRYPTION_KEY=<separate-long-random-string>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Generate the two auth secrets independently, for example with
   `openssl rand -base64 32`. Keep `TWO_FACTOR_ENCRYPTION_KEY` stable after
   admins enroll, because it encrypts their authenticator secrets and protects
   recovery-code hashes.

3. (Optional) Seed the database with initial news, courses, and an admin user:

   ```bash
   npx tsx scripts/seed.ts
   ```

   > Note: `scripts/seed.ts` currently contains a hardcoded `MONGODB_URI` constant — replace it with `process.env.MONGODB_URI` before running in any shared environment, and rotate the embedded credential.

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Admin Panel

- Route: `/login` → `/admin`
- Backed by `models/Admin.ts` with bcrypt-hashed passwords.
- JWT issued by `lib/auth.ts`; verified in `proxy.ts` / API routes.
- Admins can enroll an authenticator app at `/admin/security`.
- Enabled accounts complete a short-lived 2FA challenge before a session is issued.
- Recovery codes are shown once, stored as keyed hashes, and consumed after use.

## Notes on This Next.js Build

This project pins **Next.js 16.2** with React 19. APIs, file conventions, and some hooks differ from older training data. Before changing routing, server actions, caching, or metadata behavior, consult the local docs at `node_modules/next/dist/docs/` to avoid drift.

## Deployment

Deployable to any Node 20+ host (Vercel, Fly, self-hosted). Set `MONGODB_URI`, `JWT_SECRET`, `TWO_FACTOR_ENCRYPTION_KEY`, and `NEXT_PUBLIC_SITE_URL` in the platform's environment variables.

### GitLab CI/CD

The GitLab pipeline builds every commit and deploys the default branch to
`deploy@192.168.20.145:/home/deploy/apps/iic` with Docker Compose.

Configure these protected GitLab CI/CD variables:

- `SSH_PRIVATE_KEY`: File-type variable containing the deploy user's private key.
- `SSH_KNOWN_HOSTS`: File-type variable containing the server's trusted host key.
- `MONGODB_URI`
- `JWT_SECRET`
- `TWO_FACTOR_ENCRYPTION_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional)
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (optional)

The deploy server must have Docker Engine, Docker Compose, and the deploy user's
public SSH key installed. The application is exposed on port `3000`.
