import { Hero } from "@/components/sections/Hero";
import { Climb } from "@/components/sections/Climb";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Cta } from "@/components/sections/Cta";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { firstTenDays, testimonials } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section>
        <SectionHead title={<>Recent work.</>}>
          <p className="max-w-[60ch] text-steel">
            Live client sites across law, arts, finance and technology. Each one is open to visit, so you can judge
            the work where it runs.
          </p>
          <Link href="/work" className="mt-6 inline-block border-b border-hair pb-1 text-[0.92rem] text-bright transition-colors hover:border-champagne hover:text-champagne">
            See the full portfolio
          </Link>
        </SectionHead>
        <WorkGrid limit={4} />
      </Section>

      <Section>
        <SectionHead title={<>Design and marketing,<br />under one roof.</>}>
          <p className="max-w-[60ch] text-steel">
            Most businesses buy these pieces separately, then spend a year making them agree with each other. We draw
            the mark, build the site, and run the search and social work from the same desk, so the brand a customer
            meets on Instagram is the one that greets them at the homepage.
          </p>
          <Link href="/services" className="mt-6 inline-block border-b border-hair pb-1 text-[0.92rem] text-bright transition-colors hover:border-champagne hover:text-champagne">
            See all five services
          </Link>
        </SectionHead>
        <Climb />
      </Section>

      <Section>
        <SectionHead title={<>The first ten days,<br />written down.</>}>
          <p className="max-w-[60ch] text-steel">
            Every studio says the process is collaborative and leaves it there. Here is the actual calendar, so you can
            hold us to it. Nothing is billed until you approve the scope at day two.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-hair sm:grid-cols-2 lg:grid-cols-4">
          {firstTenDays.map((stage, i) => (
            <Reveal as="li" key={stage.n} delay={i * 0.06} className="h-full border-b border-hairsoft py-7 pr-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-champagne">{stage.n}</span>
                <h3 className="mt-3.5 text-[1rem] font-medium text-bright">{stage.title}</h3>
                <p className="mt-2 text-[0.9rem] text-steel">{stage.body}</p>
              </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="words">
        <SectionHead title={<>What clients<br />say afterwards.</>}>
          <p className="max-w-[60ch] text-steel">
            Reviews left for our team under a previous studio name, where the same people delivered the logos, websites
            and campaigns behind this studio. Verified on Trustpilot and Clutch.
          </p>
        </SectionHead>
        <div className="mt-[clamp(30px,3.6vw,48px)] grid gap-[clamp(18px,2.4vw,32px)] md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="flex h-full flex-col gap-5 rounded border border-hair p-[clamp(24px,2.6vw,32px)]">
                <blockquote className="font-[family-name:var(--font-bodoni)] text-[1.12rem] leading-snug text-bright">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto border-t border-hairsoft pt-4">
                  <span className="block text-[0.92rem] text-silver">{t.name}</span>
                  <span className="mt-1 block text-[0.82rem] text-steel">{t.role}</span>
                </figcaption>
              </figure>
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
