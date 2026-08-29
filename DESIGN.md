# Design Brief

## Direction

Veridian Shield — a premium, dark-first AI identity & document screening platform with a blue→purple aurora gradient and glassmorphism surfaces.

## Tone

Dark editorial, Stripe/Vercel-grade polish: deep indigo atmosphere, frosted glass panels, and a confident electric-blue→violet accent used with restraint.

## Differentiation

A signature "aurora" blue→purple gradient that flows through hero text, primary CTAs, and active states, set against floating glass cards over ambient glow orbs.

## Color Palette

| Token      | OKLCH (dark)   | Role                          |
| ---------- | -------------- | ----------------------------- |
| background | 0.145 0.02 265 | deep indigo app canvas        |
| foreground | 0.95 0.01 265  | primary text                  |
| card       | 0.19 0.025 265 | glass surface                 |
| primary    | 0.62 0.19 255  | electric blue CTA / active    |
| accent     | 0.6 0.22 295   | violet highlight              |
| muted      | 0.24 0.03 265  | secondary surfaces            |
| success    | 0.65 0.18 150  | Verified badge                |
| warning    | 0.75 0.15 85   | Suspicious badge              |
| destructive | 0.55 0.22 25  | Fake / danger badge           |

## Typography

- Display: Space Grotesk — headings, hero, stat numerals
- Body: DM Sans — paragraphs, UI labels, tables
- Mono: Geist Mono — document IDs, confidence scores, timestamps
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Glass cards with translucent backgrounds, 16px backdrop blur, and hairline borders layered over a deep indigo canvas with soft ambient glow orbs; elevation via `shadow-subtle`/`shadow-elevated`.

## Structural Zones

| Zone    | Background           | Border   | Notes                          |
| ------- | -------------------- | -------- | ------------------------------ |
| Navbar  | glass-card / translucent | border-b | sticky, frosted over content   |
| Content | bg-aurora            | —        | sections alternate muted/glass |
| Sidebar | glass-card / translucent | border-r | fixed, frosted                 |
| Footer  | bg-muted/40          | border-t | muted, low emphasis            |

## Spacing & Rhythm

Section gaps `py-16 md:py-24`, content `gap-6`, cards `p-6`; consistent `space-y-6` grouping with 4px micro-spacing for tight stat clusters.

## Component Patterns

- Buttons: `rounded-xl`, primary uses `bg-gradient-primary` with hover lift + shadow; ghost/outline for secondary
- Cards: `glass-card` with `rounded-2xl`, `shadow-subtle`, hover `shadow-elevated`
- Badges: `rounded-full` pills — success/warning/destructive tinted backgrounds
- Tables: muted header row, hover row highlight, status badges with tinted pills

## Motion

- Entrance: `animate-fade-in-up` staggered 60ms on sections/cards
- Hover: 0.3s `transition-smooth` lift + shadow on cards/buttons
- Decorative: `animate-float-slow` on ambient orbs, `animate-shimmer` on loading skeletons

## Constraints

- Token-only styling — no raw hex/rgb in components
- AA+ contrast in both light and dark modes
- Fully responsive mobile-first (sm/md/lg breakpoints)
- Frontend-only with mock JSON data; no backend/AI/OCR/auth

## Signature Detail

The aurora gradient text on hero headlines and primary CTAs — a blue-to-violet sweep that makes the screening platform feel intelligent and premium at first glance.
