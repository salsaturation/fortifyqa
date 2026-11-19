import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";
import BreachCheckCard from "@/components/site/BreachCheckCard";
import PageNotFound from "@/lib/PageNotFound";
import { POSTS } from "@/lib/content";

// Post bodies live in src/posts/<slug>.md and are bundled at build time.
const BODIES = Object.fromEntries(
  Object.entries(import.meta.glob("../posts/*.md", { query: "?raw", import: "default", eager: true })).map(
    ([path, body]) => [path.split("/").pop().replace(/\.md$/, ""), body]
  )
);

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

// Internal links use the router; external ones open in a new tab.
function MdLink({ href = "", children }) {
  if (href.startsWith("/")) {
    return <Link to={href} className="text-primary hover:underline">{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
      {children}
    </a>
  );
}

const MD = {
  h2: ({ children }) => <h2 className="mt-14 text-2xl font-semibold text-foreground md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-10 text-xl font-semibold text-foreground">{children}</h3>,
  p: ({ children }) => <p className="mt-5 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-5">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: MdLink,
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-2 border-accent bg-card/50 px-6 py-1 [&>p]:mt-4 [&>p:last-child]:mb-4">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto border border-border bg-card/60 p-5 text-[13px] leading-relaxed text-foreground">
      {children}
    </pre>
  ),
  code: ({ className, children }) =>
    className ? (
      <code className={`font-mono ${className}`}>{children}</code>
    ) : (
      <code className="border border-border bg-card/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
        {children}
      </code>
    ),
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const body = BODIES[slug];
  if (!post || !body) return <PageNotFound />;

  return (
    <div>
      <PageHero label={post.tag} title={post.title}>
        <p className="mono-label text-muted-foreground">
          {formatDate(post.date)} · {post.read} read
        </p>
      </PageHero>

      <Section>
        <article className="max-w-3xl text-muted-foreground [&>*:first-child]:mt-0">
          <ReactMarkdown components={MD}>{body}</ReactMarkdown>
        </article>

        <BreachCheckCard className="mt-20" />

        <Link to="/blog" className="mono-label mt-12 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-3 w-3" /> All posts
        </Link>
      </Section>
    </div>
  );
}
