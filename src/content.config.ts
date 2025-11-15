import { defineCollection, z, image } from 'astro:content';
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

const eboard = defineCollection({
  loader: file('src/data/eboard.yml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    grad_year: z.number(),
    linked_in: z.string(),
    email: z.string(),
    image: z.string(),
  }),
});

const legacyEboard = defineCollection({
  loader: file('src/data/legacy-eboard.yml'),
  schema: z.object({
    id: z.string(),
    term: z.string(),
    organization: z.string(),
    eboard: z.array(z.object({
      position: z.string(),
      name: z.string(),
    })),
  }),
});

export const collections = { alumni, events, eboard, legacyEboard };
