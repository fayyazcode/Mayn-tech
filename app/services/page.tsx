import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Cta } from "@/components/sections/Cta";
import { pricing, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — logo design, web design and development, SEO, social media",
  description: "Logo and brand identity, web design, web development, search engine optimisation and social media marketing. Fixed scope, fixed price, everything in your name.",
  alternates: { canonical: "/services" },
};

const needs = [
  { h: "One person who can decide", p: "Feedback from a committee arrives contradictory and costs a week each round. Name the person whose sign-off is final." },
  { h: "Access, early", p: "Domain registrar, current hosting, analytics and social accounts. Hunting for a password nobody wrote down is the most common delay there is." },
  { h: "Your content, or a decision not to have it", p: "Photos, product details, team names. If you would rather we wrote and sourced it, that is fine, but it goes in the scope and the price." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        lines={["Five services", "that fit together."]}
        intro="Take one on its own, or run the whole sequence from a blank page to a website that earns its own traffic. Every engagement is scoped and priced in writing before it starts."
        meta={[{ label: "Projects from", value: "$500" }, { label: "Up to", value: "$5,000" }, { label: "Priced", value: "Before you commit" }]}
      />

      <Section id="all">
        <div className="border-t border-line">
          {services.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-28 gap-[clamp(20px,4vw,56px)] border-b border-linesoft py-[clamp(28px,3.4vw,44px)] lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,0.72fr)]"
            >
              <h2 className="display min-w-0 text-[clamp(1.2rem,1.7vw,1.45rem)] leading-tight">{service.title}</h2>
              <p className="min-w-0 text-[0.98rem] text-muted">{service.summary}</p>
              <ul>
                {service.deliverables.map((d) => (
                  <li key={d} className="border-b border-linesoft py-1.5 text-[0.88rem] text-muted last:border-b-0">{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="pricing">
        <SectionHead title={<>What it costs,<br />before you ask.</>}>
          <p className="max-w-[60ch] text-muted">
            Most projects land between $500 and $5,000, depending on how many pieces you need and how complex they are.
            The figures below are starting points. Your written scope carries the real number and it does not move
            afterwards.
          </p>
        </SectionHead>
        <div className="mt-[clamp(38px,5vw,60px)] grid gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <Reveal key={plan.title} delay={i * 0.06}>
              <SpotlightCard as="article" tilt className="h-full">
                <h3 className="text-[1.05rem] font-medium text-ink">{plan.title}</h3>
                <p className="font-[family-name:var(--font-bodoni)] text-[1.65rem] leading-none text-accent">{plan.figure}</p>
                <p className="text-[0.92rem] text-muted">{plan.body}</p>
                <p className="mt-auto border-t border-linesoft pt-4 text-[0.84rem] text-body">{plan.note}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title={<>What we need<br />from you.</>}>
          <p className="max-w-[60ch] text-muted">
            Projects run late for the same three reasons every time. None of them are design problems. Sort these
            before kickoff and dates hold.
          </p>
        </SectionHead>
        <ul className="mt-[clamp(38px,5vw,64px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((n, i) => (
            <Reveal as="li" key={n.h} delay={i * 0.06} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-[1rem] font-medium text-ink">{n.h}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{n.p}</p>
              </Reveal>
          ))}
        </ul>
      </Section>

      <Cta
        title="Which of these<br />do you need?"
        body="Describe the problem rather than the deliverable and we will tell you which service solves it, or whether you need one at all."
        action="Get a fixed quote"
      />
    </>
  );
}
