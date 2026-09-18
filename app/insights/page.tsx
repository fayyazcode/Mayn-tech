import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
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
      <PageHero
        eyebrow="Notes from the studio"
        lines={["Everything we know,", "given away."]}
        intro="Short, practical pieces on the things clients ask about most. No gated downloads, no email required, nothing held back for a sales call."
        meta={[{ label: "Articles", value: "Three" }, { label: "Gated", value: "None" }, { label: "Cost", value: "Nothing" }]}
      />

      <Cta
        title="Rather have us<br />do it for you?"
        body="Everything above is free to copy. If you would rather it was handled, that is what the studio is for."
      />
    </>
  );
}
