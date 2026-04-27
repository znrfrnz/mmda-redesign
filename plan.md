## MMDA Website Redesign — Interactive Prototype

**Course:** Human-Computer Interaction (HCI)
**Subject:** mmda.gov.ph — Official portal of the Metropolitan Manila Development Authority

A modern, accessible, citizen-first redesign of mmda.gov.ph with a **Filipino civic identity**: clean layout, strong typography, MMDA blue/red brand colors modernized, and subtle Philippine flag accents (blue, red, gold sun). Built as a working prototype with realistic content — no real backend.

---

## About the Original Website

The MMDA website is the official government portal providing information about traffic management, flood control, waste disposal, road policies, public safety, and urban services across Metro Manila. It is intended to give citizens access to real-time traffic updates, road advisories, and online government services.

---

## HCI Problems Identified

### Problem #1 – Navigation Problem
- Cluttered navigation bar with too many categories and dropdowns, no logical grouping or visual separation.
- Hover-triggered dropdowns that are overly sensitive — mouse slips by a few pixels and the menu disappears.
- Search bar is not prominently placed or centered, forcing users to rely on the chaotic menu structure.

### Problem #2 – Cluttered Layout
- Homepage has too many elements (hero, links, menus, banners) crammed together with no breathing room.
- Lack of white space increases cognitive load — the brain works harder just to parse the page.
- Multiple buttons and banners with the same color and size — no clear primary action hierarchy.

### Problem #3 – No Visual Hierarchy and Inconsistent Typography
- All sections have equal visual weight; important advisories compete with trivial content.
- Multiple typefaces, inconsistent font sizes, and inconsistent layout across pages and sections.
- Gradients, heavy shadows, and low-resolution icons create a trust gap (old look = feels less secure).
- Text overlays on banners lack sufficient contrast ratios — hard to read against busy backgrounds.

### Problem #4 – Poor Organization of Information
- Related sections are not grouped properly — users navigate through multiple pages unnecessarily.
- Menu links open in new tabs automatically, breaking the Back button mental model and causing tab proliferation.
- Tables and traffic maps do not scale properly on mobile — users must pinch-zoom to read critical updates.

### Problem #5 – Lack of Accessibility Features
- Images lack descriptive alt text, excluding screen reader users.
- Inconsistent typography reduces readability for users with visual or cognitive impairments.
- Interactive elements (dropdowns) are not fully keyboard-navigable — motor-impaired users are locked out.
- EN/FIL language toggle is non-existent or inconsistent across deeper pages.

