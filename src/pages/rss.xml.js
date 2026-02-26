import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const postPath = (post) => `/blog/${(post.slug ?? post.id).replace(/\.md$/, "")}/`;

  return rss({
    title: "Lumen Radley",
    description: "Posts about software, writing, and experiments.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: postPath(post)
    }))
  });
}
