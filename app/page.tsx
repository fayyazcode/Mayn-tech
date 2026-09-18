import { Hero } from "@/components/sections/Hero";
import { KeywordIndex } from "@/components/sections/KeywordIndex";
import { Climb } from "@/components/sections/Climb";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Cta } from "@/components/sections/Cta";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { firstTenDays, testimonials } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeywordIndex />

      <Section>
        <SectionHead title={<>Recent work.</>}>
          <p className="max-w-[60ch] text-muted">
            Live client sites across law, arts, finance and technology. Each one is open to visit, so you can judge
            the work where it runs.
          </p>
          <Link href="/work" className="mt-6 inline-block border-b border-line pb-1 text-[0.92rem] text-ink transition-colors hover:border-accent hover:text-accent">
            See the full portfolio
          </Link>
        </SectionHead>
        <WorkGrid limit={4} />
      </Section>

      <Section>
        <SectionHead title={<>Design and marketing,<br />under one roof.</>}>
          <p className="max-w-[60ch] text-muted">
            Most businesses buy these pieces separately, then spend a year making them agree with each other. We draw
            the mark, build the site, and run the search and social work from the same desk, so the brand a customer
            meets on Instagram is the one that greets them at the homepage.
          </p>
          <Link href="/services" className="mt-6 inline-block border-b border-line pb-1 text-[0.92rem] text-ink transition-colors hover:border-accent hover:text-accent">
            See all five services
          </Link>
        </SectionHead>
        <Climb />
      </Section>

      <Section>
        <SectionHead title={<>The first ten days,<br />written down.</>}>
          <p className="max-w-[60ch] text-muted">
            Every studio says the process is collaborative and leaves it there. Here is the actual calendar, so you can
            hold us to it. Nothing is billed until you approve the scope at day two.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {firstTenDays.map((stage, i) => (
            <Reveal as="li" key={stage.n} delay={i * 0.06} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-accent">{stage.n}</span>
                <h3 className="mt-3.5 text-[1rem] font-medium text-ink">{stage.title}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{stage.body}</p>
              </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="words">
        <SectionHead title={<>What clients<br />say afterwards.</>}>
        We believe great work is best measured by the people who experience it. From bold identities and high-performing websites to campaigns that make an impact, every project is built around meaningful results and lasting partnerships. See what our clients have to say about working with the team behind the work.  <p className="max-w-[60ch] text-muted">
        </p>
        </SectionHead>
        <div className="mt-[clamp(30px,3.6vw,48px)] grid gap-[clamp(18px,2.4vw,32px)] md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <SpotlightCard as="figure" tilt className="h-full">
                <blockquote className="font-[family-name:var(--font-bodoni)] text-[1.12rem] leading-snug text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto border-t border-linesoft pt-4">
                  <span className="block text-[0.92rem] text-body">{t.name}</span>
                  <span className="mt-1 block text-[0.82rem] text-muted">{t.role}</span>
                </figcaption>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta
        title="Tell us what<br />you are building."
        body="Send a few lines about the business and where you are stuck. You get a reply within one business day, from the person who would do the work."
      />
    </>
  );
}
