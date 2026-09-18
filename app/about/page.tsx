import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Cta } from "@/components/sections/Cta";
import { firstTenDays } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — a small design and marketing studio",
  description: "A studio built around one point of contact and a specialist team behind them. How we work, what we stand by, and the three ways to engage us.",
  alternates: { canonical: "/about" },
};

const team = [
  { h: "Your point of contact", p: "One person who owns the relationship: scheduling, questions, revisions and reporting. Reachable on the studio line during working hours." },
  { h: "The design and build team", p: "Designers and developers who only work on the craft. Their time goes into your identity and your site rather than into meetings." },
  { h: "The search and social team", p: "Campaign and content specialists who take over once the site is live, reporting monthly against enquiries." },
];

const tenets = [
  { h: "One team from mark to launch", p: "The identity, the website and the campaigns are handled by the same studio, so nothing drifts out of alignment six months later." },
  { h: "Built to be handed over", p: "You own the files, the domain and every account we open. We document what we build, so you are never locked in to us." },
  { h: "Measured against enquiries", p: "Reporting follows the numbers that move revenue: calls, forms and bookings. Reach and impressions are context, not the result." },
];

const engagements = [
  { h: "Project", p: "A defined piece of work with a fixed price and a delivery date: an identity, a website, or both.", fit: "Best if you are launching, rebranding, or replacing a site that no longer represents you." },
  { h: "Marketing retainer", p: "A monthly block of search and social work, planned in advance and reported at month end.", fit: "Best if you have a site that works and need a steady flow of enquiries from it." },
  { h: "Care and support", p: "Hosting, backups, updates and a set number of change requests each month, handled quietly.", fit: "Best if you want the site maintained without keeping anyone technical on payroll." },
];

const wrongFit = [
  { h: "You need it by Friday", p: "We will not take work we cannot do properly in the time available. A rushed identity gets replaced within the year, and you pay for it twice.", alt: "Better: a freelancer with immediate availability, or move the deadline." },
  { h: "You want the lowest quote", p: "We are rarely the cheapest number on the table. If price is the deciding factor rather than one factor, someone else will win and should.", alt: "Better: get three quotes and compare what is actually in each scope." },
  { h: "You already know the answer", p: "If you have the design settled and want hands to execute it exactly, our questions will feel like friction rather than value.", alt: "Better: a production designer briefed directly from your drawings." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        lines={["A studio built", "around your", "point of contact."]}
        intro="Mayn Technologies LLC is a design and marketing studio in Downers Grove, Illinois, working with clients across the United States and beyond. The structure is deliberately flat: one contact who knows your project, and specialists who spend their time on the work rather than in meetings."
        meta={[{ label: "Services", value: "Five" }, { label: "Based in", value: "Illinois" }, { label: "Working", value: "Worldwide" }]}
      />

      <Section id="story">
        <SectionHead title={<>Who you will<br />be working with.</>}>
          <p className="text-muted">
            Every project is assigned a single point of contact who stays with you from the first call to the
            handover. They know your file, answer your emails, and sit on every review, so you are never repeating
            yourself to someone new.
          </p>
          <p className="mt-4 text-muted">
            Behind them is the team that does the work: designers, developers, and the people running search and
            social. You never have to chase them individually, and nothing is quietly passed to whoever happens to be
            free that week.
          </p>
        </SectionHead>

        <ul className="mt-[clamp(38px,5vw,64px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <Reveal as="li" key={t.h} delay={i * 0.06} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <h3 className="text-[1rem] font-medium text-ink">{t.h}</h3>
              <p className="mt-2 text-[0.9rem] text-muted">{t.p}</p>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-[clamp(48px,6vw,86px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {tenets.map((t, i) => (
            <Reveal as="li" key={t.h} delay={i * 0.06} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-[1rem] font-medium text-ink">{t.h}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{t.p}</p>
              </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="process">
        <SectionHead title={<>Four stages,<br />no surprises.</>}>
          <p className="max-w-[60ch] text-muted">
            Every project runs the same route. You know what happens next, what it costs, and when it lands, before we
            start drawing.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {firstTenDays.map((stage) => (
            <li key={stage.n} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-accent">{stage.n}</span>
              <h3 className="mt-3.5 text-[1rem] font-medium text-ink">{stage.title}</h3>
              <p className="mt-2 text-[0.9rem] text-muted">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="engagements">
        <SectionHead title={<>Three ways<br />to work together.</>}>
          <p className="max-w-[60ch] text-muted">
            Most clients start with a project and move to a retainer once the site is live. You are never asked to
            commit to the second to get the first.
          </p>
        </SectionHead>
        <div className="mt-[clamp(38px,5vw,60px)] grid gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.h} delay={i * 0.06}>
              <SpotlightCard as="article" tilt className="h-full">
                <h3 className="text-[1.05rem] font-medium text-ink">{e.h}</h3>
                <p className="text-[0.92rem] text-muted">{e.p}</p>
                <p className="mt-auto border-t border-linesoft pt-4 text-[0.84rem] text-body">{e.fit}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title={<>When we are<br />the wrong studio.</>}>
          <p className="max-w-[60ch] text-muted">
            Three situations where hiring us wastes your money. Saying so now costs us a few enquiries and saves
            everyone a bad month.
          </p>
        </SectionHead>
        <div className="mt-[clamp(38px,5vw,60px)] grid gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          {wrongFit.map((e, i) => (
            <Reveal key={e.h} delay={i * 0.06}>
              <SpotlightCard as="article" tilt className="h-full">
                <h3 className="text-[1.05rem] font-medium text-ink">{e.h}</h3>
                <p className="text-[0.92rem] text-muted">{e.p}</p>
                <p className="mt-auto border-t border-linesoft pt-4 text-[0.84rem] text-body">{e.alt}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Cta
        title="Still think<br />we might fit?"
        body="The fastest way to find out is a short call. If we are wrong for the job, you will hear it on that call rather than after a proposal."
        action="Book a call"
      />
    </>
  );
}