### Problem #6 – Reliance on External Third-Party Forms
- Critical services redirect to Google Forms (forms.gle/...) or Bitly short links.
- Sending users to third-party sites for personal data (e.g., Driver's License numbers) feels untrustworthy.
- Breaks the secure, branded government ecosystem expected of an official portal.

### Problem #7 – Outdated Social Branding & Terminology
- CTA text says "Follow us on Twitter" while the icon section already uses the updated X logo.
- Inconsistency on the same page undermines content maintenance credibility.

### Problem #8 – Poor Form Design & Data Entry
- Forms lack inline validation — errors only appear after submit + full page reload.
- Forms are not optimized for browser autofill, making repeated use tedious.

---

## Tech Stack (decided)

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (latest stable, App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Phosphor Icons (bold weight) |
| Forms & Validation | react-hook-form + Zod |
| State / i18n | Zustand (EN/FIL toggle, dark mode) |
| Traffic API | HERE Traffic API (free tier, covers Metro Manila) |
| Map | Leaflet + OpenStreetMap |
| Fonts | Public Sans (government-standard, via next/font) |
| Deployment | Vercel |

### Design Constraints

- **No tags/badges** — status communicated through typography and color only
- **Minimal animations only** — fade-in on page load, smooth hover states, no scroll reveals or staggered cascades
- **Shadows** — ultra-diffuse only, < 0.05 opacity
- **Colors** — MMDA blue (#0054A6) and red (#C8102E) at proper saturation for brand identity, no saturated hero backgrounds
- **No gradients, no glassmorphism, no 3D effects**

---

## Design System (foundation)

- **Color palette:** MMDA blue (#0054A6, primary), MMDA red (#C8102E, accent for alerts/CTAs), gold sun yellow (sparingly for highlights), neutral grays, generous whitespace, white background. Colors used at full saturation for brand recognition — the original mmda.gov.ph identity is preserved.
- **Typography:** Inter throughout. Strict type scale — H1, H2, H3, body, caption — applied consistently across every page.
- **Iconography:** lucide-react only — monoline, consistent sizing.
- **Components:** shadcn/ui — all with WCAG AA contrast.
- **One clear primary CTA per section** (solid colored), secondary actions are outlined or text-only.
- **Dark mode** toggle + **high-contrast** mode toggle (separate).

---

## Global Layout & Navigation (fixes #1, #4, #5)

- **Top utility bar:** EN/FIL toggle (full translation on every page), dark mode toggle, accessibility menu (font size +/–, high-contrast), search shortcut.
- **Main header with prominent centered search bar** — first-class citizen, not buried.
- **Streamlined nav** — max 5 top-level items: **Services · Traffic & Roads · News & Advisories · About MMDA · Contact**. Dropdowns are **click-triggered** (not hover), fully **keyboard-navigable**, visible focus rings, ARIA attributes.
- **All internal links open in the same tab.** External links marked with icon + `sr-only` "opens in new tab".
- **Mobile:** hamburger drawer, same grouped structure, large tap targets, fully responsive.
- **Footer:** 4 columns (About, Services, Resources, Connect). "X" everywhere — never "Twitter".

---

## Pages to Build (build order)

1. **Design system + global layout** (foundation — built first)
2. **Homepage** — Calm hero, one primary CTA, centered search. Below: live traffic snapshot, flood/weather advisory strip (conditional), top 4 service cards, latest 3 news items, footer CTA. Fixes #2, #3.
3. **News & Advisories** (`/news`) — Filters (All / Advisories / Press Releases / Public Notices), pagination. Content sourced from real mmda.gov.ph articles.
4. **News article detail** (`/news/[slug]`) — Proper reading width, breadcrumbs, share buttons.
5. **Services hub** (`/services`) — Grouped cards: Driver's License, Vehicle Registration, Traffic Violations, Towing & Impound, Permits, Report Concerns.
6. **Service detail / Report Concern** (`/services/report-concern`) — Native in-site form. Fixes #6, #8.
7. **Traffic & Roads** (`/traffic`) — HERE API integration, EDSA/C5/Commonwealth status cards, Leaflet map, number coding widget. Fixes #4 (mobile tables).
8. **About MMDA** (`/about`) — Mandate, leadership, org chart, history.
9. **Contact** (`/contact`) — Hotlines, address, Leaflet map, native contact form with Zod validation.
10. **Search results** (`/search`) — Mock results grouped by type.
11. **404 + Error pages** — On-brand, helpful, with search and home links.

Each page: unique `<title>`, `<meta description>`, OG metadata.

---

## Accessibility (fixes #5)

- Semantic HTML (`<nav>`, `<main>`, `<article>`, correct heading order).
- All images: meaningful `alt`; decorative images: `alt=""`.
- Visible focus rings on every interactive element.
- Full keyboard nav — dropdowns, dialogs, mobile menu.
- ARIA labels on icon-only buttons.
- WCAG AA contrast for all text/background combos.
- Skip-to-content link.
- EN/FIL translation dictionary — full coverage on every page.

---

## Forms (fixes #6, #8)

- All forms native — no Google Forms or external links.
- Zod schemas + inline validation on blur/change (not just submit).
- Proper `autocomplete` attributes on every input.
- Clear required indicators, helpful error copy, success states.
- "Save my info" demo (client-side localStorage only).

---

## Branding (fixes #7)

- "X" everywhere — no "Twitter" in any copy.
- Single design language across all pages.
- All social icons: same style, same size.

---

## Out of Scope

- No real backend or database.
- Traffic data via HERE API (real, but display only — no user submissions).
- No real auth or user accounts.
- Forms show success states only — no actual data sent anywhere.