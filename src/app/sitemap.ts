import type { MetadataRoute } from "next";
import { getAllPosts, getAllDates } from "@/lib/blog-storage";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minirag.dev";
  const posts = getAllPosts();
  const dates = getAllDates();

  const dateEntries: MetadataRoute.Sitemap = dates.map((date) => ({
    url: `${siteUrl}/blog/${date}`,
    lastModified: new Date(date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.date}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...dateEntries,
    ...postEntries,
  ];
}
