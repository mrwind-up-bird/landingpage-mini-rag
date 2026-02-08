"use client";

import { useState, useCallback, type DragEvent, type ChangeEvent } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

interface BlogUploadProps {
  token: string;
  onUploaded: () => void;
}

interface ParsedFrontmatter {
  title?: string;
  slug?: string;
  date?: string;
  author?: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
}

export function BlogUpload({ token, onUploaded }: BlogUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<{
    filename: string;
    content: string;
    meta: ParsedFrontmatter;
  } | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const processFile = useCallback((file: File) => {
    setError("");
    if (!file.name.endsWith(".md")) {
      setError("Only .md files are supported");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const meta: ParsedFrontmatter = {};

      if (frontmatterMatch) {
        const lines = frontmatterMatch[1].split("\n");
        for (const line of lines) {
          const [key, ...rest] = line.split(":");
          const value = rest.join(":").trim().replace(/^["']|["']$/g, "");
          if (key && value) {
            if (key.trim() === "tags") {
              meta.tags = value
                .replace(/^\[|\]$/g, "")
                .split(",")
                .map((t) => t.trim().replace(/^["']|["']$/g, ""));
            } else if (key.trim() === "published") {
              meta.published = value === "true";
            } else {
              (meta as Record<string, unknown>)[key.trim()] = value;
            }
          }
        }
      }

      setPreview({ filename: file.name, content, meta });
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handlePublish = async (published: boolean) => {
    if (!preview) return;
    setUploading(true);
    setError("");

    let content = preview.content;
    if (!published && !content.includes("published: false")) {
      content = content.replace(
        /published:\s*true/,
        "published: false"
      );
    }

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ filename: preview.filename, content }),
    });

    if (!res.ok) {
      setError("Upload failed");
      setUploading(false);
      return;
    }

    setPreview(null);
    setUploading(false);
    onUploaded();
  };

  const missingFields = preview
    ? [
        !preview.meta.title && "title",
        !preview.meta.slug && "slug",
        !preview.meta.date && "date",
      ].filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`glass flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragging
            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
            : "border-[var(--glass-border)]"
        }`}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[var(--text-tertiary)]">
          <path d="M12 15V3m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm text-[var(--text-secondary)]">
          Drag & drop a <code className="text-[var(--accent)]">.md</code> file
          here
        </p>
        <label className="cursor-pointer text-xs text-[var(--accent)] hover:underline">
          or browse files
          <input
            type="file"
            accept=".md"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}

      {/* Preview */}
      {preview && (
        <GlassCard>
          <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
            Preview: {preview.filename}
          </h3>
          <dl className="mb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-[var(--text-tertiary)]">Title</dt>
            <dd>{preview.meta.title || "—"}</dd>
            <dt className="text-[var(--text-tertiary)]">Slug</dt>
            <dd>{preview.meta.slug || "—"}</dd>
            <dt className="text-[var(--text-tertiary)]">Date</dt>
            <dd>{preview.meta.date || "—"}</dd>
            <dt className="text-[var(--text-tertiary)]">Author</dt>
            <dd>{preview.meta.author || "—"}</dd>
            <dt className="text-[var(--text-tertiary)]">Tags</dt>
            <dd>{preview.meta.tags?.join(", ") || "—"}</dd>
          </dl>

          {missingFields.length > 0 && (
            <p className="mb-4 text-sm text-[var(--warm)]">
              Missing required fields: {missingFields.join(", ")}
            </p>
          )}

          <div className="flex gap-3">
            <GlassButton
              onClick={() => handlePublish(true)}
              disabled={missingFields.length > 0 || uploading}
            >
              {uploading ? "Publishing..." : "Publish"}
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() => handlePublish(false)}
              disabled={missingFields.length > 0 || uploading}
            >
              Save Draft
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() => setPreview(null)}
            >
              Cancel
            </GlassButton>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
