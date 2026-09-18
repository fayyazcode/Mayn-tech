import { Marquee } from "@/components/ui/Marquee";

/**
 * The things people actually type into Google, as running text. Visible content
 * rather than hidden keywords, and a screen-reader-friendly list underneath.
 */
const ROW_ONE = [
  "Logo design", "Brand identity", "Web design", "Web development",
  "Search engine optimisation", "Social media marketing",
];
const ROW_TWO = [
  "Local SEO", "Google Business Profile", "WordPress websites", "Shopify stores",
  "Landing pages", "Brand guidelines", "Content strategy", "Paid campaigns",
];

export function KeywordIndex() {
  return (
    <section className="border-t border-line py-[clamp(30px,4vw,54px)]" aria-label="What we do">
      <Marquee items={ROW_ONE} speed={34} className="text-[clamp(1.3rem,2.6vw,2rem)] font-[family-name:var(--font-bodoni)]" />
      <Marquee items={ROW_TWO} speed={26} reverse className="mt-3 text-[clamp(0.95rem,1.4vw,1.1rem)]" />
      <ul className="sr-only">
        {[...ROW_ONE, ...ROW_TWO].map((k) => <li key={k}>{k}</li>)}
      </ul>
    </section>
  );
}
