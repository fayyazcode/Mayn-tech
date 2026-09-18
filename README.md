# Mayn Technologies — Next.js

Production build of the Mayn Technologies website: Next.js 15 App Router, React 19,
TypeScript, Tailwind CSS v4, GSAP, Framer Motion and Lenis. No database, no server-side code.

## Running it

```bash
npm install
cp .env.example .env   # then paste your form provider key
npm run dev            # http://localhost:3000
```


Production:

```bash
npm run build
npm start
```

## Structure

```
app/                 routes (App Router), sitemap, robots, error + loading states
components/          Header, Footer, SmoothScroll
components/sections/ Hero, Climb, WorkGrid, Faq, ContactForm, Cta
components/ui/       Button, Section, Reveal
lib/                 site config, typed content, zod schemas
services/            browser-side form submission
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

## The contact form

There is no backend. The form validates with zod in the browser, then posts
directly to a form service, which emails the enquiry to you.

1. Client-side validation; field errors render beside the inputs.
2. Honeypot field: if filled, the form reports success and sends nothing.
3. `POST` to Web3Forms or Formspree, whichever key is set.
4. Success and failure states are shown inline, with the phone number offered
   on failure so an enquiry is never simply lost.

The Web3Forms key is already set in `services/sendEnquiry.ts`, so the form works
out of the box. Enquiries arrive at the address registered with that key.

To rotate it, or to switch provider, set either variable in `.env` and it takes
precedence over the key in code:

```
NEXT_PUBLIC_WEB3FORMS_KEY="..."
NEXT_PUBLIC_FORMSPREE_ENDPOINT="..."
```

Both are public by design and appear in the page source. Lock them to your
domain in the provider dashboard. **Never** put a Resend, SendGrid or SMTP
credential in a `NEXT_PUBLIC_` variable — it ships to every visitor.

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

## Hosting

Two options, both fine:

**Node host (Vercel, Netlify, Railway, GoDaddy Node):**

```bash
npm run build && npm start
```

**Static HTML — runs anywhere, including cPanel shared hosting:**

```bash
npm run build:static
```

Upload the contents of `out/` to `public_html`. Nothing server-side remains in
this build, so the static export loses no functionality at all.
