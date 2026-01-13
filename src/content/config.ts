import { z, defineCollection } from "astro:content";

const groups = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            summary: z.string(),
            active: z.boolean().default(true),
            meetings: z
                .array(
                    z.object({
                        day: z.enum([
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                        ]),
                        start: z.string().time(),
                        end: z.string().time(),
                        location: z.string(),
                    }),
                )
                .optional(),
            leads: z
                .array(
                    z.object({
                        name: z.string(),
                        handle: z.string().optional(),
                        avatar: image().optional(),
                        url: z.string().url().optional(),
                    }),
                )
                .default([]),
            logo: image().optional(),
        }),
});

export const collections = { groups };
