import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-[clamp(46px,5vw,72px)]">
      <div className="shell">
        <div className="grid gap-[clamp(26px,4vw,56px)] md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.75fr))]">
          <div>
            <Image src="/assets/wordmark.png" alt={site.name} width={760} height={46} className="logo-img w-[168px] opacity-90" />
            <p className="mt-4 max-w-[34ch] text-[0.88rem] text-muted">
              A design and marketing studio for businesses that would rather be chosen than found by accident.
            </p>
          </div>

          <nav aria-label="Studio">
            <h3 className="mb-3.5 text-[0.86rem] font-medium text-ink">Studio</h3>
            <ul className="space-y-1.5 text-[0.9rem] text-muted">
              <li><Link href="/about" className="transition-colors hover:text-ink">About us</Link></li>
              <li><Link href="/about#process" className="transition-colors hover:text-ink">How we work</Link></li>
              <li><Link href="/work" className="transition-colors hover:text-ink">Work</Link></li>
              <li><Link href="/insights" className="transition-colors hover:text-ink">Insights</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-ink">Contact us</Link></li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="mb-3.5 text-[0.86rem] font-medium text-ink">Services</h3>
            <ul className="space-y-1.5 text-[0.9rem] text-muted">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="transition-colors hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-3.5 text-[0.86rem] font-medium text-ink">Get in touch</h3>
            <a href={site.phoneHref} className="mb-3 inline-block font-[family-name:var(--font-bodoni)] text-2xl text-ink transition-colors hover:text-accent">
              {site.phone}
            </a>
            <ul className="space-y-1.5 text-[0.9rem] text-muted">
              <li><a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">{site.email}</a></li>
              <li>
                <a href={site.maps} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                  {site.address.street}<br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                </a>
              </li>
            </ul>
            <ul className="mt-4 flex flex-wrap gap-4 border-t border-linesoft pt-4 text-[0.86rem] text-muted">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener noreferrer" target="_blank" className="transition-colors hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(38px,4.5vw,64px)] flex flex-wrap justify-between gap-3 border-t border-linesoft pt-5 text-[0.8rem] text-muted">
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <a href={site.maps} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Downers Grove, Illinois</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
