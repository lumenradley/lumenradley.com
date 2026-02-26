import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const podcast = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    duration: z.string(),
    audioUrl: z.string().url(),
    audioSize: z.number(),
    series: z.string(),
    episodeNumber: z.number().optional(),
    guest: z.string().optional(),
    explicit: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, podcast };
