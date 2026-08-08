import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fontDir = path.join(root, "assets/fonts");
const fontConfigPath = path.join(fontDir, "fontconfig.xml");
await fs.writeFile(fontConfigPath, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>/tmp/insight-blog-fontconfig-cache</cachedir>
  <config></config>
</fontconfig>`);
process.env.FONTCONFIG_FILE = fontConfigPath;
const { default: sharp } = await import("sharp");
const collections = [["posts", "ko"], ["posts-en", "en"]];

const COLORS = {
  background: "#f5f2eb",
  ink: "#18131f",
  muted: "#5f5869",
  violet: "#6946df",
  violetSoft: "#e7dfff",
  footer: "#736b7c",
  line: "#d8d2d8",
};

const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
})[char]);

const frontmatterValue = (source, key, fallback = "") => {
  const value = source.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, "m"))?.[1];
  return value?.trim() || fallback;
};

const charWidth = (char) => /[\u1100-\u11ff\u3130-\u318f\u3400-\u9fff\uac00-\ud7af]/.test(char) ? 1 : /\s/.test(char) ? 0.3 : 0.55;

function wrapText(text, maxWidth, maxLines = 2) {
  const words = /\s/.test(text) ? text.split(/\s+/) : [...text];
  const separator = /\s/.test(text) ? " " : "";
  const lines = [];
  let line = "";
  let width = 0;

  let truncated = false;
  for (const word of words) {
    const piece = line ? `${separator}${word}` : word;
    const pieceWidth = [...piece].reduce((sum, char) => sum + charWidth(char), 0);
    if (line && width + pieceWidth > maxWidth && lines.length < maxLines - 1) {
      lines.push(line);
      line = word;
      width = [...word].reduce((sum, char) => sum + charWidth(char), 0);
    } else if (line && width + pieceWidth > maxWidth) {
      truncated = true;
      break;
    } else {
      line += piece;
      width += pieceWidth;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  if (truncated) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[,.!?…\s]+$/, "")}…`;
  }
  return lines;
}

const textLines = (lines, { x, y, lineHeight, className }) => lines
  .map((line, index) => `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`)
  .join("");

async function renderCard({ output, title, subtitle, lang = "ko", footer = "ENGINEERING NOTE" }) {
  const titleUnits = [...title].reduce((sum, char) => sum + charWidth(char), 0);
  const titleSize = lang === "ko"
    ? (titleUnits <= 22 ? 92 : titleUnits <= 27 ? 81 : 74)
    : (titleUnits <= 34 ? 81 : titleUnits <= 43 ? 70 : 63);
  const titleLines = wrapText(title, 1040 / titleSize, lang === "ko" ? 2 : 3);
  const subtitleX = 64;
  const subtitleLines = wrapText(subtitle, (1136 - subtitleX) / 44, 2);
  const titleY = titleLines.length === 1 ? 284 : titleLines.length === 2 ? 222 : 180;
  const titleLineHeight = Math.round(titleSize * 1.12);
  const subtitleY = 430;
  const siteTitle = lang === "ko" ? "문제를 푸는 일" : "The Work of Solving Problems";

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        text { font-family: "Noto Sans KR", sans-serif; }
        .brand { fill: ${COLORS.ink}; font-size: 33px; font-weight: 850; letter-spacing: .5px; }
        .title { fill: ${COLORS.ink}; font-size: ${titleSize}px; font-weight: 900; letter-spacing: -1.2px; }
        .subtitle { fill: ${COLORS.muted}; font-size: 44px; font-weight: 720; letter-spacing: .6px; }
        .footer { fill: ${COLORS.footer}; font-size: 28px; font-weight: 800; letter-spacing: 2px; }
        .domain { fill: ${COLORS.violet}; }
      </style>
    </defs>
    <rect width="1200" height="630" fill="${COLORS.background}"/>
    <circle cx="1170" cy="-75" r="215" fill="${COLORS.violetSoft}" opacity=".82"/>
    <rect x="64" y="50" width="30" height="30" rx="10" fill="${COLORS.violet}"/>
    <rect x="72" y="58" width="30" height="30" rx="10" fill="${COLORS.violetSoft}"/>
    <text x="118" y="80" class="brand">${escapeXml(siteTitle)}</text>
    ${textLines(titleLines, { x: 64, y: titleY, lineHeight: titleLineHeight, className: "title" })}
    ${textLines(subtitleLines, { x: subtitleX, y: subtitleY, lineHeight: 58, className: "subtitle" })}
    <line x1="64" y1="542" x2="1136" y2="542" stroke="${COLORS.line}" stroke-width="2"/>
    <text x="64" y="590" class="footer">${escapeXml(footer)}</text>
    <text x="1136" y="590" text-anchor="end" class="footer domain">blog.vumy.kr</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
}

await renderCard({
  output: path.join(root, "public/og-default.png"),
  title: "기술과 조직의 문제를 풀어간 기록",
  subtitle: "문제를 정의하고, 선택하고, 실행한 과정을 돌아봅니다.",
  footer: "HANBEOM",
});
await renderCard({
  output: path.join(root, "public/og-default-en.png"),
  title: "How I Solve Problems Across Tech and Teams",
  subtitle: "Notes on the problem, the choice, and what happened next.",
  lang: "en",
  footer: "HANBEOM",
});
await renderCard({
  output: path.join(root, "public/og-about.png"),
  title: "어떤 문제를 왜, 어떻게 풀었는가",
  subtitle: "선택의 근거와 시행착오, 다음에 바꿀 점을 남깁니다.",
  footer: "ABOUT",
});
await renderCard({
  output: path.join(root, "public/og-about-en.png"),
  title: "Why and How I Solve Problems",
  subtitle: "The reasons, mistakes, and lessons behind each choice.",
  lang: "en",
  footer: "ABOUT",
});

for (const [directory, lang] of collections) {
  const sourceDir = path.join(root, "src/content", directory);
  const outputDir = path.join(root, "public/og", lang);
  await fs.mkdir(outputDir, { recursive: true });
  const names = (await fs.readdir(sourceDir)).filter((name) => /\.mdx?$/.test(name));

  for (const name of names) {
    const source = await fs.readFile(path.join(sourceDir, name), "utf8");
    if (/\bdraft:\s*true\b/.test(source)) continue;
    const slug = name.replace(/\.mdx?$/, "");
    await renderCard({
      output: path.join(outputDir, `${slug}.png`),
      title: frontmatterValue(source, "title", slug),
      subtitle: frontmatterValue(source, "decision", frontmatterValue(source, "description")),
      lang,
    });
  }
}

await fs.rm(fontConfigPath, { force: true });
