# Global Tech Byte — Corporate Website

Marketing site for Global Tech Byte Private Limited, built with React, TypeScript, Vite, Tailwind CSS and Motion for React.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build   # type-checks and produces dist/
npm run preview # serve the production build locally
```

## Project structure

- `src/pages` — routed pages (Home, About, Services, Work, Careers, Internships, Contact, legal pages, 404)
- `src/components/sections` — homepage section blocks (Hero, Services, Process, etc.)
- `src/components/layout` — Header, Footer, custom cursor, scroll progress, back-to-top
- `src/components/ui` — shared building blocks (Button, form fields, PageHero, Reveal, JobCard)
- `src/data` — configurable content: services, process steps, solution concepts, highlights, advantages, job listings
- `src/lib/site.ts` — company contact details and navigation config

## Configuration notes

- **Contact / Internship forms** submit through [Web3Forms](https://web3forms.com) (a hosted form backend — no custom server needed). To enable it:
  1. Sign up at [web3forms.com](https://web3forms.com) (free) and copy your access key.
  2. Copy `.env.example` to `.env` and fill in:
     ```
     VITE_WEB3FORMS_ACCESS_KEY=your_access_key
     ```
  3. Restart `npm run dev` (Vite only reads `.env` at startup).

  One access key covers both forms — Web3Forms differentiates submissions by the `subject` line each form sends ("Project Enquiry - ..." vs "Internship Enquiry - ..."). Until the key is set — or if the Web3Forms request fails for any reason — both forms automatically fall back to opening the visitor's email client with the enquiry pre-filled, addressed to `info@globaltechbyte.com`, so no enquiry is silently lost. That fallback logic lives in `src/lib/web3forms.ts` (`submitToWeb3Forms`) and `src/lib/mailto.ts` (`buildMailto`).
- **Careers page** (`src/data/jobs.ts`) ships with an empty job list by design — no fictional openings are included. Add real, published vacancies to that file to populate the page; the page shows an elegant empty state otherwise.
- **Work / solutions page** (`src/data/solutions.ts`) shows solution *concepts*, not real client case studies, since no verified client project data was available. Replace with real case studies when available.
- **Company statistics** (years of experience, client counts, etc.) were intentionally omitted from the highlights section since no verified figures were provided — only qualitative, defensible claims are shown.
- **Hero, product showcase, and solution card visuals** use licensed imagery supplied for the project (`public/images/`, `public/brand/`), not fabricated photos of specific staff.
- Canonical domain is confirmed as `https://www.globaltechbyte.com` (with `www`) — used consistently across canonical tags, OG/Twitter URLs, structured data, `robots.txt` and `sitemap.xml`. If it ever changes, update `SITE_URL` in `src/lib/seo.ts` (everything derives from that one constant) plus `index.html`'s static defaults and `public/robots.txt` / `public/sitemap.xml` by hand, since those aren't generated from it. At the DNS/hosting level, make sure the non-`www` host and any `http://` requests redirect to `https://www.globaltechbyte.com`.

## SEO

- **Per-page metadata** (title, description, canonical, OG/Twitter tags, robots) is set by `usePageMeta` (`src/hooks/usePageMeta.ts`), called once per page in `src/pages/*.tsx`. It's applied client-side on mount — see "Known limitation" below.
- **Structured data (JSON-LD)**: `Organization` + `WebSite` are static in `index.html` (present on every route). Page-specific schema (`BreadcrumbList`, a `Service` list on `/services`, `JobPosting` on `/careers`) is injected via `useStructuredData` (`src/hooks/useStructuredData.ts`). `JobPosting` schema only appears for jobs in `src/data/jobs.ts` that have a real `datePosted` set — never fabricated.
- **Sitemap / robots**: `public/sitemap.xml` and `public/robots.txt` are static files, not generated — update `sitemap.xml` by hand if routes are added/removed.
- **Known limitation — this is a client-rendered SPA (no server-side rendering/prerendering)**: Googlebot executes JavaScript and will see each page's correct title/description/canonical/structured data. However, crawlers that *don't* execute JS — link-preview bots for WhatsApp, Slack, X/Twitter, LinkedIn, Facebook, etc. — only ever see the default homepage metadata baked into `index.html`, regardless of which page's link is shared. Full prerendering wasn't implemented here because this project makes heavy use of browser-only APIs (Framer Motion's scroll/viewport hooks, `matchMedia` for the custom cursor and reduced-motion handling) throughout nearly every component; retrofitting SSR/SSG safely would need substantial per-component guarding and testing to avoid breaking the animations, which was out of scope for an SEO-only pass. If accurate link previews for shared inner pages become important, the next step is either (a) a hosting-level prerendering feature (e.g. a service worker/edge function that serves pre-rendered HTML to known bot user-agents) once a host is chosen, or (b) a dedicated SSR/SSG migration project.
- **Google Search Console**: not connected (would need a real domain + verification, which wasn't performed). To set up after deployment: verify domain ownership (DNS TXT record or the HTML meta-tag method — add the tag to `index.html`'s `<head>`), submit `https://www.globaltechbyte.com/sitemap.xml` under Sitemaps, then use URL Inspection on key pages to confirm they're indexable.
- **GA4**: not installed (no measurement ID was provided, and credentials weren't added without authorization). Conversion event calls are already wired at the right places via `trackEvent()` (`src/lib/analytics.ts`) — `project_enquiry_submit`, `internship_enquiry_submit`, `phone_click`, `email_click`, `whatsapp_click`, `career_application_click`. It's a no-op until a GA4 script tag (`gtag.js`) is added to `index.html`'s `<head>`; once that's in place these events start firing with no other code changes. No personal form data is ever passed into an event.
