import { getCollection } from "astro:content";
import { SITE, SITE_EN } from "../config";
import { sortPosts } from "./posts";

const xml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]!);

export async function feed(site: URL | undefined, lang: "ko" | "en") {
  const config = lang === "en" ? SITE_EN : SITE;
  const posts = sortPosts(await getCollection(lang === "en" ? "postsEn" : "posts", ({ data }) => !data.draft));
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const home = new URL(`${base}/${lang === "en" ? "en/" : ""}`, site).href;
  const self = new URL("rss.xml", home).href;
  const items = posts.map((post) => {
    const url = new URL(`posts/${post.id}/`, home).href;
    return `<item><title>${xml(post.data.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.data.description)}</description><pubDate>${post.data.published.toUTCString()}</pubDate>${post.data.tags.map((tag: string) => `<category>${xml(tag)}</category>`).join("")}</item>`;
  }).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(config.title)}</title><link>${xml(home)}</link><description>${xml(config.description)}</description><language>${lang}</language><atom:link href="${xml(self)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
