---
title: "Stack Decision: Astro + Markdown + Static Hosting"
description: "Why this project starts with Astro and where we may evolve later."
pubDate: 2026-02-19
tags:
  - architecture
  - astro
draft: true
---

The first version optimizes for speed and ownership:

- Markdown content in git.
- Static pages for performance and low ops burden.
- RSS generated at build time.

If we later need memberships, advanced editorial workflows, or multi-author publishing, we can add a headless CMS without rewriting the whole site.
