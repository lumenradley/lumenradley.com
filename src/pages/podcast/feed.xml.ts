import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { escapeXml, toRfc2822, mdToHtml } from "../../lib/feed-utils";

const OP3_PREFIX = "https://op3.dev/e";

const SERIES_LABELS: Record<string, string> = {
  research: "Research Digest",
  essay: "Essay",
  making: "Making",
  dance: "Dance Notes",
  conversation: "Conversation",
};

export async function GET(context: APIContext) {
  const site = context.site!.href.replace(/\/$/, "");
  const episodes = (await getCollection("podcast", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const episodePath = (ep: (typeof episodes)[number]) =>
    `${site}/podcast/${(ep.slug ?? ep.id).replace(/\.md$/, "")}/`;

  const artworkUrl = `${site}/podcast-artwork.jpg`;

  const items = episodes
    .map((ep) => {
      const d = ep.data;
      const link = episodePath(ep);
      const guid = link;
      const enclosureUrl = `${OP3_PREFIX}/${d.audioUrl}`;
      const showNotesHtml = ep.body ? mdToHtml(ep.body) : "";

      return `    <item>
      <title>${escapeXml(d.title)}</title>
      <description>${escapeXml(d.description)}</description>
      <content:encoded><![CDATA[${showNotesHtml}]]></content:encoded>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <pubDate>${toRfc2822(d.pubDate)}</pubDate>
      <enclosure url="${escapeXml(enclosureUrl)}" length="${d.audioSize}" type="audio/mpeg" />
      <itunes:title>${escapeXml(d.title)}</itunes:title>
      <itunes:summary>${escapeXml(d.description)}</itunes:summary>
      <itunes:duration>${d.duration}</itunes:duration>
      <itunes:image href="${artworkUrl}" />
      <itunes:explicit>${d.explicit ? "true" : "false"}</itunes:explicit>
      <itunes:keywords>${escapeXml(SERIES_LABELS[d.series] ?? d.series)}</itunes:keywords>${d.episodeNumber != null ? `\n      <itunes:episode>${d.episodeNumber}</itunes:episode>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:podcast="https://podcastindex.org/namespace/1.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lumen Radley</title>
    <link>${site}</link>
    <description>Long-form audio essays and research field notes on AI, software, cognition, and modern life. Each piece aims to leave you with a sharper model of something that matters.</description>
    <language>en</language>
    <copyright>&#xA9; 2026 Lumen Radley</copyright>
    <atom:link href="${site}/podcast/feed.xml" rel="self" type="application/rss+xml" />

    <itunes:subtitle>Research-driven audio essays on AI, cognition, and modern life</itunes:subtitle>
    <itunes:summary>Long-form audio essays and field notes for people trying to think clearly. Independent, calm, and model-driven.</itunes:summary>
    <itunes:author>Lumen Radley</itunes:author>
    <itunes:owner>
      <itunes:name>Lumen Radley</itunes:name>
      <itunes:email>podcast@lumenradley.com</itunes:email>
    </itunes:owner>
    <itunes:image href="${site}/podcast-artwork.jpg" />
    <itunes:category text="Education">
      <itunes:category text="Self-Improvement" />
    </itunes:category>
    <itunes:category text="Technology" />
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>

${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}
