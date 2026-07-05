# Homepage UI Specification
Version: 1.0
Status: Approved
Architecture: Frozen

---

# Purpose

This document is the source of truth for the homepage UI.

The goal is NOT to "create something similar".

The goal is to reproduce the approved design as accurately as possible.

Every visual decision must follow this specification unless it is explicitly updated.

---

# Design Philosophy

The homepage should feel like entering a futuristic developer command center.

Keywords:

- premium
- minimal
- cinematic
- futuristic
- engineering
- space station
- HUD
- mission control

Avoid:

- generic landing pages
- startup gradients
- oversized glassmorphism
- playful design
- colorful UI
- marketing-style blocks

The page should look like professional software rather than a website.

---

# Overall Composition

The first screen is ONE composition.

It is NOT several independent sections.

Layout:

Header

↓

Hero

↓

Tech Stack

↓

Mission Dashboard

Everything above the fold should feel like one connected interface.

---

# Hero Layout

The Hero occupies almost the entire first viewport.

Approximate structure:

┌──────────────────────────────────────────────────────────────┐
│ Header                                                       │
├──────────────┬──────────────────────────────┬────────────────┤
│              │                              │                │
│              │                              │                │
│ System       │ Hero                         │ Live Editor    │
│ Status       │                              │                │
│              │                              │ Status Cards   │
│              │                              │                │
├──────────────┴──────────────────────────────┴────────────────┤
│ Tech Stack                                                  │
├──────────────────────────────────────────────────────────────┤
│ Mission Dashboard                                           │
└──────────────────────────────────────────────────────────────┘

The layout should look like one dashboard.

Not separate cards floating independently.

---

# Header

Transparent.

Very light.

Does not visually compete with Hero.

Contains:

- Logo
- Navigation
- CTA

---

# Logo

Approved version:

[AK]

Andrii Kulahin

Software Engineer

● Online

The logo from the second approved mockup is the source of truth.

---

# Left Column

Contains:

System Status

↓

Core Systems

The terminal is visually dominant.

The progress block is secondary.

---

# Hero

This is the visual focus.

Typography is intentionally oversized.

Large empty space around the title must be avoided.

Approximate content order:

Eyebrow

↓

Main Heading

↓

Description

↓

CTA Buttons

↓

Scroll Indicator

---

# Hero Typography

Main title must dominate the screen.

Target feeling:

Apple WWDC

+

Stripe

+

Linear

+

NASA Mission Control

NOT:

Bootstrap Hero

NOT:

Typical SaaS Landing

---

# Right Column

Contains:

Live Editor

↓

Status Cards

The editor occupies most of the column height.

Cards are supporting information.

---

# Cards

Cards should feel like dashboard widgets.

Not blog cards.

Characteristics:

- subtle borders
- premium glass
- soft glow
- dark surface
- large radius

No heavy shadows.

---

# Background

Implementation:

SVG + Canvas

Never WebGL.

Features:

- connected particles
- thin glowing lines
- slow movement
- subtle parallax
- cursor interaction

Background must never distract from content.

---

# Animations

Animations are secondary.

The page should still look premium with animations disabled.

Motion includes:

- typing terminal
- blinking cursor
- editor fade
- button hover
- background particles
- glow breathing

Avoid:

- bouncing
- spinning
- flashy transitions

---

# Terminal

The terminal prints text character-by-character.

Example:

B

Bo

Boo

Boot

...

Each line starts only after the previous one finishes.

Cursor blinks continuously.

---

# Editor

Looks inspired by VS Code.

Not a fake code screenshot.

Real code.

Readable.

Proper indentation.

---

# Colors

Primary:

Cyan

Secondary:

Teal

Accent:

Violet

Background:

Almost black.

No pure black.

---

# Design Rules

Never redesign approved UI.

Never replace layout with "something better".

Never simplify composition.

Never invent new sections.

If something is unclear:

Ask.

Do not improvise.

---

# Development Strategy

Step 1

Static layout

↓

Step 2

Typography

↓

Step 3

Cards

↓

Step 4

Spacing

↓

Step 5

Animations

↓

Step 6

Responsive

↓

Step 7

Polish

Every stage must visually match the approved mockup before moving to the next.

---

END OF SPECIFICATION
