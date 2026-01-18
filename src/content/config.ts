import { z, reference, defineCollection } from "astro:content";
import { file } from "astro/loaders";

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

const events = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            start: z.date().optional(),
            end: z.date().optional(),
            location: z.string(),
            access: z.string(),
            summary: z.string(),
            website: z.string().optional(),
            image: image(),
        }),
});

const research = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            authors: z
                .array(
                    z.object({
                        name: z.string(),
                        handle: z.string().optional(),
                        avatar: image().optional(),
                        url: z.string().url().optional(),
                    }),
                )
                .default([]),
            date: z.date(),
            image: image().optional(),
            imageAlt: z.string().optional(),
            group: reference("groups").optional(),
        }),
});

const sponsors = defineCollection({
    loader: file("src/content/sponsors.yml"),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image(),
            url: z.string().url(),
            tier: z.enum([
                "diamond",
                "platinum",
                "gold",
                "silver",
                "educational",
            ]),
            type: z.enum(["company", "individual"]).optional(),
        }),
});

const eboard = defineCollection({
    loader: file("src/content/eboard.yml"),
    schema: ({ image }) =>
        z.object({
            id: z.string(),
            name: z.string(),
            grad_year: z.number(),
            linked_in: z.string(),
            image: image(),
        }),
});

const legacyEboard = defineCollection({
    loader: file("src/content/legacy-eboard.yml"),
    schema: z.object({
        term: z.string(),
        organization: z.string(),
        eboard: z.array(
            z.object({
                position: z.string(),
                name: z.string(),
            }),
        ),
    }),
});

export const collections = {
    groups,
    schedule,
    events,
    research,
    sponsors,
    eboard,
    legacyEboard,
};
