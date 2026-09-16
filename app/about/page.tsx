import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/sections/Cta";
import { firstTenDays } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — a small design and marketing studio",
  description: "A small studio with senior hands on every file. How we work, what we stand by, and the three ways to engage us.",
  alternates: { canonical: "/about" },
};

const tenets = [
  { h: "One team from mark to launch", p: "The identity, the website and the campaigns are drawn by the same hands, so nothing drifts out of alignment six months later." },
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
      <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
        <SectionHead title={<>A small studio,<br />with senior hands<br />on every file.</>}>
          <p className="max-w-[60ch] text-steel">
            Mayn Technologies LLC is a design and marketing studio working out of {site.address.locality}, Illinois,
            with clients across the United States and beyond. We are deliberately small, because the quality of this
            work depends on who actually does it.
          </p>
        </SectionHead>
      </Section>

      <Section id="story">
        <SectionHead title={<>Who you will<br />actually be talking to.</>}>
          <p className="text-steel">
            {/* REPLACE: founder name and one line of background. */}
            [YOUR NAME], founder. I take every first call, draw the first directions, and stay on the project until it
            launches.
          </p>
          <p className="mt-4 text-steel">
            The studio is small because I have seen the alternative: a senior designer wins the pitch, then the file
            quietly moves to whoever is free. If you hire us, the work is done by the person you met.
          </p>
        </SectionHead>
        <div className="mt-10 grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
          {/* REPLACE with a real photograph at /public/assets/founder.jpg */}
          <div className="flex aspect-[4/5] items-center justify-center rounded border border-hairsoft bg-gradient-to-br from-white/[0.08] to-white/[0.015] p-[14%]">
            <Image src="/assets/mark.png" alt="" width={438} height={320} className="w-full max-w-[210px]" />
          </div>
          <ul className="border-t border-hairsoft">
            <li className="border-b border-hairsoft py-4">
              <span className="block text-[0.8rem] text-steel">Direct line</span>
              <a href={site.phoneHref} className="mt-1 block text-[1.02rem] text-bright hover:text-champagne">{site.phone}</a>
            </li>
            <li className="border-b border-hairsoft py-4">
              <span className="block text-[0.8rem] text-steel">Email</span>
              <a href={`mailto:${site.email}`} className="mt-1 block text-[1.02rem] text-bright hover:text-champagne">{site.email}</a>
            </li>
          </ul>
        </div>

        <ul className="mt-[clamp(48px,6vw,86px)] grid border-t border-hair lg:grid-cols-3">
          {tenets.map((t, i) => (
            <Reveal as="li" key={t.h} delay={i * 0.06} className="h-full border-b border-hairsoft py-7 pr-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <h3 className="text-[1rem] font-medium text-bright">{t.h}</h3>
                <p className="mt-2 text-[0.9rem] text-steel">{t.p}</p>
              </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="process">
        <SectionHead title={<>Four stages,<br />no surprises.</>}>
          <p className="max-w-[60ch] text-steel">
            Every project runs the same route. You know what happens next, what it costs, and when it lands, before we
            start drawing.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-hair sm:grid-cols-2 lg:grid-cols-4">
          {firstTenDays.map((stage) => (
            <li key={stage.n} className="border-b border-hairsoft py-7 pr-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-champagne">{stage.n}</span>
              <h3 className="mt-3.5 text-[1rem] font-medium text-bright">{stage.title}</h3>
              <p className="mt-2 text-[0.9rem] text-steel">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="engagements">
        <SectionHead title={<>Three ways<br />to work together.</>}>
          <p className="max-w-[60ch] text-steel">
            Most clients start with a project and move to a retainer once the site is live. You are never asked to
            commit to the second to get the first.
          </p>
        </SectionHead>
        <div className="mt-[clamp(38px,5vw,60px)] grid gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.h} delay={i * 0.06}>
              <article className="flex h-full flex-col gap-3 rounded border border-hair p-[clamp(24px,2.6vw,34px)]">
                <h3 className="text-[1.05rem] font-medium text-bright">{e.h}</h3>
                <p className="text-[0.92rem] text-steel">{e.p}</p>
                <p className="mt-auto border-t border-hairsoft pt-4 text-[0.84rem] text-silver">{e.fit}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title={<>When we are<br />the wrong studio.</>}>
          <p className="max-w-[60ch] text-steel">
            Three situations where hiring us wastes your money. Saying so now costs us a few enquiries and saves
            everyone a bad month.
          </p>
        </SectionHead>
        <div className="mt-[clamp(38px,5vw,60px)] grid gap-[clamp(16px,2vw,26px)] lg:grid-cols-3">
          {wrongFit.map((e, i) => (
            <Reveal key={e.h} delay={i * 0.06}>
              <article className="flex h-full flex-col gap-3 rounded border border-hair p-[clamp(24px,2.6vw,34px)]">
                <h3 className="text-[1.05rem] font-medium text-bright">{e.h}</h3>
                <p className="text-[0.92rem] text-steel">{e.p}</p>
                <p className="mt-auto border-t border-hairsoft pt-4 text-[0.84rem] text-silver">{e.alt}</p>
              </article>
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
