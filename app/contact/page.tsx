import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
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

      <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
        <div className="grid items-start gap-[clamp(28px,5vw,84px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">Tell us what<br />you are building.</h1>
          <p className="max-w-[60ch] text-steel">
            Send a few lines about the business and where you are stuck. You get a reply within one business day, from
            the person who would do the work.
          </p>
        </div>

        <div className="mt-[clamp(34px,4vw,56px)] grid items-start gap-[clamp(32px,5vw,84px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ContactForm />

          <div>
            <ul>
              <li className="border-b border-hairsoft py-4.5">
                <span className="block text-[0.8rem] text-steel">Email</span>
                <a href={`mailto:${site.email}`} className="mt-1 block text-[1.02rem] text-bright hover:text-champagne">{site.email}</a>
              </li>
              <li className="border-b border-hairsoft py-4.5">
                <span className="block text-[0.8rem] text-steel">Phone and WhatsApp</span>
                <a href={site.phoneHref} className="mt-1 block text-[1.02rem] text-bright hover:text-champagne">{site.phone}</a>
              </li>
              <li className="border-b border-hairsoft py-4.5">
                <span className="block text-[0.8rem] text-steel">Office</span>
                <address className="mt-1 block text-[1.02rem] not-italic text-bright">
                  {site.name}<br />{site.address.street}<br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                </address>
              </li>
              <li className="border-b border-hairsoft py-4.5">
                <span className="block text-[0.8rem] text-steel">Hours</span>
                <span className="mt-1 block text-[1.02rem] text-bright">Monday to Friday, 9am to 6pm</span>
              </li>
            </ul>
            <a href={site.maps} target="_blank" rel="noopener noreferrer"
               className="mt-5 block rounded border border-hair px-6 py-5 transition-colors hover:border-silver hover:bg-white/[0.045]">
              <span className="block text-[0.8rem] text-steel">Open in Google Maps</span>
              <span className="mt-1.5 block text-bright">{site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}</span>
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title={<>What happens<br />after you send it.</>}>
          <p className="max-w-[60ch] text-steel">
            No automated sequence, no sales call disguised as a discovery session, and nobody added to a mailing list.
          </p>
        </SectionHead>
        <ol className="mt-[clamp(38px,5vw,64px)] grid border-t border-hair lg:grid-cols-3">
          {next.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="h-full border-b border-hairsoft py-7 pr-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <span className="block font-[family-name:var(--font-bodoni)] text-[1.6rem] leading-none text-champagne">{s.n}</span>
                <h3 className="mt-3.5 text-[1rem] font-medium text-bright">{s.h}</h3>
                <p className="mt-2 text-[0.9rem] text-steel">{s.p}</p>
              </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="faq">
        <SectionHead title={<>Questions we<br />get asked first.</>}>
          <p className="max-w-[60ch] text-steel">
            If yours is not here, ask it in the form above and you will get a straight answer rather than a brochure.
          </p>
        </SectionHead>
        <Faq />
      </Section>
    </>
  );
}
