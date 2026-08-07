import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_EN } from "../../config";

export async function GET(context) {
  const posts = (await getCollection("postsEn", ({ data }) => !data.draft))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const site = new URL(`${base}en/`, context.site);
  return rss({
    title: SITE_EN.title,
    description: SITE_EN.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `posts/${post.id}/`,
    })),
  });
}
