import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Mayn Technologies collects through this website, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
      <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">Privacy policy.</h1>
      <div className="mt-8 max-w-[74ch] space-y-4 text-[0.96rem] text-steel">
        <p>This policy explains what {site.name} collects when you use this website, why, and what you can ask us to do about it.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">What we collect</h2>
        <p>Only what you send us. When you submit the contact form we store the name, email address, company and message you typed, together with a one-way hash of your IP address used solely to detect abuse. We do not run trackers that build a profile of you across other websites, and this site sets no advertising cookies.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">What we do with it</h2>
        <p>We reply to you, and we keep the correspondence so we have a record of what was agreed. We do not sell it, rent it, or add you to a mailing list you did not ask for.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Third parties</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Typefaces are served by Google Fonts, which receives your IP address as part of that request.</li>
          <li>Form submissions are stored in our own database and, if email forwarding is enabled, sent through a transactional email provider.</li>
          <li>If analytics are added in future, this policy will name the provider before it goes live.</li>
        </ul>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Your rights</h2>
        <p>Write to us and we will tell you what we hold about you, correct it, or delete it. There is no charge and no form to complete.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Contact</h2>
        <p>{site.name}, {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}. Email {site.email} or call {site.phone}.</p>
      </div>
    </Section>
  );
}
