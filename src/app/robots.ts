import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minirag.dev";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/blog-admin", "/api/", "/traffic", "/success"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
