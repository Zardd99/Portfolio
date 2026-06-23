# Sakda Chin — Portfolio

A **cinematic, scroll-driven personal portfolio** — a single-page experience with a 3D WebGL hero, smooth scrolling, pinned scroll-storytelling, and a lot of playful micro-interactions. Built to showcase my work as a front-end engineer.

**Live:** [portfolio-one-orpin-30.vercel.app](https://portfolio-one-orpin-30.vercel.app)

---

## Tech Stack

| Area          | Tech                                                   |
| ------------- | ------------------------------------------------------ |
| Framework     | Next.js 15 (App Router) + React 19 + TypeScript        |
| Styling       | Tailwind CSS v4                                        |
| Animation     | GSAP 3 (ScrollTrigger, Flip) + `@gsap/react`           |
| Smooth scroll | Lenis 1                                                |
| 3D            | Three.js (lazy-loaded, `dynamic(..., { ssr: false })`) |
| Email         | EmailJS (via an API route) + Axios                     |
| Icons         | lucide-react                                           |

**Design language:** near-black `#0A0A0B` background, bone-white `#F5F5F3` text, and **acid-lime `#CBFF47`** as the single accent. Bebas Neue for oversized display type; a monospace "HUD" font for technical labels (`■ NN / Label`, `// SECTION`).

---

## Highlights

- **3D particle hero** — a Three.js Fibonacci-sphere particle cloud + wireframe icosahedron behind a giant `SAKDA CHIN.` wordmark. The name tilts to face your cursor, and the individual letters **part to clear a path** as the cursor passes through them.
- **Smooth, scroll-driven sections** — Lenis + GSAP ScrollTrigger drive every reveal.
- **About** — sound-wave equalizer skill bars, counting stats, and an **interactive 3D profile card** you can grab and rotate (flip it to read the dossier on the back, then "put it back"). The toolkit chips are **drag-to-rearrange**.
- **Projects** — a pinned, scrubbed **3D depth stack**; the flagship project leads with a `★ FLAGSHIP` badge, and the live-demo buttons are magnetic.
- **Footer** — a pinned reveal where the opaque detail panel slides up to uncover a giant name that fills the screen (and "swallows" the navbar). Hidden in it: a roaming **`▶ ARCADE`** button that chases your cursor, dodges the other links, and taunts you if you miss-click it.
- **Custom cursor, terminal preloader, scramble-text, and an in-navbar scroll-progress bar.**
- **`/play`** — a small **experimental minigame** (canvas Snake, HUD-themed).

---

## Project Structure

```text
app/
├── page.tsx                 # composes the single-page experience
├── projects/page.tsx        # standalone /projects route
├── play/page.tsx            # /play — experimental Snake minigame
├── api/send-email/route.ts  # contact form → EmailJS
├── components/              # Hero, About, Projects, Contact, Footer(Reveal),
│                            #   Navbar, Cursor, Preloader, SmoothScroll,
│                            #   ParticleField, ProfileCard, Toolkit, SnakeGame, …
├── constants/               # hero / about / project / contact / navbar content
├── lib/scramble.ts          # shared text-scramble utility
└── globals.css              # Tailwind v4 design system + keyframes
```

Content is data-driven — edit the files in `app/constants/` to change copy, skills, projects, and contact details.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Dev server (Turbopack)     |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

### Environment variables

The contact form posts to `app/api/send-email/route.ts`, which uses **EmailJS**. Create `.env.local`:

```bash
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key   # optional (accessToken)
```

Without these, the contact form returns a clear "missing environment variables" error; the rest of the site runs fine.

---

## Notes

- Most interactions are **GSAP-driven** with `gsap.context` teardown; Three.js is lazy-loaded and fully disposed on unmount.
- Several toy interactions (toolkit chips, profile card) set `touch-action: none` so they can be dragged on touch — a finger-drag that starts on them manipulates them rather than scrolling.
- The `/play` arcade is **experimental**.

## Deploy

Deployed on [Vercel](https://vercel.com). Set the EmailJS environment variables in the Vercel project settings.
