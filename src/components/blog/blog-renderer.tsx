interface BlogRendererProps {
  html: string;
}

export function BlogRenderer({ html }: BlogRendererProps) {
  return (
    <div
      className="prose prose-lg prose-glass max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
