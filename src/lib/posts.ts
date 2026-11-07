export function sortPosts(posts: any[]) {
  return [...posts].sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export function tagSlug(tag: string) {
  return tag.toLocaleLowerCase().replace(/\s+/g, "-");
}

const readingPaths: Record<string, string[]> = {
  "2026-08-27-design-self-service-with-guardrails": ["2026-08-13-make-verification-the-product", "2026-08-10-remove-deploy-access-after-automation", "2026-11-06-turn-team-tools-into-operated-services"],
  "2026-08-13-make-verification-the-product": ["2026-08-14-govern-vibe-coding-by-risk", "2026-08-27-design-self-service-with-guardrails", "2026-11-06-turn-team-tools-into-operated-services"],
  "2026-08-10-remove-deploy-access-after-automation": ["2026-08-13-make-verification-the-product", "2026-08-27-design-self-service-with-guardrails", "2026-11-06-turn-team-tools-into-operated-services"],
};

export function relatedPosts(current: any, posts: any[], limit = 3) {
  const selected = (readingPaths[current.id] ?? []).map((id) => posts.find((post) => post.id === id)).filter(Boolean);
  const tags = new Set(current.data.tags);
  const ranked = posts
    .filter((post) => post.id !== current.id && !selected.some((item) => item.id === post.id))
    .map((post) => ({ post, score: post.data.tags.filter((tag: string) => tags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.published.valueOf() - a.post.data.published.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
  return [...selected, ...ranked].slice(0, limit);
}

export function adjacentPosts(current: any, posts: any[]) {
  const chronological = [...posts].sort((a, b) => a.data.published.valueOf() - b.data.published.valueOf());
  const index = chronological.findIndex((post) => post.id === current.id);
  return {
    previous: index > 0 ? chronological[index - 1] : undefined,
    next: index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : undefined,
  };
}
