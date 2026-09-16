import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { organisationSchema, site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-archivo", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-bodoni", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mayn Technologies LLC — logo design, web development, SEO and social media",
    template: "%s | Mayn Technologies",
  },
  description: site.description,
  icons: { icon: "/assets/mark.png", apple: "/assets/mark.png" },
  openGraph: { type: "website", siteName: site.shortName, url: site.url, images: ["/assets/summit.jpg"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning covers attributes injected into <html> by browser
    // extensions before React loads. It does not mask mismatches in our own markup.
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${bodoni.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-99 focus:bg-bright focus:px-5 focus:py-3 focus:text-void">
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
