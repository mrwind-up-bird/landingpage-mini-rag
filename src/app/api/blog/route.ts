import { NextRequest, NextResponse } from "next/server";
import { getAllPostsIncludingDrafts, savePost } from "@/lib/blog-storage";

export async function GET() {
  const posts = getAllPostsIncludingDrafts();
  return NextResponse.json(posts.map(({ content: _, ...meta }) => meta));
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.BLOG_ADMIN_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { filename, content } = body as { filename: string; content: string };

  if (!filename || !content) {
    return NextResponse.json(
      { error: "filename and content are required" },
      { status: 400 }
    );
  }

  savePost(filename, content);
  return NextResponse.json({ ok: true }, { status: 201 });
}
