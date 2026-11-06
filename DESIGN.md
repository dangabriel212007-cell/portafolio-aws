# DESIGN.md — Flight Log

Personal portfolio of Daniela Gabriel Suárez (Nani), accounting student heading into FinOps.
Mood: pastel sky, soft and friendly, drawn like her comic avatar. The page is a flight:
takeoff → pilot → cockpit → logbook → mini-game → luggage → control tower.

## Direction

- **One bold thing:** the sky. Nani's plane flies through layered clouds in the hero, and a dotted
  flight trail keeps drawing itself down the page as you scroll. Everything else is calm.
- **Ink outlines, not soft shadows.** Her illustrations have a dark ink outline, so components use a
  2px navy outline and a flat drop shadow (offset straight down, no blur), never a grey blur.
- **Each section borrows a real aviation object** instead of repeating the same card:
  pilot license (About), instrument panel (Skills), logbook pages (Projects),
  cargo hold + runway (Mini-game), luggage tags (Carry-on), boarding pass (Contact).
- **Left-aligned text** everywhere except the short mini-game result message.
- **Not used:** gradient text, all-caps labels, emoji as icons, glassmorphism, purple.

## Color

Text is never pastel. Pastels are only for backgrounds and fills.

| Token | Day | Night | Role |
|---|---|---|---|
| `--sky` | `#BFE3F5` | `#16294A` | Page sky, bottom of gradient |
| `--sky-light` | `#EAF6FD` | `#0F1E33` | Page sky, top of gradient; section fills |
| `--surface` | `#FFFFFF` | `#1E3A5F` | Cards, license, tags, boarding pass |
| `--ink` | `#1E3A5F` | `#EAF6FD` | Main text, outlines, icons |
| `--ink-soft` | `#4A5B6E` | `#B9CBDD` | Secondary text |
| `--sun` | `#FFE58A` | `#FFE58A` | Highlights, chips, gauge fill |
| `--action` | `#F5C842` | `#F5C842` | Primary buttons (navy text on top) |
| `--go` | `#2E7D5B` | `#7FD6AE` | "Using it" gauges, mini-game success |
| `--alert` | `#B8372E` | `#FF9C92` | Over budget, trap boxes (red from her scarf) |
| `--line` | `rgba(30,58,95,.18)` | `rgba(234,246,253,.2)` | Dividers, logbook ruling |

Contrast (day): ink on sky-light 10.5:1 · ink-soft on surface 7.0:1 · ink-soft on sky 5.2:1 ·
ink on action 7.2:1 · go on surface 5.0:1 · alert on surface 5.8:1.
Night on `--surface`: ink 10.5:1 · ink-soft 6.9:1 · go 6.6:1 · alert 5.7:1 · sun 9.2:1.

Night flight adds small stars (`--sun` at low opacity) and swaps every token; illustrations stay the same.

## Typography

- **Fredoka** (500, 600) — headings, buttons, gauge labels. Rounded like the avatar's lettering.
- **Nunito** (400, 700) — body and UI text.
- Body 17px / 1.6, max line length 65ch.

| Token | Size | Line height | Use |
|---|---|---|---|
| `--fs-hero` | `clamp(2.5rem, 6vw, 4.25rem)` | 1.05 | Hero name |
| `--fs-h2` | `clamp(2rem, 4vw, 2.75rem)` | 1.1 | Section titles |
| `--fs-h3` | `1.5rem` | 1.2 | Card / entry titles |
| `--fs-lead` | `1.25rem` | 1.5 | Hero tagline, section intros |
| `--fs-body` | `1.0625rem` | 1.6 | Paragraphs |
| `--fs-small` | `0.9375rem` | 1.5 | Meta, captions, chips |
| `--fs-tiny` | `0.8125rem` | 1.4 | License field names, footnotes |

Section titles carry the aviation name; a plain one-line subtitle says what the section is
("The Pilot" + "About me"). No eyebrow labels above headings.

## Spacing and layout

- 4px base: `4 8 12 16 24 32 48 64 96 128` (`--s-1` … `--s-10`).
- Content width 1120px, side gutter 16px on phones, 32px from 768px.
- Section padding: 96px top/bottom on desktop, 64px on phones.
- Breakpoints: 600px, 900px. Designed first at 360px.

## Shape and depth

- Radius: `--r-sm 8px` chips and inputs · `--r-md 16px` cards · `--r-lg 28px` license and boarding pass · `--r-pill 999px` buttons.
- Outline: `--outline: 2px solid var(--ink)`.
- Shadow: `--drop: 0 6px 0 var(--line)` at rest; `0 10px 0 var(--line)` when lifted. No blur.

## Components

- **Primary button:** pill, `--action` fill, navy text, outline, drop shadow. Hover lifts 3px;
  active presses 2px down; focus shows a 3px `--ink` ring offset 3px; disabled at 45% opacity.
- **Secondary button:** pill, `--surface` fill, same outline and states.
- **Toggle (Night flight, EN/ES):** small pill buttons in the header with `aria-pressed`.
- **Nav:** fixed top bar on `--sky-light` at 92% with a bottom line; on phones a menu button opens a sheet.
- **Pilot license:** wide card with the face photo slot, field name/value pairs, rounded corners.
- **Gauge (skill):** round dial drawn in SVG with a needle; "Using it" needle rests in the green arc,
  "Learning" needle sits mid-dial and breathes slowly. No percentages anywhere.
- **Logbook entry:** white page with faint ruled lines, a rubber-stamp status
  ("In progress", "Coming soon", "Live"), and four labelled parts: what it is / my part / what I learned / link.
- **Cargo box:** square button with icon, name and monthly cost; selected = loaded on the plane
  (`aria-pressed="true"`, filled `--sun`). Traps are not marked in advance.
