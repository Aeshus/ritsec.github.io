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

export const collections = { events };
