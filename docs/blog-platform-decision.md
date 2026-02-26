# Blog Platform Decision

Date: 2026-02-19

## Recommendation

Use `Astro + Markdown + Git + static hosting` as the v1 architecture.

Why:

- Fast writing workflow with low maintenance.
- Full ownership of content and URLs.
- Native RSS support.
- Easy to add newsletter and podcast links without locking into a platform.

## What Your Reference Blogs Use

1. Simon Willison: custom Django app on Heroku + PostgreSQL, source in GitHub.
2. Lex Fridman: WordPress.
3. Peter Steinberger (`steipete`): Astro, deployed on Vercel, source repo public.
4. Armin Ronacher: content in reStructuredText + small custom build script, source in GitHub, static hosting (served via GitHub Pages headers).
5. Mario Zechner: appears to be a custom static site (HTML/JS + RSS feed); no explicit generator label found.

## Alternatives Compared

### Option A: Astro (recommended)

- Best for: personal publishing, technical writing, RSS, long-term control.
- Pros: static by default, simple content model, easy custom design, low hosting cost.
- Cons: you own your publishing workflow (no rich CMS UI out of the box).

### Option B: WordPress

- Best for: non-technical publishing with many plugins.
- Pros: admin UI, huge plugin ecosystem.
- Cons: more security and maintenance overhead, heavier stack.

### Option C: Ghost

- Best for: newsletter-first paid subscriptions.
- Pros: polished editor, memberships and email built-in.
- Cons: stronger platform coupling, less flexible for custom product-like pages.

### Option D: Next.js + Headless CMS

- Best for: very custom dynamic product sites with editorial teams.
- Pros: maximum flexibility.
- Cons: complexity overkill for solo personal blog v1.

## Decisions You Should Make Now

1. Canonical domain (`yourname.com` vs a brand domain).
2. Whether newsletter is:
   - Substack as primary, or
   - Your own site as primary + Substack syndication.
3. Podcast strategy:
   - Host audio externally and link from your site (recommended), or
   - Self-host audio files (not recommended initially).
4. Hosting platform:
   - Vercel / Netlify / Cloudflare Pages.
5. Analytics:
   - Plausible, Fathom, or none.

## Suggested Domain / Subdomain Architecture

- `yourdomain.com`: main site + blog.
- `podcast.yourdomain.com`: optional redirect to podcast landing page or host.
- `newsletter.yourdomain.com`: optional redirect to Substack.
- `feeds.yourdomain.com` (optional later): dedicated feed endpoints.

## Migration Safety

Keep all posts in this repo as Markdown. Even if you use Substack or another platform later, republishing from source stays easy and vendor lock-in stays low.