- **Fuel gauge:** horizontal meter of total cost vs $5 budget; turns `--alert` when over.
- **Luggage tag:** card with a punched hole and string, illustration on top, one short line.
- **Boarding pass:** two-part ticket with a perforated divider, contact actions on the stub.

## Imagery and icons

- Illustrations: Nani's own comic avatar, transparent WebP, outline style matches components.
- Icons: simple inline SVG line icons, 2px stroke, round caps, `currentColor`. No emoji in the UI
  (the ✈ in the hero hint button is part of the copy requested in plan.md).
- Clouds: her four drawn clouds, reused at different sizes and depths.

## Motion

- Only `transform` and `opacity` (the flight trail uses SVG `stroke-dashoffset`).
- Hero: plane glides in over ~1.5s (`cubic-bezier(.22,1,.36,1)`), then bobs ±6px twice and rests.
  Text and buttons are visible immediately.
- No endless loops: automatic motion stops within 5 seconds (WCAG 2.2.2). Learning needles breathe once.
- Clouds: parallax at three depths on scroll.
- Sections: gentle fade-up the first time they enter view (once, 500ms).
- Buttons: lift on hover, 160ms.
- Mini-game: shake on failure (400ms), climb-and-exit on success (1.2s), cloud puff.
- `prefers-reduced-motion: reduce` → everything shown in its final state, no movement.

## Intro ("Preparing for takeoff")

Shown once per visit (sessionStorage), never for deep links (`#projects`) and never with
`prefers-reduced-motion: reduce` — those visitors land straight on the site.

| Moment | Motion | Timing |
|---|---|---|
| Loading | "Flight Log" + "Preparing for takeoff", a small plane travels a dotted line, % follows real loading of hero art, clouds and fonts | min 1.2s, max 4s |
| Choice | Loading line fades; "Board with music ♪", "Board in silence", "Best with headphones" rise in | 400ms `cubic-bezier(.23,1,.32,1)`, 60ms stagger |
| Leave | Intro content drops and fades (exit faster than entry) | 250ms opacity, 400ms transform |
| Climb | Clouds fall and grow by depth (near ones faster) as the camera rises; sky fades to reveal the hero | 1.6s `cubic-bezier(.77,0,.175,1)`, sky fade 700ms from 850ms |
| Name | Letters go from `blur(8px)` + transparent to sharp | 400ms each, 28ms apart |

- Only `transform`, `opacity` and the letters' `filter` animate. No blur on the big clouds (mobile cost).
- Buttons press to `scale(0.97)`; nothing enters from `scale(0)`.
- **Vinyl** (bottom right, 56px): plays/pauses `assets/music.mp3`; spins only while music plays
  (3s per turn, linear). The song uses `preload="none"`, so it downloads only when someone asks for music.
  Volume fades in over 1.5s.

### Intro extras (record-sleeve touches)
- **Big record** above "Flight Log" (`clamp(120px, 30vw, 180px)`), same drawing as the corner vinyl. Still while loading;
  spins with music (`vinyl-spin`, 3s linear). On boarding it flies to the corner with FLIP (`translate` + `scale`,
  1s from 150ms, `cubic-bezier(.77,0,.175,1)`) and hands off to the corner button with no transition, so there are never two records.
- **Flight ticket** top left: "FLT DGS-01 · PUE → CLOUD · 2026" (ES: "VUELO … → NUBE"), tiny, `--ink-soft`, letter-spacing .08em.
  Shortened below 400px.
- **Cabin line** bottom center on the choice screen: "Seatbelt on. We take off when you're ready."
  (ES: "Cinturón abrochado. Despegamos cuando quieras.").

## Sky clouds (fun facts)
- 5 cloud buttons, one per section (About, Skills, Projects, Carry-on, Contact), top right in the free space next to the title.
  Hint next to the first one: "Tap a cloud ☁ · 0/5".
- Tap: the cloud goes to `scale(.9)` + transparent; ~11 round "cloud bits" (navy outline) fly out, drift down and fade
  (650–850ms, `cubic-bezier(.23,1,.32,1)`, 0–60ms random delay). 2D only.
- The fact card enters from `scale(.96)` + opacity, 200ms, origin top right. Closes with ×, Escape or a tap outside.
- Facts come from the Flight log projects plus one FinOps principle.

## Safety card (before the mini-game)
- Airline safety card look: yellow striped band, 4 numbered steps with pictograms, dots, Back / Next (Start on the last), Skip.
- Step change: 12px slide + opacity, 200ms. Card enters in 260ms, leaves in 150ms. Once per visit; "? How to play" reopens it.

## Mini-game difficulty
- Traps are cheap now (24/7 server $3.50, idle database $1.50, AI chatbot $2, forgotten test server $0.80)
  and any trap on board fails the flight ("Waste on board!"), even under the $5 budget.

## Transitions
- **Cloud curtain** on in-page link clicks (mouse/touch only): 10 clouds close in from the sides (380ms
  `cubic-bezier(.77,0,.175,1)`) over a sky layer, the page jumps, then the clouds part (420ms). Keyboard jumps directly.
- **Porthole**: license, skills panel, logbook entries, game, luggage tags and boarding pass open like an airplane window
  while scrolling in (`clip-path: inset(... round ...)` from narrow capsule to full). Once open, they stay open.

## Cursor
- Mouse only: native cursor hidden; 8px dot in `--ink` with a thin `--sky-light` ring and soft glow, following with a
  spring-like lerp (0.28). A canvas draws a fading contrail (last 320ms). Over links and buttons the dot shrinks and a
  32px ring appears (160ms); pressing scales it to .9. The canvas stops drawing when the mouse is still.
- Off on touch screens and with `prefers-reduced-motion`.
