import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, deletePost } from "@/lib/blog-storage";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const post = getAllPosts().find((p) => p.slug === slug) ?? null;

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.BLOG_ADMIN_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  deletePost(slug);
  return NextResponse.json({ ok: true });
}
