import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-[clamp(130px,15vh,190px)]">
      <div className="shell">
        <div className="grid items-start gap-[clamp(28px,5vw,84px)] lg:grid-cols-2">
          <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">That page<br />is not here.</h1>
          <div>
            <p className="max-w-[44ch] text-[clamp(1rem,1.1vw,1.08rem)] text-muted">
              The link may be old, or we may have moved something. Either way, it is our problem rather than yours.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button href="/">Back to the homepage</Button>
              <Button href="/contact" variant="ghost">Tell us what broke</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
