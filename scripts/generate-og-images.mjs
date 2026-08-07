import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fontDir = path.join(root, "assets/fonts");
const fontConfigPath = path.join(fontDir, "fontconfig.xml");

await fs.writeFile(fontConfigPath, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <cachedir>/tmp/fontconfig-cache</cachedir>
  <config></config>
</fontconfig>`);
process.env.FONTCONFIG_FILE = fontConfigPath;

const { default: sharp } = await import("sharp");
const collections = [["posts", "ko"], ["posts-en", "en"]];
const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]);

const field = (source, name, fallback = "") => {
  const raw = source.match(new RegExp(`^${name}:\\s*(.*?)\\s*$`, "m"))?.[1] ?? fallback;
  return raw.replace(/^(["'])(.*)\1$/, "$2").trim();
};

const units = (value) => [...value].reduce((total, char) => total + (/[^\u0000-\u00ff]/.test(char) ? 1 : .56), 0);

const wrap = (value, maxUnits, maxLines) => {
  const words = value.trim().split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (units(candidate) <= maxUnits || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = `${visible[maxLines - 1].replace(/[.,;:]?$/, "")}…`;
    return visible;
  }
  return lines;
};

const tspans = (lines, x, lineHeight) => lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("");

for (const [directory, lang] of collections) {
  const sourceDir = path.join(root, "src/content", directory);
  const outputDir = path.join(root, "public/og", lang);
  await fs.mkdir(outputDir, { recursive: true });
  const names = (await fs.readdir(sourceDir)).filter((name) => /\.mdx?$/.test(name));
  for (const name of names) {
    const source = await fs.readFile(path.join(sourceDir, name), "utf8");
    if (/\bdraft:\s*true\b/.test(source)) continue;
    const slug = name.replace(/\.mdx?$/, "");
    const title = field(source, "title", slug);
    const decision = field(source, "decision", field(source, "description"));
    const date = field(source, "published").slice(0, 10);
    const titleLines = wrap(title, lang === "ko" ? 20 : 33, 3);
    const decisionLines = wrap(decision, lang === "ko" ? 43 : 68, 2);
    const label = lang === "ko" ? "문제 해결 회고" : "PROBLEM-SOLVING REVIEW";
    const decisionLabel = lang === "ko" ? "핵심 선택" : "KEY DECISION";
    const flow = lang === "ko" ? "문제 정의  →  선택  →  실행  →  회고" : "DEFINE  →  CHOOSE  →  ACT  →  REVIEW";
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#f5f7fb"/>
      <rect x="0" y="0" width="1200" height="12" fill="#5548cf"/>
      <rect x="72" y="67" width="44" height="44" rx="12" fill="#101725"/>
      <text x="94" y="98" text-anchor="middle" fill="#f5f7fb" font-family="Noto Sans KR" font-size="20" font-weight="700">H</text>
      <text x="132" y="97" fill="#5548cf" font-family="Noto Sans KR" font-size="18" font-weight="700" letter-spacing="2">${label}</text>
      <text x="1128" y="97" text-anchor="end" fill="#687386" font-family="Noto Sans KR" font-size="17" font-weight="600">${flow}</text>
      <text x="72" y="190" fill="#101725" font-family="Noto Sans KR" font-size="57" font-weight="750" letter-spacing="-2">${tspans(titleLines, 72, 72)}</text>
      <rect x="72" y="426" width="1056" height="128" rx="22" fill="#ffffff" stroke="#dfe4ec"/>
      <rect x="72" y="426" width="8" height="128" rx="4" fill="#5548cf"/>
      <text x="104" y="463" fill="#5548cf" font-family="Noto Sans KR" font-size="15" font-weight="700" letter-spacing="1.5">${decisionLabel}</text>
      <text x="104" y="500" fill="#263246" font-family="Noto Sans KR" font-size="23" font-weight="550">${tspans(decisionLines, 104, 32)}</text>
      <text x="72" y="598" fill="#687386" font-family="Noto Sans KR" font-size="17">${date}</text>
      <text x="1128" y="598" text-anchor="end" fill="#101725" font-family="Noto Sans KR" font-size="17" font-weight="700">blog.vumy.kr</text>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(outputDir, `${slug}.png`));
  }
}

for (const lang of ["ko", "en"]) {
  const isKo = lang === "ko";
  const titleLines = isKo ? ["문제의 답보다,", "답을 찾아간 과정을 씁니다."] : ["I write about the path", "to a solution."];
  const descriptionLines = isKo
    ? ["기술과 조직에 걸친 문제를 정의하고, 선택하고,", "해결해 나간 과정을 돌아봅니다."]
    : ["Notes on how I find and solve problems", "across technology, systems, and teams."];
  const label = isKo ? "문제를 푸는 일" : "SOLVING PROBLEMS AT WORK";
  const flow = isKo ? "문제 정의  →  선택  →  실행  →  회고" : "DEFINE  →  CHOOSE  →  ACT  →  REVIEW";
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f5f7fb"/>
    <rect x="0" y="0" width="1200" height="12" fill="#5548cf"/>
    <rect x="72" y="67" width="44" height="44" rx="12" fill="#101725"/>
    <text x="94" y="98" text-anchor="middle" fill="#f5f7fb" font-family="Noto Sans KR" font-size="20" font-weight="700">H</text>
    <text x="132" y="97" fill="#5548cf" font-family="Noto Sans KR" font-size="18" font-weight="700" letter-spacing="2">${label}</text>
    <text x="1128" y="97" text-anchor="end" fill="#687386" font-family="Noto Sans KR" font-size="17" font-weight="600">${flow}</text>
    <text x="72" y="205" fill="#101725" font-family="Noto Sans KR" font-size="59" font-weight="750" letter-spacing="-2">${tspans(titleLines, 72, 74)}</text>
    <rect x="72" y="425" width="1056" height="128" rx="22" fill="#ffffff" stroke="#dfe4ec"/>
    <rect x="72" y="425" width="8" height="128" rx="4" fill="#0d8876"/>
    <text x="104" y="473" fill="#0d8876" font-family="Noto Sans KR" font-size="15" font-weight="700" letter-spacing="1.5">${isKo ? "이 블로그가 기록하는 것" : "WHAT THIS BLOG RECORDS"}</text>
    <text x="104" y="510" fill="#263246" font-family="Noto Sans KR" font-size="23" font-weight="550">${tspans(descriptionLines, 104, 32)}</text>
    <text x="72" y="598" fill="#687386" font-family="Noto Sans KR" font-size="17">HANBEOM · STAFF ENGINEER</text>
    <text x="1128" y="598" text-anchor="end" fill="#101725" font-family="Noto Sans KR" font-size="17" font-weight="700">blog.vumy.kr</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(root, "public", isKo ? "og-default.png" : "og-default-en.png"));
}

await fs.rm(fontConfigPath, { force: true });
