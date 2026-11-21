---
name: Switchboard Evolution
description: An andon board hung over a factory floor; only the stations that need you light up.
colors:
  floor: "#d5d6d0"
  ink: "#16181a"
  ink-2: "#43464a"
  board: "#17191b"
  board-2: "#202326"
  board-3: "#2a2e32"
  board-line: "#30353a"
  stencil: "#f2f2ec"
  stencil-2: "#a8aca7"
  numeral-unlit: "#73787d"
  call: "#ffc400"
  call-hot: "#ffd84d"
  call-deep: "#d9a300"
  call-ink: "#3d3200"
  call-tint: "#2a2617"
  stop: "#e5392a"
  stop-text: "#ff8b7c"
  stop-tint: "#2b1c1a"
  run-lens: "#24342a"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  display-zone:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.85
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.95
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
  numeral:
    fontFamily: "Big Shoulders Stencil, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.85
    fontFeature: "tnum"
  board-title:
    fontFamily: "Big Shoulders Stencil, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.03em"
  lede:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.3125rem)"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  tag: "2px"
  key: "3px"
  station: "4px"
  board: "6px"
  bezel: "8px"
  strip: "999px"
  lamp: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  lane-w: "clamp(6px, 0.8vw, 10px)"
  lane-gap: "clamp(22px, 4vw, 64px)"
  section: "clamp(64px, 8vw, 112px)"
  station-gap: "clamp(6px, 0.8vw, 10px)"
  container: "1288px"
components:
  plate-button:
    backgroundColor: "{colors.call}"
    textColor: "{colors.ink}"
    rounded: "{rounded.station}"
    padding: "12px 26px 12px 20px"
    height: "68px"
  plate-button-hover:
    backgroundColor: "{colors.call-hot}"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.station}"
    padding: "10px 20px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.floor}"
  rail:
    backgroundColor: "{colors.board}"
    textColor: "{colors.stencil}"
    height: "56px"
  board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.board}"
  station:
    backgroundColor: "{colors.board-2}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.station}"
    padding: "12px 14px 12px 12px"
  station-call:
    backgroundColor: "{colors.call-tint}"
  station-stop:
    backgroundColor: "{colors.stop-tint}"
  lamp:
    backgroundColor: "{colors.board-3}"
    rounded: "{rounded.lamp}"
    size: "20px"
  selector-tab:
    backgroundColor: "{colors.board-2}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.station}"
    padding: "8px 12px 8px 10px"
    height: "52px"
  selector-tab-selected:
    backgroundColor: "{colors.call-tint}"
  platform-plate:
    backgroundColor: "{colors.board}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.board}"
    padding: "18px 22px 16px"
  command-block:
    backgroundColor: "{colors.board}"
    textColor: "{colors.stencil}"
    typography: "{typography.mono}"
    rounded: "{rounded.station}"
    padding: "6px 6px 6px 14px"
  copy-key:
    backgroundColor: "{colors.board-3}"
    textColor: "{colors.call-hot}"
    rounded: "{rounded.key}"
    padding: "6px 12px"
    height: "36px"
  tag-latest:
    backgroundColor: "{colors.call}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "2px 7px"
  release-board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.stencil}"
    rounded: "{rounded.board}"
---

# Design System: Switchboard Evolution

## Overview

**Creative North Star: "The Andon Board"**

The page is the signal board hung above a production line. Painted black steel boards hang over a poured-concrete floor. Each board carries white stencil numerals, and safety yellow marks whatever calls for you. The world is industrial, but it is never grungy. The concrete is a fine grain, the steel is matte and the light comes from round lamp lenses. Most of those lenses stay dark. The only thing that glows is something that needs attention.

The density follows the floor. Dark boards are packed with stations, numerals and small labels. The concrete between them is open and calm, and display headlines sit directly on it. A single painted yellow lane runs down the left edge and ties the sections together as stations of one line. It ends where yellow takes over the whole width, in the download zone.

Scale contrast does the persuasion. Huge condensed stencil numerals sit next to small tracked labels, and huge headlines sit next to one line of reading text. No hazard stripes, no gradient hero, no feature-icon grid.

**Key Characteristics:**
- Two grounds only: grey concrete floor and black painted board. Text is ink on floor and stencil on board.
- Safety yellow is a signal and a zone. It is never decoration.
- Round lamp lenses carry state. Unlit lenses are ghost lenses, and they outnumber lit ones.
- Condensed stencil numerals, tabular, at display scale.
- One painted lane links the sections, and each heading on it gets a lamp.

