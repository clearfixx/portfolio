# Homepage Layout Specification

Version: 1.0
Status: Approved
Depends on:

- homepage-ui-spec.md

---

# Purpose

This document describes the physical structure of the homepage.

Unlike homepage-ui-spec.md, this document contains measurable layout rules.

This specification is intended for frontend implementation.

---

# Viewport

Design target:

Desktop First

Reference resolution:

1920 × 1080

Minimum supported desktop:

1440 × 900

Tablet and mobile layouts are defined separately.

---

# Layout Philosophy

The homepage is NOT a collection of independent sections.

The Hero is one unified dashboard.

Every block should visually belong to the same interface.

---

# Global Container

Max Width

1600px

Preferred Width

1500–1560px

Horizontal Padding

48px

Maximum content width should never exceed 1600px.

---

# Header

Height

76px

Position

fixed

Top Offset

0

Background

transparent

Scrolled state

glass + blur

Content alignment

space-between

---

# Hero

Height

100vh

Minimum Height

980px

Top Padding

Header + 40px

Bottom Padding

48px

Hero must always fill the first screen.

---

# Hero Grid

Three-column layout.

Recommended proportions:

24%
46%
30%

Approximate widths:

Left Rail

340px

Center

auto

Right Rail

430px

Gap

32px

Never collapse proportions on desktop.

---

# Hero Composition

┌────────────────────────────────────────────────────────────────────┐
│ Header │
├──────────────┬────────────────────────────────┬────────────────────┤
│ │ │ │
│ │ │ │
│ System │ │ │
│ Status │ │ │
│ │ │ │
│ │ HERO │ Live Editor │
│ │ │ │
│ │ │ │
│ │ │ │
│ │ │ │
├──────────────┴────────────────────────────────┴────────────────────┤
│ Tech Stack │
├────────────────────────────────────────────────────────────────────┤
│ Mission Dashboard │
└────────────────────────────────────────────────────────────────────┘

This composition must remain visually balanced.

---

# Left Rail

Contains:

System Status

↓

Core Systems

Vertical gap

20px

Width

340px

Alignment

stretch

---

# Terminal

Height

520px

Header Height

44px

Body Padding

20px

Progress Footer

60px

Border Radius

24px

---

# Core Systems

Height

220px

Padding

20px

Radius

24px

---

# Center Column

Contains:

Eyebrow

↓

Title

↓

Subtitle

↓

CTA

↓

Scroll Indicator

Everything must stay vertically centered.

Maximum Content Width

760px

Text Alignment

center

---

# Hero Title

Maximum Width

720px

Font Size

96–108px

Line Height

0.92

Letter Spacing

-0.07em

Three visual lines.

No more.

---

# Subtitle

Maximum Width

620px

Font Size

18px

Line Height

1.7

Top Margin

28px

---

# CTA

Top Margin

40px

Gap

16px

Buttons

same height

same width

---

# Scroll Indicator

Top Margin

56px

Always below CTA.

---

# Right Rail

Width

430px

Contains

Editor

↓

Status Cards

Gap

20px

---

# Live Editor

Height

520px

Padding

20px

Header Height

44px

Radius

24px

---

# Status Cards

Count

3

Height

96px

Gap

12px

Radius

18px

---

# Tech Stack

Position

Immediately after Hero Grid

Top Margin

32px

Height

120px

Cards

Equal Width

---

# Mission Dashboard

Top Margin

24px

Height

220px

---

# Border Radius

Primary Cards

24px

Secondary Cards

18px

Buttons

999px

---

# Glass Surface

Opacity

Low

Blur

Medium

Border

1px

Glow

Subtle

---

# Grid Rhythm

Preferred spacing system:

4

8

12

16

24

32

48

64

96

Avoid random values.

---

# Responsive

Desktop

≥1440px

Three columns

Tablet

768–1439px

Single column

Order:

Hero

↓

Terminal

↓

Editor

↓

Tech Stack

↓

Dashboard

Mobile

≤767px

Everything stacked.

Hero typography scales down.

No horizontal scrolling.

---

# Z-Index

Background

0

Particles

1

Hero Content

5

Header

50

Modal

100

---

# Implementation Notes

Use CSS Grid.

Do not use absolute positioning for layout.

Absolute positioning is allowed only for decorative effects.

All dimensions may vary by ±4px if required by implementation.

The overall composition must remain visually identical to the approved design.

---

END OF DOCUMENT
