import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Cta({ title, body, action = "Start a project" }: { title: string; body: string; action?: string }) {
  return (
    <section className="border-t border-hair py-[clamp(68px,8.5vw,132px)]">
      <div className="shell">
        <Reveal className="grid items-start gap-[clamp(26px,5vw,80px)] lg:grid-cols-2">
          <h2 className="display text-[clamp(1.85rem,3.5vw,2.85rem)]" dangerouslySetInnerHTML={{ __html: title }} />
          <div>
            <p className="max-w-[44ch] text-[clamp(1rem,1.1vw,1.08rem)] text-steel">{body}</p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button href="/contact">{action}</Button>
              <Button href={site.booking} variant="ghost" external>Book a 30-minute call</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
