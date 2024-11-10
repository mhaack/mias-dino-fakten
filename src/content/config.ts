import { defineCollection, z } from 'astro:content'

const dinoCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    namesuffix: z.string().optional(),
    published: z.date(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(''),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default(''),
    lang: z.string().optional().default(''),

    /* For internal use */
    prevTitle: z.string().default(''),
    prevSlug: z.string().default(''),
    nextTitle: z.string().default(''),
    nextSlug: z.string().default(''),

    /* custom for dino page */
    years: z.string().optional().default(''),
    family: z.string().optional().default(''),
    location: z.string().optional().default(''),
    locations: z.array(z.string()).optional().default([]),
    finder: z.string().optional().default(''),
    food: z.string().optional().default(''),
    weight: z.string().optional().default(''),
    size: z.string().optional().default(''),
    dotm: z
      .array(z.object({ month: z.date() }))
      .optional()
      .default([]),
    sources: z.array(z.string()).optional().default([]),
  }),
})
export const collections = {
  dinos: dinoCollection,
}
