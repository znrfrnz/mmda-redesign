# MMDA Website Redesign — Developer Tasking

**Project:** mmda.gov.ph Redesign Prototype  
**Status:** Foundation complete (layout, homepage, design system)  
**Date:** April 27, 2026

---

## What's Already Done

- [x] Project scaffolding (Next.js 16, TypeScript, Tailwind v4, shadcn/ui)
- [x] Global layout — Header, Footer, UtilityBar, MobileNav, SettingsProvider
- [x] Zustand store (dark mode, EN/FIL toggle, font size, high contrast)
- [x] EN/FIL translation dictionary (`src/lib/translations.ts`)
- [x] Mock data (`src/lib/mock-data.ts`)
- [x] Homepage — split hero with live traffic widget, advisory strip, service cards, news preview

---

## Dev 1 — Content & Information Pages

**Focus:** Pages that display content, articles, and organizational info.  
**Stack you'll touch:** mock data, markdown-style layouts, breadcrumbs, filters, share buttons.

### Task 1.1 — News & Advisories listing (`/news`)
- Route: `src/app/news/page.tsx`
- Filter tabs: All / Advisories / Press Releases / Public Notices
- Paginated card grid (use existing `mockNews` — expand to 9+ articles in `mock-data.ts`)
- Each card: category badge, date, title, excerpt
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop
- Page metadata: `<title>`, `<meta description>`

### Task 1.2 — News article detail (`/news/[slug]`)
- Route: `src/app/news/[slug]/page.tsx`
- Breadcrumbs: Home > News > Article Title
- Proper reading width (`max-w-[65ch]`)
- Article body (use hardcoded mock paragraphs per slug)
- Share buttons (copy link, X, Facebook — use Phosphor icons)
- "Back to News" link
- Page metadata with dynamic title

### Task 1.3 — About MMDA (`/about`)
- Route: `src/app/about/page.tsx`
- Sections: Mandate, Leadership (mock chairman + council), Org Chart (simple hierarchy), History timeline
- Use a clean vertical layout — no cards for text blocks, just `border-t` sections
- Leadership: name, position, photo placeholder (use `https://picsum.photos/seed/{name}/200/200`)
- Page metadata

### Task 1.4 — Search Results (`/search`)
- Route: `src/app/search/page.tsx`
- Search input at top (functional filter over mock data)
- Results grouped by type: Services, News, Pages
- Empty state when no results match
- Page metadata

### Task 1.5 — 404 + Error Pages
- `src/app/not-found.tsx` — on-brand 404 with search bar and home link
- Clean, helpful, not cute — this is a government portal

---

## Dev 2 — Interactive & Service Pages

**Focus:** Pages with forms, maps, real-time data, and interactive widgets.  
**Stack you'll touch:** react-hook-form, Zod, Leaflet, HERE API, zustand.

### Task 2.1 — Services Hub (`/services`)
- Route: `src/app/services/page.tsx`
- Grouped service cards in categories: Licensing, Violations, Assistance, Permits
- Expand `mockServices` in `mock-data.ts` to cover all service items (~8-10)
- Each card links to its detail or external placeholder
- One clear primary CTA per category group
- Page metadata

### Task 2.2 — Report a Concern Form (`/services/report-concern`)
- Route: `src/app/services/report-concern/page.tsx`
- Native form (NOT Google Forms — this is a key HCI fix)
- Fields: Name, Email, Phone, Concern Type (dropdown), Location, Description (textarea), Photo upload (mock)
- react-hook-form + Zod schema with inline validation on blur
- Proper `autocomplete` attributes on every input
- Success state on submit (client-side only, no actual POST)
- Error states: inline per field + summary
- Page metadata

### Task 2.3 — Traffic & Roads (`/traffic`)
- Route: `src/app/traffic/page.tsx`
- Top: route status cards (reuse `TrafficSnapshot` component or build new)
- Leaflet + OpenStreetMap map centered on Metro Manila (14.5995, 120.9842)
- Number Coding widget: "Enter your plate number" — shows if coding today
- Number coding logic: Mon=1/2, Tue=3/4, Wed=5/6, Thu=7/8, Fri=9/0, Sat-Sun=none
- Wrap Leaflet in `dynamic(() => import(...), { ssr: false })` to avoid SSR crash
- Page metadata

### Task 2.4 — Contact (`/contact`)
- Route: `src/app/contact/page.tsx`
- Hotline info: 136, (02) 882-4150 to 77
- Office address: MMDA Building, EDSA corner Orense St., Guadalupe Nuevo, Makati City
- Leaflet map pinned to MMDA HQ (14.5636, 121.0455)
- Contact form: Name, Email, Subject, Message — Zod validated
- Success state on submit
- Page metadata

---

## Shared Guidelines (Both Devs)

### Design Rules
- **Font:** Public Sans only (already configured via `next/font`)
- **Colors:** MMDA Blue (`--primary`, `#0054A6`) and Red (`--destructive`, `#C8102E`) at full saturation
- **Icons:** `@phosphor-icons/react` with `weight="bold"` — do not use lucide for new code
- **Components:** Use existing shadcn/ui components (`Card`, `Button`, `Badge`, `Input`, `Separator`)
- **Shadows:** Ultra-diffuse only, < 0.05 opacity
- **No gradients, no glassmorphism, no 3D effects**
- **Animations:** CSS `transition-colors`, `transition-transform` only. `:active` → `scale-[0.98]` on buttons
- **Layout:** CSS Grid over flexbox math. `max-w-7xl mx-auto` for page containers
- **Mobile:** Single-column collapse below `lg:`. Large tap targets (min 44px)

### Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- All images: meaningful `alt` text; decorative → `alt=""`
- Visible focus rings on every interactive element
- Full keyboard navigation
- ARIA labels on icon-only buttons
- WCAG AA contrast on all text

### i18n
- Use `useSettingsStore()` to get `language`
- All user-facing strings must support EN/FIL — add new keys to `src/lib/translations.ts`
- Or use inline ternary: `language === "en" ? "English" : "Filipino"`

### Code Conventions
- `"use client"` only on components that need interactivity
- File naming: PascalCase for components, kebab-case for routes
- One component per file
- No `console.log` in committed code

### Before Pushing
- Run `npm run build` — must pass with zero errors
- Test responsive layout at 375px, 768px, 1280px
- Verify EN/FIL toggle works on your page
- Verify dark mode doesn't break contrast
