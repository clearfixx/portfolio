# Portfolio Blueprint v1.0

## Principle

Release first. Polish later.

The portfolio must feel like a real product, but the architecture must stay pragmatic.

No NestJS.
No custom CMS.
No social network features.
No public user system.

---

## Core Architecture

```txt
Browser
  ↓
Next.js App
  ↓
Payload CMS
  ↓
PostgreSQL

Payload owns:

admin panel
admin/authors auth
collections
globals
API
media
access control

Next.js owns:

public pages
UI
animations
GitHub live widgets
SEO rendering
Data Model Strategy

Use separate collections only when the entity has independent meaning.

Use embedded Payload fields when the data only belongs to one parent document.

Separate Collections
Users
Media
Projects
ProjectVersions
BlogPosts
Testimonials
ContactMessages
Categories
TechStack
Notifications
Embedded Project Fields
external links
gallery items
project highlights
GitHub repository settings
SEO metadata
Projects

Projects are the heart of the portfolio.

Projects are not blog posts.

A project page is a live dashboard, not a text article.

Fields
General
title
slug
excerpt
description
coverImage
featuredImage
isFeatured
publishedAt
Status
stage
progress
currentVersion
startedAt
releasedAt
Stage Values
idea
planning
development
testing
released
maintenance
archived
Relations
category
techStack
relatedBlogPosts
GitHub
githubUrl
githubOwner
githubRepo
showGithubStats

GitHub live data must not be stored in Payload unless cached later.

Frontend may fetch:

latest commit
stars
forks
open issues
contributors
releases
Links

Embedded array:

label
url
type
isEnabled

Types:

github
live
documentation
case-study
figma
other

If a URL is missing, the UI shows disabled button with tooltip:

Невдовзі

Gallery

Embedded array:

image
caption
alt
sortOrder
isFeatured
deviceFrame

Device frame values:

none
desktop
laptop
tablet
mobile
Highlights

Embedded array:

title
description
icon
SEO
metaTitle
metaDescription
ogImage
ProjectVersions

Separate collection.

Used for changelog, version history, and project timeline rendering.

Fields
project
version
title
releaseDate
summary
highlights
breakingChanges
isStable
isCurrent
BlogPosts

Blog posts are for articles, dev notes, project stories, and updates.

There are no public user posts in v1.0.

Fields
title
slug
excerpt
content
coverImage
status
publishedAt
author
category
relatedProject
tags
SEO

Status values:

draft
published
archived
TechStack

Reusable dictionary of technologies.

Used by:

projects
homepage skills section
future filters
Fields
name
slug
icon
category
websiteUrl
proficiency
isFeatured
sortOrder

Categories:

frontend
backend
database
devops
design
tools
other
Categories

Reusable content categories.

Used by:

projects
blog posts
Fields
title
slug
description
type
parent
sortOrder

Types:

project
blog
shared
Testimonials

Visitor-submitted testimonials.

Flow
Visitor submits testimonial
  ↓
Payload stores it as pending
  ↓
Admin receives notification
  ↓
Admin approves or rejects
  ↓
Approved testimonial appears on site
Fields
name
role
company
message
avatar
status
rating
source
approvedAt

Status values:

pending
approved
rejected
ContactMessages

Visitor contact form submissions.

Flow
Visitor submits contact form
  ↓
Payload stores message
  ↓
Email notification is sent to admin
  ↓
Admin can read/archive message
Fields
name
email
subject
message
status
source
archivedAt

Status values:

new
read
archived
Notifications

Admin-side notifications.

Used for:

new testimonial
new contact message
system event
Fields
title
message
type
status
relatedCollection
relatedDocumentId

Types:

contact
testimonial
system

Status values:

unread
read
archived
Globals
SiteSettings
siteName
siteDescription
logo
defaultOgImage
defaultLanguage
maintenanceMode
Homepage
hero
featuredProjects
selectedTechStack
testimonialsSection
socialFeedsSection
contactSection
SEO
defaultMetaTitle
defaultMetaDescription
defaultOgImage
robots
sitemapEnabled
Social
githubUrl
linkedinUrl
xUrl
instagramUrl
dribbbleUrl
youtubeUrl
Contact
email
phone
location
contactFormEnabled
Analytics
googleAnalyticsId
plausibleDomain
enabled
Integrations

Payload stores configuration only.

Secrets must stay in environment variables.

Examples:

GitHub token
SMTP password
social API secrets
storage credentials
UI Mapping
Landing Page

Uses:

Homepage global
Projects collection
TechStack collection
Testimonials collection
Social global
Contact global
Projects List

Uses:

Projects collection
Categories collection
TechStack collection
Single Project Page

Uses:

Project document
ProjectVersions collection
related BlogPosts
GitHub API live data
Media gallery
Blog List

Uses:

BlogPosts collection
Categories collection
Blog Article

Uses:

BlogPost document
related Project document
author
Contact Page

Uses:

Contact global
ContactMessages collection
Animation Rules

Payload stores data.
Frontend owns animation.

Do not store animation types in Payload unless a real content need appears.

Project Page Animations
progress bar animates from 0 to current progress
status badge fades in
tech stack chips appear with stagger animation
GitHub counters count up
gallery items reveal on scroll
version history appears as a timeline
CTA buttons use hover microinteractions
Main Rule

Animation must support the content, not distract from it.

GitHub Integration

Payload stores:

GitHub URL
repository owner
repository name
whether GitHub stats are visible

Frontend fetches or later caches:

latest commit
stars
forks
open issues
contributors
releases

No GitHub secret should be stored in Payload.

Use environment variables.

Access Model

There is no public registration.

Users are only:

admin
author
Admin

Can manage everything.

Author

Can manage own blog posts and selected content if needed.

For v1.0, keep access simple.

Not Included in v1.0
public registration
public profiles
comments
likes
subscriptions
chat
marketplace
social network features
custom CMS
NestJS backend
full admin rewrite
Final Rule

If a feature is not required to release v1.0, move it to the future roadmap.
```
