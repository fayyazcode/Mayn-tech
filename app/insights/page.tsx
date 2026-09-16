import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/sections/Cta";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights — practical notes on design, websites and search",
  description: "Short practical articles on logo design, website speed and local SEO from Mayn Technologies.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
        <SectionHead title={<>Insights.</>}>
          <p className="max-w-[60ch] text-steel">
            Short, practical pieces on the things clients ask about most. No gated downloads, no email required,
            nothing held back for a sales call.
          </p>
        </SectionHead>

        <div className="mt-[clamp(30px,3.6vw,48px)] grid gap-[clamp(18px,2.4vw,34px)] md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.06}>
              <Link
                href={`/insights/${article.slug}`}
                className="flex h-full flex-col rounded border border-hair p-[clamp(24px,2.6vw,32px)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-silver hover:bg-white/[0.04]"
              >
                <span className="text-[0.78rem] text-champagne">{article.tag}</span>
                <h2 className="mt-3 font-[family-name:var(--font-bodoni)] text-[1.3rem] leading-tight text-bright">{article.title}</h2>
                <p className="mt-3 text-[0.9rem] text-steel">{article.description}</p>
                <span className="mt-auto pt-5 text-[0.78rem] text-steel">{article.date} &middot; {article.readingTime} read</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta
        title="Rather have us<br />do it for you?"
        body="Everything above is free to copy. If you would rather it was handled, that is what the studio is for."
      />
    </>
  );
}
