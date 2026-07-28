# Portfolio Redesign — Implementation Plan

## Confirmed decisions

- **Stack**: Full gpt-taste stack — Tailwind + GSAP + Cabinet Grotesk + inline SVGs (no icon lib, `@phosphor-icons/react` is React-only and we're on Vue).
- **Scope**: All three pages (index, work, contact) + layout + components.
- **WaveLab placement**: New bento card on `/work` — separate from existing private `WaveLab Station` card. Focus: AI/ML research role at WaveLab.
- **Font**: Cabinet Grotesk (Fontshare CDN).
- **Hero copy**: Name-first. H1 = "Resonance". Sub = "Developer & AI/ML researcher, currently building at WaveLab" + inline-image pill linking wavelab.space.

## Stack delta

- `package.json`: remove `esm` + `jquery` (both verified unused via grep). Add `@nuxtjs/tailwindcss@^6.14.0` (already transitive via @nuxt/ui, making explicit) and `gsap@^3.13.0`. Fix `packageManager` to `pnpm@10.33.0` (was wrongly pinned to npm despite pnpm-lock.yaml).
- `nuxt.config.ts`: register `@nuxtjs/tailwindcss` module, add Cabinet Grotesk Fontshare `<link>` to `app.head.link`, update title to "Resonance — Developer & AI/ML Researcher".
- `tailwind.config.js` (new): theme colors (indigo `#3c3f58`, orange `#efa819`, cream `#ffedc0`, purple `#6d4ab1`, blue `#4253f1`, ink `#1a2230`), `fontFamily.display: ['Cabinet Grotesk', 'Barlow', 'sans-serif']`, container settings.
- `assets/css/global.css`: strip Barlow import (Cabinet Grotesk loaded via nuxt.config head link instead), keep resets + focus-visible ring.

## File-by-file changes

### `package.json`
Drop `esm`, `jquery`. Add `@nuxtjs/tailwindcss`, `gsap`. Bump `packageManager` to pnpm.

### `nuxt.config.ts`
```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: "Resonance — Developer & AI/ML Researcher",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  compatibilityDate: '2024-07-13',
});
```

### `tailwind.config.js` (new)
Theme with custom palette + Cabinet Grotesk display font.

### `layouts/default.vue`
Replace fixed top nav with floating glass pill nav:
- Centered pill, `backdrop-blur-xl`, `bg-white/5`, `border border-white/10`, `rounded-full`, top-6, left-1/2 -translate-x-1/2, z-50.
- Three links: home, work, contact. Active route gets cream pill background.
- Mobile: pill becomes hamburger trigger, full-screen overlay menu (kept existing pattern, restyled).
- Drop options-API script, use `<script setup>` with `useRoute()` for active link detection.

### `pages/index.vue` — full rewrite
Cinematic center hero (per gpt-taste hero architecture #1):
- `<main className="overflow-x-hidden w-full max-w-full">` wrapper.
- Section 1 (Attention): full viewport, dark radial wash bg (`bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.900),theme(colors.ink))]`), grainy overlay.
- H1 `Resonance` in `max-w-5xl`, `clamp(3rem, 9vw, 9rem)`, Cabinet Grotesk 900, cream color. Fits 1-2 lines.
- Sub: "Developer & AI/ML researcher, currently building at " + inline-image pill (`<a href="https://wavelab.space">WaveLab</a>` styled as pill with `bg-cover` thumbnail).
- Two CTAs: "See work" (cream bg, indigo text → `/work`) + "Get in touch" (outline, cream border → `/contact`). Both pass AA contrast.
- Drop parallax lib entirely (no longer needed).
- GSAP: hero text reveal on mount — split H1 into chars, stagger fade-up.
- Section 2 (Interest): mini-bento preview of 3 featured projects, gapless `grid-flow-dense`, hover scale-105.
- Section 3 (Desire): GSAP scrub-reveal paragraph — "Currently building AI/ML systems at WaveLab — turning charging infrastructure into a smart, connected platform that generates value." Words scrub from opacity 0.1 → 1.0 on scroll.
- Section 4 (Action): massive CTA "Let's build something" + arrow → `/contact`.

### `pages/work.vue` — full rewrite
- Hero: minimal, big "Work" word + count (e.g. "8 projects").
- Bento grid (4-col × 3-row, `grid-flow-dense`):
  - Card A `col-span-2 row-span-2`: WaveLab AI/ML Research spotlight (new). Image, role tag, scraped description, link to wavelab.space.
  - Card B `col-span-2 row-span-1`: AtomHR (Startup).
  - Card C `col-span-1 row-span-1`: EyeHide (Startup).
  - Card D `col-span-1 row-span-1`: Weather Component (ODH).
  - Card E `col-span-2 row-span-1`: TrashTracer.
  - Stats `col-span-2 row-span-1`: "3 startups / 2 hackathon wins / 3 ODH projects".
  - Math verified: Row1 = 2+2 = 4 ✓. Row2 = 2+1+1 = 4 ✓. Row3 = 2+2 = 4 ✓. Zero voids.
- Below bento: GSAP pinned section title left (`ScrollTrigger pin: true`), horizontal accordion right with remaining 3 projects (ODH Data Quality, WaveLab Station private, ACS Emissions). Vertical slices that expand horizontally on hover.
- Each card: `group-hover:scale-105 transition-transform duration-700 ease-out` inside `overflow-hidden`.
- Inline SVG arrow icons (no icon lib).
- Wrap page in `<main className="overflow-x-hidden w-full max-w-full">`.

### `pages/contact.vue`
- Keep split layout + custom cursor bubble (delightful, preserve).
- Restyle with Tailwind palette: left indigo, right cream. Cabinet Grotesk for headings.
- Headings: "GET IN TOUCH" → "Let's talk" (drop cheap meta-label feel).
- Mail + GitHub links kept.
- Wrap in `<main className="overflow-x-hidden w-full max-w-full">`.

### `components/project.vue`
- Add variant prop: `variant="bento" | "accordion" | "default"`.
- Bento variant: image header, role tag, description, link. Rounded-2xl, overflow-hidden, hover scale.
- Accordion variant: thin vertical slice, expands on hover to reveal content + image.
- Default variant: keep existing layout for backwards compat (unused after rewrite, but kept for safety).

### `components/loadingBar.vue`
- Keep cookie-gated logic.
- Restyle palette to match: indigo bg, cream→orange gradient bar, Cabinet Grotesk text.

### `composables/useIntersectionObserver.js`
- Keep as-is. GSAP supplements for pin/scrub only.

## New WaveLab bento card copy

> **WaveLab** — AI/ML Research
>
> Smart EV charging platform. Currently leading AI/ML research: turning charging infrastructure into a smart, connected platform that generates value. Connect → Activate → Grow.
>
> Trusted by CDP, ELIS, NOI Techpark, Plug and Play.
>
> → wavelab.space

## Verification steps (run when implementation done)

1. `pnpm install` — lockfile updates, no errors.
2. `pnpm dev` — smoke check all 3 routes (/, /work, /contact), confirm no console errors, GSAP animations fire, bento grid has no voids, no horizontal scrollbar.
3. `pnpm build` — confirms prod build clean.
4. `rg "jquery|esm" --type-add 'vue:*.vue' -tvue -tjs -tts` — confirm no lingering refs after dep removal.
5. Manual: hover each bento card (scale-105 works), click each CTA (correct route), mobile width (768px) hamburger works, accordion expands on hover.

## Ponytail notes

- `ponytail: @nuxtjs/tailwindcss already transitive via @nuxt/ui — explicit dep for stability, no extra install cost`.
- `ponytail: inline SVGs replace Phosphor — gpt-taste skill said @phosphor-icons/react but we're on Vue, skip the icon lib entirely`.
- `ponytail: @gsap/react is React-only, using gsap directly in onMounted — one dep instead of two`.
- `ponytail: parallax lib dropped — GSAP covers motion, one fewer CDN script`.
- `ponytail: existing useIntersectionObserver kept — GSAP only adds pin/scrub, no duplicate observer`.

## Out of scope (explicitly skipped)

- No new pages (about, blog, etc.) — YAGNI.
- No CMS integration — static data in work.vue array, same as today.
- No analytics — not requested.
- No i18n — single language.
- No tests — portfolio site, visual inspection suffices. Will add `__main__`-style smoke check only if logic warrants (none here, pure UI).

## Roll-forward plan

After plan mode lifts:
1. Write `package.json` (drop esm/jquery, add tailwind/gsap, fix packageManager).
2. Run `pnpm install`.
3. Write `nuxt.config.ts`, `tailwind.config.js`, `assets/css/global.css`.
4. Write `layouts/default.vue`, `pages/index.vue`, `pages/work.vue`, `pages/contact.vue`, `components/project.vue`, `components/loadingBar.vue`.
5. Run `pnpm dev` + `pnpm build` to verify.
6. Report results.
