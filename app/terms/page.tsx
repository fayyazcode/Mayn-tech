import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms covering use of the Mayn Technologies website, its content and the client work shown on it.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
      <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">Terms of use.</h1>
      <div className="mt-8 max-w-[74ch] space-y-4 text-[0.96rem] text-muted">
        <p>These terms cover use of this website. They are not the contract for a project, which is issued separately as a written scope and signed before work begins.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">The content here</h2>
        <p>Text, design and code on this site belong to Mayn Technologies LLC. The articles are free to read, quote and act on. They are not free to republish wholesale as your own.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Client work shown here</h2>
        <p>Projects on the work page are live client websites delivered by this studio. Client names, marks and site content remain the property of those clients and are shown to illustrate work carried out, not to imply any endorsement of this studio&apos;s other services.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Advice on this site</h2>
        <p>The articles are general guidance written in good faith, not advice about your specific situation.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Quotes and estimates</h2>
        <p>Nothing on this site is an offer. Prices, timelines and scope become binding only in a written scope document signed by both parties.</p>

        <h2 className="display pt-6 text-[clamp(1.2rem,1.7vw,1.45rem)]">Governing law</h2>
        <p>These terms are governed by the laws of the State of Illinois, United States.</p>
      </div>
    </Section>
  );
}
