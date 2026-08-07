import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const collections = [["posts", "ko"], ["posts-en", "en"]];
const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]);

for (const [directory, lang] of collections) {
  const sourceDir = path.join(root, "src/content", directory);
  const outputDir = path.join(root, "public/og", lang);
  await fs.mkdir(outputDir, { recursive: true });
  const names = (await fs.readdir(sourceDir)).filter((name) => /\.mdx?$/.test(name));
  for (const name of names) {
    const source = await fs.readFile(path.join(sourceDir, name), "utf8");
    if (/\bdraft:\s*true\b/.test(source)) continue;
    const slug = name.replace(/\.mdx?$/, "");
    const title = source.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? slug;
    const date = source.match(/^published:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? "";
    const hash = crypto.createHash("sha256").update(title).digest("hex");
    const hue = parseInt(hash.slice(0, 4), 16) % 360;
    const hue2 = (hue + 55) % 360;
    const displayTitle = lang === "en" ? title : "PROBLEM SOLVING NOTES";
    const safeTitle = escapeXml(displayTitle.length > 58 ? `${displayTitle.slice(0, 55)}…` : displayTitle);
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${hue} 68% 45%)"/><stop offset="1" stop-color="hsl(${hue2} 65% 22%)"/></linearGradient></defs><rect width="1200" height="630" fill="#0c1018"/><circle cx="1060" cy="80" r="360" fill="url(#g)" opacity=".75"/><circle cx="100" cy="640" r="300" fill="hsl(${hue2} 70% 45%)" opacity=".22"/><text x="82" y="92" fill="#bcb7ff" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">HANBEOM · STAFF ENGINEER</text><foreignObject x="76" y="165" width="920" height="300"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;color:#fff;font-size:58px;font-weight:700;line-height:1.12;letter-spacing:-1px">${safeTitle}</div></foreignObject><text x="82" y="550" fill="#b8c0ce" font-family="Arial, sans-serif" font-size="24">${date} · blog.vumy.kr</text><text x="1118" y="550" text-anchor="end" fill="#fff" font-family="Arial, sans-serif" font-size="22" font-weight="700">${hash.slice(0, 6).toUpperCase()}</text></svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(outputDir, `${slug}.png`));
  }
}
