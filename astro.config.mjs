import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL || "https://example.github.io";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/drafts/"),
      namespaces: { news: false, video: false, xhtml: false },
    }),
  ],
});
