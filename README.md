# Lumen Radley Website

Astro-based personal site with Markdown content, RSS, and a podcast links page.

## Quick Start

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm preview
```

## Project Structure

- `src/content/blog/`: Markdown posts.
- `src/pages/`: site routes (`/`, `/blog`, `/podcast`, `/rss.xml`).
- `src/layouts/`: shared page layout.
- `docs/blog-platform-decision.md`: architecture decisions and alternatives.
- `docs/launch-checklist.md`: practical launch plan.

## Customize Before Launch

1. Set real site URL in `astro.config.mjs`.
2. Replace placeholder name in `src/layouts/BaseLayout.astro`.
3. Add real posts and remove sample content.

## Publishing Links

- Site: `https://lumenradley.com`
- Substack: `https://lumenradley.substack.com`
- RSS: `https://lumenradley.com/rss.xml`

## License

- Code: MIT (see `LICENSE`)
- Written/audio content: all rights reserved (see `CONTENT_LICENSE.md`)
