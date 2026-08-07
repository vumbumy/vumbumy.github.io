import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
    translationSlug: z.string().optional(),
    image: z.string().optional(),
  }),
});

const postsEn = defineCollection({
  loader: glob({ base: "./src/content/posts-en", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().max(100),
    description: z.string().min(40).max(220),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    problem: z.string().max(220).optional(),
    decision: z.string().max(220).optional(),
    outcome: z.string().max(220).optional(),
    draft: z.boolean().default(true),
    author: z.string().default("Hanbeom"),
    translationSlug: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts, postsEn };
