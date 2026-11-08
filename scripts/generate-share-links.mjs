import fs from 'node:fs/promises';
const folder = new URL('../src/content/posts/', import.meta.url);
const rows = [['title', 'article_url', 'linkedin_url', 'campaign']];
for (const name of (await fs.readdir(folder)).sort()) {
  if (!name.endsWith('.md')) continue;
  const text = await fs.readFile(new URL(name, folder), 'utf8');
  if (/^draft:\s*true$/m.test(text)) continue;
  const title = text.match(/^title:\s*"(.*)"$/m)?.[1] || name;
  const slug = name.slice(0, -3);
  const url = new URL(`https://blog.vumy.kr/posts/${encodeURIComponent(slug)}/`);
  const campaign = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const share = new URL(url);
  for (const [key, value] of Object.entries({ utm_source: 'linkedin', utm_medium: 'social', utm_campaign: campaign, utm_content: 'post-01' })) share.searchParams.set(key, value);
  rows.push([title, url.href, share.href, campaign]);
}
await fs.mkdir(new URL('../docs/', import.meta.url), { recursive: true });
const csv = '\uFEFF' + rows.map(row => row.map(v => '"' + v.replaceAll('"', '""') + '"').join(',')).join('\n') + '\n';
await fs.writeFile(new URL('../docs/linkedin-share-links.csv', import.meta.url), csv);
console.log(`Created ${rows.length - 1} tagged sharing links`);
