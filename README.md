# lumenradley.com

Personal site built with Astro. Static HTML, Markdown content, RSS feed.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

Deploys to Cloudflare Pages from the `nexus` branch.

## Structure

- `src/content/blog/` -- Markdown posts
- `src/pages/` -- Routes: `/`, `/blog`, `/podcast`, `/rss.xml`
- `src/layouts/` -- Shared page layout
- `public/` -- Static assets (favicon, robots.txt, headers)

## License

- Code: MIT (see `LICENSE`)
- Written/audio content: all rights reserved (see `CONTENT_LICENSE.md`)
