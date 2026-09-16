import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Cta } from "@/components/sections/Cta";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Client work — websites for law, arts, finance and technology",
  description: "Live client websites built by Mayn Technologies for law firms, arts organisations, trading platforms and digital businesses.",
  alternates: { canonical: "/work" },
};

const handover = [
  { h: "Editable source files", p: "Not just exports. The working files, layered and named, in formats your next designer can open without converting anything." },
  { h: "Every format you will need", p: "Logo in vector and raster, light and dark, square and wide, sized for a sign, a favicon and every social profile you hold." },
  { h: "A walkthrough you can keep", p: "A recorded screen share showing how to edit your own pages, swap an image and publish. Watch it again in six months." },
];

export default function WorkPage() {
  return (
    <>
      <Section rule={false} className="pt-[clamp(130px,15vh,190px)]">
        <SectionHead title={<>Work.</>}>
          <p className="max-w-[60ch] text-steel">
            Live client websites across law, arts, finance and technology. Each one is open to visit, so you can judge
            the work where it actually runs rather than in a screenshot.
          </p>
        </SectionHead>
        <WorkGrid />
      </Section>

      <Section>
        <SectionHead title={<>What lands in<br />your hands at the end.</>}>
          <p className="max-w-[60ch] text-steel">
            A project is not finished when it looks finished. It is finished when you can run it without calling us.
          </p>
        </SectionHead>
        <ul className="mt-[clamp(38px,5vw,64px)] grid border-t border-hair lg:grid-cols-3">
          {handover.map((h, i) => (
            <Reveal as="li" key={h.h} delay={i * 0.06} className="h-full border-b border-hairsoft py-7 pr-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <h3 className="text-[1rem] font-medium text-bright">{h.h}</h3>
                <p className="mt-2 text-[0.9rem] text-steel">{h.p}</p>
              </Reveal>
          ))}
        </ul>
      </Section>

      <Cta
        title="Want work like<br />this for yours?"
        body="Every site above started as one conversation about what the business needed to do. Tell us about yours and we will scope it the same way."
      />
    </>
  );
}
