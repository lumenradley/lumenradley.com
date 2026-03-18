import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { escapeXml, mdToHtml, inlineFormat, toRfc2822 } from "../src/lib/feed-utils.ts";

describe("escapeXml", () => {
  it("escapes all XML special characters", () => {
    assert.equal(escapeXml(`<b>"Tom & Jerry's"</b>`), "&lt;b&gt;&quot;Tom &amp; Jerry&apos;s&quot;&lt;/b&gt;");
  });

  it("passes through safe strings unchanged", () => {
    assert.equal(escapeXml("Hello world"), "Hello world");
  });
});

describe("inlineFormat", () => {
  it("converts bold", () => {
    assert.equal(inlineFormat("a **bold** word"), "a <strong>bold</strong> word");
  });

  it("converts italic", () => {
    assert.equal(inlineFormat("an *italic* word"), "an <em>italic</em> word");
  });

  it("converts double dashes to em dash", () => {
    assert.equal(inlineFormat("one -- two"), "one \u2014 two");
  });

  it("handles bold and italic together", () => {
    assert.equal(inlineFormat("**bold** and *italic*"), "<strong>bold</strong> and <em>italic</em>");
  });
});

describe("mdToHtml", () => {
  it("converts a heading", () => {
    assert.equal(mdToHtml("## Chapters"), "<h2>Chapters</h2>");
  });

  it("converts a paragraph", () => {
    assert.equal(mdToHtml("Hello world."), "<p>Hello world.</p>");
  });

  it("converts a list", () => {
    const md = "- one\n- two\n- three";
    assert.equal(mdToHtml(md), "<ul>\n<li>one</li>\n<li>two</li>\n<li>three</li>\n</ul>");
  });

  it("closes list before heading", () => {
    const md = "- item\n\n## Next";
    assert.equal(mdToHtml(md), "<ul>\n<li>item</li>\n</ul>\n<h2>Next</h2>");
  });

  it("closes unclosed list at end", () => {
    const md = "- last item";
    assert.equal(mdToHtml(md), "<ul>\n<li>last item</li>\n</ul>");
  });

  it("preserves chapter timestamps in list items", () => {
    const md = "## Chapters\n\n- 00:00 -- Introduction\n- 02:34 -- Part Two";
    const html = mdToHtml(md);
    assert.ok(html.includes("<li>00:00 \u2014 Introduction</li>"), "first chapter with timestamp");
    assert.ok(html.includes("<li>02:34 \u2014 Part Two</li>"), "second chapter with timestamp");
  });

  it("converts full show notes structure", () => {
    const md = `Opening paragraph.

## What's inside

- Item one
- Item two

## Chapters

- 00:00 -- Intro
- 25:23 -- Part Five`;

    const html = mdToHtml(md);
    assert.ok(html.includes("<p>Opening paragraph.</p>"), "has opening paragraph");
    assert.ok(html.includes("<h2>What\u2019s inside</h2>") || html.includes("<h2>What's inside</h2>"), "has section heading");
    assert.ok(html.includes("<h2>Chapters</h2>"), "has chapters heading");
    assert.ok(html.includes("<li>00:00 \u2014 Intro</li>"), "has chapter timestamp");
    assert.ok(html.includes("<li>25:23 \u2014 Part Five</li>"), "has chapter timestamp");
  });

  it("handles empty input", () => {
    assert.equal(mdToHtml(""), "");
  });
});

describe("toRfc2822", () => {
  it("formats a date", () => {
    const d = new Date("2026-03-08T00:00:00Z");
    const result = toRfc2822(d);
    assert.ok(result.includes("2026"), "includes year");
    assert.ok(result.includes("Mar"), "includes month");
  });
});
