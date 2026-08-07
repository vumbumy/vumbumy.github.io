export function sortPosts(posts: any[]) {
  return [...posts].sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export function tagSlug(tag: string) {
  return tag.toLocaleLowerCase().replace(/\s+/g, "-");
}

export function relatedPosts(current: any, posts: any[], limit = 3) {
  const tags = new Set(current.data.tags);
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({ post, score: post.data.tags.filter((tag: string) => tags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.published.valueOf() - a.post.data.published.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}

export function adjacentPosts(current: any, posts: any[]) {
  const chronological = [...posts].sort((a, b) => a.data.published.valueOf() - b.data.published.valueOf());
  const index = chronological.findIndex((post) => post.id === current.id);
  return {
    previous: index > 0 ? chronological[index - 1] : undefined,
    next: index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : undefined,
  };
}