## Colors

The palette is a factory: grey concrete, black steel, white stencil paint, and three lamp colors, of which yellow is the only one used at scale.

### Primary
- **Safety Yellow** (call): the calling lamp, the plate button, the painted lane, the full-bleed download zone, the latest-release tag, selection highlight, and focus rings on dark grounds. Text on yellow is always ink.
- **Lit Yellow** (call-hot): hover state of yellow plates, status words of a calling station, and the "Copy" and "Files" affordances on the board. It is the yellow used as text on black.
- **Deep Yellow** (call-deep): link underline on hover over the floor.
- **Yellow Ink** (call-ink): secondary text inside a yellow plate (build meta).
- **Calling Tint** (call-tint): the background of a calling station and of the selected selector tab. It is a yellow-warmed board, not a yellow fill.

### Secondary
- **Stop Red** (stop): the core of a stopped lamp only.
- **Stop Text** (stop-text): numeral and status word of a stopped station; the lighter red stays readable on the dark stop tint.
- **Stop Tint** (stop-tint): background of a stopped station.

### Tertiary
- **Run Lens** (run-lens): a running station's lamp. Running is the normal state, so the lens stays dark with only a faint green cast. It never glows.

### Neutral
- **Concrete** (floor): page ground, overlaid with a fine fractal-noise grain at about 9% opacity.
- **Ink** (ink): text, focus outline and outline buttons on the floor; text on yellow.
- **Ink Grey** (ink-2): ledes, intros, captions and fact copy on the floor.
- **Board Black** (board): the rail, the board, bezels, platform plates, command blocks, the release board, the footer.
- **Station Steel** (board-2): a station cell or selector tab set into the board.
- **Lens Steel** (board-3): the ghost lens and the copy key.
- **Board Seam** (board-line): 1px dividers inside boards (board head, file rows, release rows).
- **Stencil White** (stencil): primary text and numerals on board.
- **Stencil Grey** (stencil-2): labels, metadata, notes on board.
- **Unlit Numeral** (numeral-unlit): station and tab numbers when their lamp is off.

### Named Rules
**The Only-Calls-Light Rule.** A lamp glows only for something that needs the visitor: a calling or stopped station, the selected view, the visitor's own platform, the latest release. Running and idle stay dark. If more than two lamps glow on one board, the board is lying.

**The Yellow-Owns-Zones Rule.** Yellow appears either as a small signal (a lamp, a tag, a word) or as a whole zone (the lane, the plate button, the full-bleed download section). It never appears as a mid-size decorative tint, gradient or border accent.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow)
**Numeral Font:** Big Shoulders Stencil (with Big Shoulders Display, Arial Narrow)
**Body Font:** Barlow (with Helvetica Neue, Arial)
**Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Menlo)

**Character:** The display face is a tall, condensed industrial grotesque, set uppercase. The stencil cut is the paint on the board: numbers, the board title and the wordmark. Barlow, a road-sign grotesque, carries everything that has to be read.

### Hierarchy
- **Display** (900, clamp(3rem, 7.4vw, 6rem), 0.88): the hero headline on the concrete, uppercase, balanced.
- **Display Zone** (900, clamp(3.5rem, 9vw, 6rem), 0.85): the one-word heading of the yellow zone.
- **Headline** (800, clamp(2.25rem, 4.6vw, 3.75rem), 0.95, max 18ch): section headings on the lane, releases and the close.
- **Title** (800, 2rem, 1): platform names on their plates (not uppercased) and the install heading.
- **Numeral** (Stencil 800, clamp(2.25rem, 3.6vw, 3rem), 0.85, tabular): station numbers, release versions (up to 3rem), counters (to 2.75rem), tab numbers (1.625rem).
- **Board Title** (Stencil 800, clamp(1.5rem, 2.4vw, 2rem), uppercase, 0.03em): a board's line name, and the wordmark (1.375rem).
- **Lede** (Barlow 500, clamp(1.125rem, 1.5vw, 1.3125rem), 1.45, max 38ch): the one line under the hero headline.
- **Body** (Barlow 400, 1.0625rem, 1.55): reading text. Intros run at 1.125rem, max 62ch; install prose max 64ch.
- **Label** (Barlow 600, 0.75rem, 0.08 to 0.1em, uppercase): counter labels and a station's project name, on the board only.
- **Mono** (JetBrains Mono 400, 0.875rem; 0.8125rem for file names and types): commands, file names, file types. Nothing else.

