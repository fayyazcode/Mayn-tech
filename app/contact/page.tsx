import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Downers Grove, Illinois",
  description: "Start a project with Mayn Technologies. Call (224) 800-1175, email support@mayntechnologiesllc.com, or visit 2958 Finley Road, Downers Grove, IL 60515.",
  alternates: { canonical: "/contact" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const next = [
  { n: "01", h: "Within one business day", p: "A reply from a person who read what you wrote, with either a question or a time to talk." },
  { n: "02", h: "A thirty-minute call", p: "Your situation, our honest read on it. If we are the wrong fit, you will be told on this call rather than after a proposal." },
  { n: "03", h: "Scope and price in writing", p: "Within two business days of the call. A fixed number, a date, and what is included. No obligation." },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="Start a project"
        lines={["Tell us what", "you are building."]}
        intro="Send a few lines about the business and where you are stuck. You get a reply within one business day, from the person who would do the work."
        meta={[{ label: "Reply within", value: "1 business day" }, { label: "Call us", value: "(224) 800-1175" }, { label: "Obligation", value: "None" }]}
      />

      <Section rule={false} className="pt-[clamp(28px,4vw,48px)]">
        <div className="mt-[clamp(34px,4vw,56px)] grid items-start gap-x-[clamp(32px,5vw,84px)] gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ContactForm />

          <div>
            <ul>
              <li className="min-w-0 border-b border-linesoft py-4">
                <span className="block text-[0.8rem] text-muted">Email</span>
                <a href={`mailto:${site.email}`} className="mt-1 block break-all text-[clamp(0.95rem,2.4vw,1.02rem)] text-ink hover:text-accent">{site.email}</a>
              </li>
              <li className="min-w-0 border-b border-linesoft py-4">
                <span className="block text-[0.8rem] text-muted">Phone and WhatsApp</span>
                <a href={site.phoneHref} className="mt-1 block text-[1.02rem] text-ink hover:text-accent">{site.phone}</a>
              </li>
              <li className="min-w-0 border-b border-linesoft py-4">
                <span className="block text-[0.8rem] text-muted">Office</span>
                <address className="mt-1 block text-[1.02rem] not-italic text-ink">
                  {site.name}<br />{site.address.street}<br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                </address>
              </li>
              <li className="min-w-0 border-b border-linesoft py-4">
                <span className="block text-[0.8rem] text-muted">Hours</span>
                <span className="mt-1 block text-[1.02rem] text-ink">Monday to Friday, 9am to 6pm</span>
              </li>
            </ul>
            <a href={site.maps} target="_blank" rel="noopener noreferrer"
               className="glass mt-5 block !py-5">
              <span className="block text-[0.8rem] text-muted">Open in Google Maps</span>
              <span className="mt-1.5 block text-ink">{site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}</span>
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title={<>What happens<br />after you send it.</>}>
          <p className="max-w-[60ch] text-muted">
            No automated sequence, no sales call disguised as a discovery session, and nobody added to a mailing list.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {next.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="h-full min-w-0 border-b border-linesoft py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-accent">{s.n}</span>
                <h3 className="mt-3.5 text-[1rem] font-medium text-ink">{s.h}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{s.p}</p>
              </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="faq">
        <SectionHead title={<>Questions we<br />get asked first.</>}>
          <p className="max-w-[60ch] text-muted">
            If yours is not here, ask it in the form above and you will get a straight answer rather than a brochure.
          </p>
        </SectionHead>
        <Faq />
      </Section>
    </>
  );
}
