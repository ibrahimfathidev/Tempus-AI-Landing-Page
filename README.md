# Tempus AI — Animated Landing Page

React + TypeScript + Vite landing page for Tempus AI.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview
```

Deploy `dist/` to Vercel/Netlify, or import the repo (framework preset: Vite).

## What's inside

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Page layout: nav, marquee, features, how-it-works, demo, stats, FAQ, CTA, footer |
| `src/components/Hero.tsx` | Hero with rotating headline, orbs and the avatar |
| `src/components/Avatar3D.tsx` | 3D rigged avatar (`public/models/sign-avatar-woman.glb`) with wave / nod / spin. Falls back to the sticker character if WebGL or the model fails |
| `src/components/Mascot.tsx` | Animated sticker character (floating, mouse parallax, speech bubbles) |
| `src/components/Stress.tsx`, `Demo.tsx`, `Faq.tsx`, `Logo.tsx` | Sections |
| `src/lib/reveal.tsx` | Scroll-reveal and count-up helpers |
| `src/data.ts` | Features, steps, flashcards, FAQ copy |
| `src/assets.ts` | Asset paths and the app URL (`APP_URL`) — change it to your own sign-in/app URL |
| `src/styles.css` | All styles, light/dark theme tokens, animations (respects `prefers-reduced-motion`) |
| `public/brand`, `public/stickers`, `public/models` | Logo, sticker art, 3D model |

## Notes

- All CTA buttons point to `APP_URL` in `src/assets.ts`.
- The avatar is an experimental prototype: wave/nod/spin are generic gestures, not verified signs. To use real signing, reuse `sign-engine.js` and `sign-fingerspell.js` from the main Tempus project.
- Components use `React.createElement` (`h(...)`) rather than JSX, apart from `Avatar3D.tsx`; behaviour is identical.
- The GLB is ~13 MB; consider compressing it (gltf-transform / Draco) for production.
