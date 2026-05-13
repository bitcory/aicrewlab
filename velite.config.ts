import { defineConfig, defineCollection, s } from "velite";

const social = s
  .object({
    youtube: s.string().url().optional(),
    instagram: s.string().url().optional(),
    github: s.string().url().optional(),
    twitter: s.string().url().optional(),
    threads: s.string().url().optional(),
    web: s.string().url().optional(),
  })
  .partial();

const instructors = defineCollection({
  name: "Instructor",
  pattern: "instructors/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("instructor"),
      name: s.string(),
      role: s.string(),
      headline: s.string().max(140),
      specialty: s.enum(["coding", "video", "music", "master"]),
      classes: s.array(s.enum(["ZERO", "UP", "PRO"])).default([]),
      bio: s.string(),
      avatar: s.string().optional(),
      cover: s.string().optional(),
      social: social.optional(),
      featured: s.boolean().default(false),
      order: s.number().default(100),
      body: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/instructors/${data.slug}`,
    })),
});

const portfolios = defineCollection({
  name: "Portfolio",
  pattern: "portfolio/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("portfolio"),
      title: s.string(),
      instructorSlug: s.string(),
      summary: s.string().max(200),
      cover: s.string().optional(),
      youtubeId: s.string().optional(),
      images: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      year: s.number().optional(),
      featured: s.boolean().default(false),
      order: s.number().default(100),
      body: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/instructors/${data.instructorSlug}#${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { instructors, portfolios },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
