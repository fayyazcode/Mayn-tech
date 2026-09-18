# Mayn Technologies — Next.js

Production build of the Mayn Technologies website: Next.js 15 App Router, React 19,
TypeScript, Tailwind CSS v4, GSAP, Framer Motion, Lenis, MongoDB and Mongoose.

## Running it

```bash
npm install
cp .env.example .env   # then paste your MongoDB connection string
npm run dev            # http://localhost:3000
```

There is no migration step. Mongoose creates the `enquiries` collection and its
indexes on first write. A free MongoDB Atlas cluster is enough to start: create
one, add a database user, allow your IP (or 0.0.0.0/0 for a hosted deployment),
then copy the connection string into `MONGODB_URI`.

Production:

```bash
npm run build
npm start
```

## Structure

```
app/                 routes (App Router), API handler, sitemap, robots, error + loading states
components/          Header, Footer, SmoothScroll
components/sections/ Hero, Climb, WorkGrid, Faq, ContactForm, Cta
components/ui/       Button, Section, Reveal
lib/                 site config, typed content, mongo connection, models, zod schemas
services/            enquiry persistence and notification
hooks/               useReducedMotion
types/               shared TypeScript types
public/              logo, photograph, portfolio artwork
```

Server Components are the default. Only five components opt into the client:
`Header`, `SmoothScroll`, `Hero`, `Climb`, `WorkGrid`, `Faq` and `ContactForm` —
each because it needs scroll position, animation or form state.

## Animation

| Library | Used for |
| --- | --- |
| GSAP + ScrollTrigger | Hero entrance timeline, hero parallax, the scroll-linked ridge in `Climb` |
| Framer Motion | Mobile menu, work-grid filtering and layout, FAQ accordion, form status, `Reveal` |
| Lenis | Smooth scrolling, sharing one RAF loop with GSAP's ticker |

Nothing is animated twice by two libraries. Every animation is skipped when the
visitor has `prefers-reduced-motion: reduce` set — `SmoothScroll` never starts Lenis,
and `Climb` paints its finished state instead of scrubbing.

## Backend

`POST /api/enquiry`

1. Rate limit — 5 requests per IP per minute.
2. Validate with zod; field errors return 422 and render beside the inputs.
3. Honeypot field: if filled, respond 200 and store nothing.
4. Persist through Mongoose, on a connection cached across invocations.
5. Optionally forward by email (Resend) — a failure there is logged, never lost.
6. IP is stored as a truncated SHA-256 hash, not in the clear.

The connection is cached on `globalThis`, so hot reloads in development and
concurrent serverless invocations in production reuse one pool rather than
opening a new one per request.

## Hydration

Two rules this codebase follows, both causes of the common
"server rendered HTML didn't match the client" error:

- `Reveal` takes an `as` prop. A `<div>` is invalid inside `<ul>` or `<ol>`, and
  the browser silently relocates it during parsing, so the DOM no longer matches
  React's tree. Inside a list, always `as="li"`.
- Nothing time-dependent or random runs in the render path of a Client Component.
  `Date.now()` appears only inside a scroll handler; the footer year is rendered
  server-side only.

`<html>` carries `suppressHydrationWarning` to tolerate attributes injected by
browser extensions. It does not hide mismatches in our own markup.

## Still to fill in

- `[YOUR NAME]` and `/public/assets/founder.jpg` in `app/about/page.tsx`
- Social handles and the Calendly link in `lib/site.ts`
- `RESEND_API_KEY` in `.env` if you want email forwarding

## Database troubleshooting

Visit **`/api/health/db`** on the deployed site. It reports whether the database is
reachable, which configuration source it used, and a specific hint when it fails.
It returns no credentials, so it is safe to open in a browser.

Common causes, in the order they usually bite:

| Symptom | Cause | Fix |
| --- | --- | --- |
| `No database configuration found` | Env vars named differently, or not loaded into the Node process | Names must match exactly. Restart the app after saving — most panels do not hot-reload env vars |
| `querySrv ENOTFOUND` / `ESERVFAIL` | Host blocks SRV DNS lookups, which `mongodb+srv://` requires | Use the non-SRV string: Atlas → Connect → Drivers → "Node.js 2.2.12 or earlier" |
| `Server selection timed out` | Atlas is refusing the host's IP, or port 27017 is blocked outbound | Add `0.0.0.0/0` in Atlas → Network Access. Then confirm the host permits outbound 27017 |
| `Authentication failed` | Wrong user, or special characters in the password | The app URL-encodes `DB_PASS`. If using `MONGODB_URI`, encode it yourself |
| Works locally, fails deployed | Your home IP is allowlisted, the server's is not | Same fix: `0.0.0.0/0` |

Shared Node hosting frequently blocks outbound database ports altogether. If the
health endpoint reports a timeout and Atlas shows `0.0.0.0/0`, the host is the
problem and no code change will solve it.

## Hosting

This is a Node application. It will **not** run on cPanel shared hosting.
Deploy to Vercel, Netlify, Railway or any Node host. See the notes accompanying
this build for the static-export alternative.
