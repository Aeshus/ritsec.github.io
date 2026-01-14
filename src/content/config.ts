import { z, reference, defineCollection } from "astro:content";

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
            logo: z.string(),
        }),
});

const schedule = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        start: z.date(),
        end: z.date(),
        location: z.string().default("GOL 1400"),
        group: z.union([reference("groups"), z.string()]).default("general"),
        hosts: z.array(z.string()).default(["RITSEC Board"]),
        slides: z.string().url().optional(),
        video: z.string().url().optional(),
        zoom: z.string().url().optional(),
        status: z
            .enum(["scheduled", "cancelled", "postponed"])
            .default("scheduled"),
        featured: z.boolean().default(false),
    }),
});

export const collections = { groups, schedule };