### Named Rules
**The Stencil-Is-Paint Rule.** The stencil cut is used for numbers, line names and the wordmark: things painted on steel. Headlines use Display, never Stencil.

**The Mono-Is-Literal Rule.** JetBrains Mono appears only where the visitor would type or download the exact string: commands, file names, file extensions.

**The Scale-Gap Rule.** Numerals and headlines sit 3 to 5 times the size of the labels beside them. Do not fill the middle with intermediate sizes.

## Layout

A centered container (max 1288px) with a fluid gutter (clamp(16px, 4vw, 48px)). Sections breathe at clamp(64px, 8vw, 112px) vertical padding.

**The painted lane.** Below the hero, the content sits on a line: a yellow lane (clamp(6px, 0.8vw, 10px) wide) runs down the left gutter edge, and content is indented by gutter + lane width + clamp(22px, 4vw, 64px). Every section heading on the lane carries a 26px ghost lens centered on the lane at the heading's own height, ringed in board black and yellow. The lane ends in the download section, which turns yellow edge to edge (a 100vmax spread, clipped horizontally) and lights its heading lamp.

**The board** spans the full content width under a 26px mount (two steel posts). It holds a 4 by 2 station grid with a clamp(6px, 0.8vw, 10px) gap.

**Hero band**: headline and action in a 7:5 grid, bottom-aligned.

Releases and the close sit off the lane, in the plain container. The close centers its content.

### Responsive
- **960px**: the board drops to 2 columns and hides stations 5 to 8 (2 by 2). The selector row becomes a horizontal scroll strip with snap and no scrollbar.
- **900px**: hero band, facts, and install collapse to one column. The phone row becomes a horizontal snap scroller that bleeds to the right edge.
- **760px**: platform plates stack; footer becomes one column, links left-aligned.
- **600px**: tool views swap to portrait mobile rasters (art direction in the markup, not CSS).
- **560px**: release rows put the version and lamp on one row and the body below.
- **520px**: the rail hides its first link and the GitHub label; stations restack (numeral and lamp on one row, text below); the "sessions" counter hides; the plate button goes full width.

## Elevation & Depth

Depth is physical: boards are steel objects hanging in front of the concrete, so they cast long, soft, low shadows downward. Each one also has a 1px top highlight on its painted edge. Things set into a board (stations, tabs) are flat and recessed with a 1px inner hairline. On yellow, shadows warm to brown. Lamps are the only light sources: a lit lens throws an outer glow in its own color.

### Shadow Vocabulary
- **Hung board** (`inset 0 1px 0 rgba(255,255,255,.06), 0 34px 60px -34px rgba(8,10,12,.7), 0 6px 14px -8px rgba(8,10,12,.5)`): the board and selector. Bezels and the release board use a slightly shorter variant.
- **Plate on yellow** (`0 22px 40px -24px rgba(70,50,0,.7)`): dark plates inside the yellow zone.
- **Yellow plate lip** (`inset 0 -3px 0 rgba(0,0,0,.14), 0 14px 26px -14px rgba(110,80,0,.75)`): the plate button; rises 1px on hover, presses 1px on active.
- **Recess** (`inset 0 0 0 1px #1a1c1f`): stations and selector tabs.
- **Lens ring** (`0 0 0 2px #111315, 0 0 0 3px #2f3438`): the bezel ring of an unlit lamp.
- **Lamp glow** (`0 0 0 2px #111315, 0 0 18px 3px rgba(255,196,0,.55)`): a lit call lamp; red at .5 for stop; 12 to 14px blur on smaller lamps.

### Named Rules
**The Light-Comes-From-Lamps Rule.** No element glows except a lit lens. Hover never adds glow; it changes fill or color.

## Shapes

Painted steel with eased corners, not pills. Corners step with size: tags 2px, keys 3px, stations, tabs, commands and buttons 4px, boards and plates 6px, bezels and selector 8px. Lamps are perfect circles with a radial-gradient lens (highlight at 34% 30%). The one pill is the quiet strip of dark lenses at the close. The phone handset uses its own device radius. Dividers inside boards are 1px seams in board-line. Outline buttons use a 2px inset stroke, never a border.

## Components

### The Rail
A 56px black beam across the top: stencil wordmark (the second word in yellow) on the left, Barlow 600 links on the right. Links turn yellow on hover. At 520px it keeps the wordmark, one text link and the GitHub mark.

