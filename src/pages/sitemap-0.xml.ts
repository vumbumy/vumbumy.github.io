import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]!);

export const GET: APIRoute = async ({ site }) => {
  const koPosts = await getCollection("posts", ({ data }) => !data.draft);
  const enPosts = await getCollection("postsEn", ({ data }) => !data.draft);
  const enById = new Map(enPosts.map((post) => [post.id, post]));
  const latest = [...koPosts, ...enPosts].reduce((date, post) => {
    const changed = post.data.updated ?? post.data.published;
    return changed > date ? changed : date;
  }, new Date("2026-01-01"));
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const absolute = (path: string) => new URL(`${base}${path}`, site).href;
  const entries: Array<{ path: string; lastmod?: Date; ko?: string; en?: string }> = [
    { path: "/", lastmod: latest, ko: "/", en: "/en/" },
    { path: "/en/", lastmod: latest, ko: "/", en: "/en/" },
    { path: "/about/", ko: "/about/", en: "/en/about/" },
    { path: "/en/about/", ko: "/about/", en: "/en/about/" },
    { path: "/archive/", lastmod: latest, ko: "/archive/", en: "/en/archive/" },
    { path: "/en/archive/", lastmod: latest, ko: "/archive/", en: "/en/archive/" },
  ];

  for (const post of koPosts) {
    const en = enById.get(post.data.translationSlug ?? post.id);
    entries.push({ path: `/posts/${post.id}/`, lastmod: post.data.updated ?? post.data.published, ko: `/posts/${post.id}/`, en: en ? `/en/posts/${en.id}/` : undefined });
  }
  for (const post of enPosts) {
    const koId = post.data.translationSlug ?? post.id;
    const ko = koPosts.find((item) => item.id === koId);
    entries.push({ path: `/en/posts/${post.id}/`, lastmod: post.data.updated ?? post.data.published, ko: ko ? `/posts/${ko.id}/` : undefined, en: `/en/posts/${post.id}/` });
  }
  // Tag archives remain available through normal links. The sitemap nominates
  // articles and primary navigation pages, rather than every generated listing.

  const urls = entries.map((entry) => {
    const alternates = [
      entry.ko && `<xhtml:link rel="alternate" hreflang="ko" href="${escapeXml(absolute(entry.ko))}"/>`,
      entry.en && `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(absolute(entry.en))}"/>`,
      entry.ko && `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(entry.ko))}"/>`,
    ].filter(Boolean).join("");
    return `<url><loc>${escapeXml(absolute(entry.path))}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod.toISOString()}</lastmod>` : ""}${alternates}</url>`;
  }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
