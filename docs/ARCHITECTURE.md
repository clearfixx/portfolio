# Portfolio Architecture v1.0

## Architecture Principle

This portfolio uses a pragmatic single-application architecture.

The project must be simple enough to build quickly and clean enough to maintain.

No overengineering.
No NestJS.
No custom CMS in v1.0.

---

## High-Level Architecture

```txt
Browser
  ↓
Next.js App
  ↓
Payload CMS
  ↓
PostgreSQL

The application contains:

public website
Payload admin panel
Payload API
PostgreSQL database
media management
Public Routes
/ — Landing page
/projects — Projects list
/projects/[slug] — Single project page
/blog — Blog list
/blog/[slug] — Blog article
/contact — Contact page
/admin — Payload admin
/api — Payload / Next API
Main Modules
Landing Page

Includes:

WOW hero
first-load preloader
selected projects
skills / tech stack
testimonials
social feeds
contact form
footer
Projects

Projects are a separate portfolio module.

Projects are not blog posts.

A project page focuses on:

project status
progress level
screenshots
tech stack
GitHub feed
version history
GitHub button
live/Vercel button

If GitHub or live URL is missing, the button is disabled and shows tooltip:

Невдовзі

Blog

The blog is used for:

dev notes
articles
project stories
updates

Only admin/authors can publish blog posts.

There are no public user posts in v1.0.

Payload Collections
Users
Media
Projects
BlogPosts
Testimonials
ContactMessages
Notifications
Categories
TechStack
Payload Globals
SiteSettings
Homepage
SEO
Social
Contact
Analytics
Integrations
Important Rule

Secrets should not be stored in Payload if avoidable.

Use environment variables for:

SMTP passwords
GitHub tokens
X/Twitter secrets
Instagram tokens
storage credentials

Payload stores configuration, not sensitive secrets.

Users

There is no public registration.

Users exist only for admin and authors.

Minimal fields:

username
email
password
avatar
role
isActive

Roles:

admin
author
Admin UX

Every meaningful action should show a toast.

Dangerous actions require confirmation dialogs.

Not Included in v1.0
public registration
user profiles
comments
likes
subscriptions
chat
marketplace
custom CMS from scratch
complex roles
social network features
user-generated blog posts
NestJS backend
full custom admin rewrite
Release Strategy

Release first. Polish later.
```
