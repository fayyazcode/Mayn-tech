export const site = {
  name: "Mayn Technologies LLC",
  shortName: "Mayn Technologies",
  url: "https://mayntechnologiesllc.com",
  description:
    "A design and marketing studio. We draw the logo, build the site, and run the search and social work that keeps people arriving long after launch.",
  email: "support@mayntechnologiesllc.com",
  phone: "(224) 800-1175",
  phoneHref: "tel:+12248001175",
  booking: "https://calendly.com/mayntechnologies/intro-call",
  address: {
    street: "2958 Finley Road",
    locality: "Downers Grove",
    region: "IL",
    postalCode: "60515",
    country: "US",
  },
  maps:
    "https://www.google.com/maps/search/2958+Finley+Road,+Downers+Grove,+IL+60515",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mayn-technologies" },
    { label: "Instagram", href: "https://www.instagram.com/mayntechnologies" },
    { label: "Facebook", href: "https://www.facebook.com/mayntechnologies" },
  ],
  nav: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: "+1-224-800-1175",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: ["Downers Grove", "Chicago", "Illinois", "United States"],
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: site.social.map((s) => s.href),
};


export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.shortName,
  url: site.url,
  publisher: { "@type": "Organization", name: site.name },
  inLanguage: "en-US",
};
