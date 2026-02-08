import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export interface DateGroup {
  date: string;
  posts: PostMeta[];
}

const DRAFTS_DIR = path.join(process.cwd(), "drafts-blog");
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function scanDir(dir: string): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const dateStr =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : String(data.date ?? "");
      return {
        title: data.title ?? "",
        slug: data.slug ?? file.replace(/\.md$/, ""),
        date: dateStr,
        author: data.author ?? "Oli",
        excerpt: data.excerpt ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        published: data.published !== false,
        content,
      } satisfies Post;
    });
}

export function getAllPosts(): Post[] {
  const drafts = scanDir(DRAFTS_DIR);
  const content = scanDir(CONTENT_DIR);
  return [...drafts, ...content]
    .filter((p) => p.published)
    .sort((a, b) => {
      const d = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (d !== 0) return d;
      return a.slug.localeCompare(b.slug);
    });
}

export function getPostsByDate(date: string): Post[] {
  return getAllPosts().filter((p) => p.date === date);
}

export function getPostByDateAndSlug(
  date: string,
  slug: string
): Post | null {
  return (
    getAllPosts().find((p) => p.date === date && p.slug === slug) ?? null
  );
}

export function getGroupedByDate(): DateGroup[] {
  const posts = getAllPosts();
  const map = new Map<string, PostMeta[]>();

  for (const { content: _, ...meta } of posts) {
    const list = map.get(meta.date) ?? [];
    list.push(meta);
    map.set(meta.date, list);
  }

  return Array.from(map.entries())
    .map(([date, posts]) => ({ date, posts }))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getAllDates(): string[] {
  return getGroupedByDate().map((g) => g.date);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

// ── Admin helpers (content/blog only) ──

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

export function getAllPostsIncludingDrafts(): Post[] {
  const drafts = scanDir(DRAFTS_DIR);
  const content = scanDir(CONTENT_DIR);
  return [...drafts, ...content].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function savePost(filename: string, content: string): void {
  ensureContentDir();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  fs.writeFileSync(path.join(CONTENT_DIR, safeName), content, "utf-8");
}

export function deletePost(slug: string): void {
  for (const dir of [CONTENT_DIR, DRAFTS_DIR]) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      if (data.slug === slug || file.replace(/\.md$/, "") === slug) {
        fs.unlinkSync(path.join(dir, file));
        return;
      }
    }
  }
}