### The Board and its Stations
A black board with a head (stencil line name, right-aligned counters with tracked labels over stencil numerals) and a grid of stations. A station is a recessed steel cell: a large stencil numeral spans the left column, then project label, two-line title, and a status line ("Agent · **state**"), with the lamp top right. States:
- **Run**: dark lens with green cast; numeral unlit.
- **Idle**: ghost lens; numeral unlit.
- **Call**: calling tint, yellow numeral, lit-yellow status word, glowing yellow lamp.
- **Stop**: stop tint, stop-text numeral and status word, glowing red lamp.
The "needs you" counter is yellow while above zero and drops to stencil grey at zero. A board note in stencil grey labels demo data.

### Lamps
The 20px lens is the system's signature. A smaller 14 to 16px lens appears in tabs and plates, and a 26px one on the lane. Unlit lenses stay visible as ghost lenses: they are the state "nothing here", not missing content.

### The Yellow Plate Button
The primary action: a yellow plate, 68px tall, with a 28px icon and two lines (Barlow 700 1.25rem action, 500 0.875rem tabular meta in yellow ink). It lifts on hover to lit yellow and presses on active. Secondary actions sit beside it as underlined Barlow 600 text links.

### Outline Button
On the floor: 48px, 2px inset ink stroke, 4px corners, Barlow 700. On hover it fills ink, with text in concrete.

### Platform Plates and File Rows
Dark plates inside the yellow zone, one per system, two columns. The head has the platform title and a "yours" marker (a small lens that lights for the visitor's system). File rows are separated by seams: Barlow 600 label, then mono file type, tabular size and a yellow download icon. On hover the label turns lit yellow over a 3.5% white wash. The visitor's build carries a small yellow tag.

### Station Selector Tabs
A board of six tabs over one large view. Each tab is a mini station: stencil number, label, 14px lamp. The selected tab takes the calling tint, a yellow number and a lit lamp. Arrow keys move between tabs. Under 960px the row scrolls horizontally.

### Command Blocks with Copy
A black strip with a mono command that wraps anywhere, and a copy key at the right end (lens-steel fill, lit-yellow Barlow 600 label and icon). The key reads "Copied" with a check for 1.8s, or "Select and copy" if the clipboard refuses.

### The Release Board
The board again, as a log. Rows have a stencil version, then name, tags and tabular meta, and a lamp at the right. Only the latest release lights its lamp and yellow version, with a solid yellow "latest" tag. Draft and pre-release tags are outlined in stencil grey. A disclosure ("Files") rotates its chevron 90° and opens a grid of mono file rows.

### Motion
- **Lamp ignition**: when a station starts calling, its lamp and numeral flicker on through stepped brightness (0.35, 1.25, 0.55, 1.1, 1) over 0.55s with `steps(1, end)`. It is a fluorescent strike, not a fade.
- **The board tick**: every 2.8s while the board is on screen and the tab is visible, either the oldest call is answered (when two are waiting, or at random) or a running station starts calling. Counters update with it. Station backgrounds ease over 0.5s with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reduced motion**: the tick never starts, smooth scrolling turns off, and all transitions and animations collapse to 0.01ms. The board stays as a static snapshot with its two lit stations.

## Do's and Don'ts

### Do:
- **Do** keep text ink on concrete and stencil on board; on yellow, text is always ink.
- **Do** leave most lamps dark: only calling, stopped, selected, "yours" and latest light up.
- **Do** set numbers (stations, counters, versions, steps) in the stencil cut with tabular figures.
- **Do** put new sections on the painted lane with a lamp at their heading, and end the lane in a yellow zone.
- **Do** use the hung-board shadow for any new dark board on the floor, and the warm plate shadow on yellow.
- **Do** focus with a 3px outline offset 3px: ink on floor and yellow zone, yellow on board.
- **Do** label demo data on any board that shows made-up sessions.

### Don't:
- **Don't** use hazard stripes or diagonal warning patterns.
- **Don't** light a lamp for a running or idle state, or add glow on hover.
- **Don't** use yellow as a gradient, a tint wash on the floor, or a decorative border.
- **Don't** use JetBrains Mono for labels, numbers or UI chrome.
- **Don't** set headlines in the stencil cut, or reading text in the display face.
- **Don't** build a dark gradient hero, a tilted screenshot or a feature-icon grid.
