// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://ritsec.club",
    integrations: [expressiveCode(), mdx(), react()],
});