import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(40).max(180),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    problem: z.string().max(180).optional(),
    decision: z.string().max(180).optional(),
    outcome: z.string().max(180).optional(),
    draft: z.boolean().default(true),
    author: z.string().default("Hanbeom"),
  }),
});

export const collections = { posts };
