import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Cta } from "@/components/sections/Cta";
import { articles } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
        <article className="max-w-[70ch]">
          <p className="mb-6 text-[0.82rem] text-muted">
            <span>{article.tag}</span>
            <span className="ml-3.5 border-l border-line pl-3.5">{article.date}</span>
            <span className="ml-3.5 border-l border-line pl-3.5">{article.readingTime} read</span>
          </p>
          <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">{article.title}</h1>

          <div className="mt-10">
            {article.body.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h2 className="display mb-3.5 mt-9 text-[clamp(1.2rem,1.7vw,1.45rem)] leading-tight">{block.heading}</h2>
                )}
                <p className="text-[1.02rem] leading-[1.72] text-muted">{block.text}</p>
              </div>
            ))}
          </div>

          <Link href="/insights" className="mt-11 inline-block border-t border-linesoft pt-5 text-[0.9rem] text-muted hover:text-ink">
            All insights
          </Link>
        </article>
      </Section>

      <Cta
        title="Want this handled<br />rather than read?"
        body="Tell us what you are working on and we will tell you which part of it is worth paying for."
      />
    </>
  );
}
