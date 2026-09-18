"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-[clamp(130px,15vh,190px)]">
      <div className="shell">
        <div className="grid items-start gap-[clamp(28px,5vw,84px)] lg:grid-cols-2">
          <h1 className="display text-[clamp(2.1rem,4.55vw,3.5rem)]">Something<br />went wrong.</h1>
          <div>
            <p className="max-w-[44ch] text-[clamp(1rem,1.1vw,1.08rem)] text-muted">
              This page failed to load. Try again, and if it keeps happening, call us on (224) 800-1175 and we will
              sort it out.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-surface transition-colors hover:bg-body"
              >
                Try again
              </button>
              <Button href="/" variant="ghost">Back to the homepage</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
