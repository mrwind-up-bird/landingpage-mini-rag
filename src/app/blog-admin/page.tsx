"use client";

import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassInput } from "@/components/ui/glass-input";
import { BlogUpload } from "@/components/blog/blog-upload";

interface PostMeta {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  published: boolean;
}

export default function BlogAdmin() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [inputToken, setInputToken] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("blog-admin-token");
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/blog", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }, [token]);

  useEffect(() => {
    if (authed && token) fetchPosts();
  }, [authed, token, fetchPosts]);

  const handleLogin = () => {
    sessionStorage.setItem("blog-admin-token", inputToken);
    setToken(inputToken);
    setAuthed(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"?`)) return;
    setDeleting(slug);
    await fetch(`/api/blog/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleting(null);
    fetchPosts();
  };

  if (!authed) {
    return (
      <>
        <Navigation />
        <main id="main" className="relative z-2 flex min-h-screen items-center justify-center px-4">
          <GlassCard className="w-full max-w-sm">
            <h1 className="mb-6 text-center font-[family-name:var(--font-heading)] text-xl font-bold">
              Blog Admin
            </h1>
            <div className="space-y-4">
              <GlassInput
                label="Admin Token"
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter your admin token"
              />
              <GlassButton onClick={handleLogin} className="w-full">
                Sign In
              </GlassButton>
            </div>
          </GlassCard>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main id="main" className="relative z-2 px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
              Blog Admin
            </h1>
            <GlassButton
              variant="ghost"
              onClick={() => {
                sessionStorage.removeItem("blog-admin-token");
                setAuthed(false);
                setToken("");
              }}
            >
              Sign Out
            </GlassButton>
          </div>

          <section className="mb-12">
            <h2 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Upload Post
            </h2>
            <BlogUpload token={token} onUploaded={fetchPosts} />
          </section>

          <section>
            <h2 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
              All Posts
            </h2>
            {posts.length === 0 ? (
              <p className="text-sm text-[var(--text-tertiary)]">
                No posts yet.
              </p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <GlassCard key={post.slug} className="flex items-center justify-between gap-4 !p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-sm">
                          {post.title}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            post.published
                              ? "bg-[var(--success)]/10 text-[var(--success)]"
                              : "bg-[var(--warm-glow)] text-[var(--warm)]"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                        {post.date} &middot; {post.slug}
                      </p>
                    </div>
                    <GlassButton
                      variant="danger"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="shrink-0 !px-3 !py-1.5 text-xs"
                    >
                      {deleting === post.slug ? "..." : "Delete"}
                    </GlassButton>
                  </GlassCard>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
