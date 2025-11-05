import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders'; 

const events = defineCollection({
  loader: file('src/data/events.yml'),
  schema: z.object({
    name: z.string(),
    date: z.string(),
    where: z.string(),
    url: z.string(),
    featured: z.boolean(),
  }),
});

const alumni = defineCollection({
  loader: file('src/data/alumni.yml'),
  schema: z.object({
    id: z.number(),
    alumni: z.array(z.string(),)
  }),
});

export const collections = { alumni, events };
