import type { Article, Project, Service, Stage, Testimonial } from "@/types";

export const services: Service[] = [
  {
    slug: "identity",
    title: "Logo and brand identity",
    summary:
      "A mark that still reads at 16 pixels and on a shopfront, plus the colour, type and spacing rules that keep it consistent once your team uses it without us.",
    deliverables: [
      "Primary logo, secondary marks, favicon",
      "Colour and typography system",
      "Stationery and social profile kit",
      "Brand guidelines, PDF and source files",
    ],
  },
  {
    slug: "web-design",
    title: "Web design",
    summary:
      "Pages planned around what a visitor needs to know before they act. We map the route first, then design the screens, so the site argues for you instead of listing what you sell.",
    deliverables: [
      "Sitemap and page-by-page wireframes",
      "Full visual design, desktop and mobile",
      "Copy direction and image treatment",
      "Interactive prototype for sign-off",
    ],
  },
  {
    slug: "development",
    title: "Web development",
    summary:
      "Clean, fast builds that hold up on a phone with two bars of signal. You get an editor you can actually use, so small changes never need a developer.",
    deliverables: [
      "Responsive build, tested across browsers",
      "Next.js, WordPress or Shopify",
      "Speed, accessibility and security setup",
      "Analytics, forms and launch checklist",
    ],
  },
  {
    slug: "seo",
    title: "Search engine optimisation",
    summary:
      "Getting found by people already looking for what you sell. We fix what blocks indexing, write for the terms that convert, and hold local listings straight.",
    deliverables: [
      "Technical audit and fixes",
      "Keyword research and on-page work",
      "Local SEO and Google Business Profile",
      "Monthly ranking and traffic reporting",
    ],
  },
  {
    slug: "social",
    title: "Social media marketing",
    summary:
      "A steady feed that sounds like you, with paid budget behind the posts that earn attention. We plan a month ahead so nothing goes out as filler.",
    deliverables: [
      "Monthly content calendar",
      "Post design, video edits and captions",
      "Paid campaigns on Meta, TikTok, LinkedIn",
      "Community management and reporting",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "hamilton-clarke",
    name: "Hamilton Clarke LLP",
    sector: "Law",
    kind: "Website design and build",
    note: "Boutique New York litigation firm handling corporate, shareholder activism and white-collar defence.",
    url: "https://www.hamiltonclarkellp.com/",
    image: "/portfolio/hamilton.svg",
  },
  {
    slug: "law-fellas",
    name: "Law Fellas",
    sector: "Law",
    kind: "Website and campaign build",
    note: "California personal injury practice, built around one conversion path and a 24/7 call line.",
    url: "https://thelawfellas.com/",
    image: "/portfolio/lawfellas.svg",
  },
  {
    slug: "tuacahn",
    name: "Tuacahn Center for the Arts",
    sector: "Arts and culture",
    kind: "Website and ticketing front end",
    note: "Season programming, concert listings and ticketing for a Broadway-scale amphitheatre in southern Utah.",
    url: "https://www.tuacahn.org/",
    image: "/portfolio/tuacahn.svg",
  },
  {
    slug: "firebird",
    name: "Firebird Trading Systems",
    sector: "Finance and technology",
    kind: "Website, store and member area",
    note: "Algorithmic trading systems, a book catalogue and a member area, across a deep multi-level structure.",
    url: "https://firebirdtradingsystems.com/",
    image: "/portfolio/firebird.svg",
  },
  {
    slug: "bleunix",
    name: "Bleunix Digital",
    sector: "Technology",
    kind: "Website design and build",
    note: "New York growth agency: paid media, branding and websites, routed to a single booking link.",
    url: "https://bleunixdigital.com/",
    image: "/portfolio/bleunix.svg",
  },
];

export const firstTenDays: Stage[] = [
  { n: "01", title: "Day one", body: "A thirty-minute call with your point of contact. What the business does, who buys from it, and what is not working. No deck and no pitch." },
  { n: "02", title: "Day two", body: "A written scope in your inbox: what we will make, the fixed price, and the delivery dates. If it is not right, say no and you owe nothing." },
  { n: "03", title: "Day five", body: "First directions to react to. Real work on real content, not mood boards borrowed from other people's brands." },
  { n: "04", title: "Day ten", body: "The direction you chose, refined and applied across the pieces you will actually use. Revisions start from here." },
];

export const climbStages: Stage[] = [
  { n: "01", title: "Identity", body: "The mark and the rules around it." },
  { n: "02", title: "Website", body: "The place the mark has to work hardest." },
  { n: "03", title: "Search and social", body: "The traffic that finds it." },
  { n: "04", title: "Growth you can measure", body: "Enquiries, not impressions." },
];

export const testimonials: Testimonial[] = [
  { name: "Jay Mane", role: "Hosting and support", quote: "I had been looking for hosting for ages and landed in the right hands. Consistent communication and quality work throughout my project. I recommend their work to all my fellow business people." },
  { name: "Garcia Miller", role: "Brand launch and marketing", quote: "Launching my brand was only a dream until I got my hands on this marketing team. From website development to social media handling, my brand has been rising daily, with the performance shown through sales." },
  { name: "Scott Michel", role: "Logo design", quote: "Each step felt like an easy breeze, and I was educated throughout the way. The logo design was just as I always imagined, with each aspect perfectly handled." },
  { name: "Christian Walker", role: "SEO and social", quote: "With excellent communication and honest recommendations, these guys almost doubled my revenue through SEO and SMM. The search and social strategy is top-notch, bringing in more clients daily." },
  { name: "Spencer Hill", role: "Retained client", quote: "Highly professional, with excellent communication and punctuality. The packages are affordable, which is why I have been a retaining client. Recommend these guys." },
];

export const faqs = [
  { q: "What will it cost?", a: "Most projects land between $500 and $5,000. You get a fixed price in writing before any work starts, quoted from the scope we agree on the first call. We do not bill by the hour, and the number does not move unless you ask for something outside that scope." },
  { q: "How long does it take?", a: "An identity usually runs three to four weeks. A website runs six to eight from kickoff to launch, assuming content is ready. Search and social work is monthly and ongoing." },
  { q: "Who owns the files and accounts?", a: "You do, from day one. Source files, domain, hosting, analytics and ad accounts are all registered in your name and handed over with documentation." },
  { q: "Can you work on a site someone else built?", a: "Usually. We audit what is there first and tell you honestly whether it is worth improving or worth replacing. Sometimes the answer is that your current site is fine and the money belongs in marketing instead." },
  { q: "Do you work with clients in other countries?", a: "Yes. Most of the work happens over email and scheduled calls, and we hold hours that overlap with your working day." },
];

export const articles: Article[] = [
  {
    slug: "what-a-logo-has-to-do",
    title: "What a logo actually has to do",
    description: "A logo is not a picture of your business. It is a piece of equipment with a job, and most of that job happens at sizes nobody designs for.",
    tag: "Identity",
    date: "2026-08-14",
    readingTime: "4 min",
    body: [
      { text: "Most logo briefs describe a feeling. Modern but warm. Premium but approachable. Those words are not wrong, they are just not instructions, and a designer working only from them is guessing." },
      { heading: "It has to survive being small", text: "The place your mark appears most often is a 32-pixel favicon, a circular profile photo cropped by a platform you do not control, and a notification badge. Any detail that disappears at that size is decoration you paid for and will never see." },
      { heading: "It has to work in one colour", text: "Embroidery, an engraved sign, a black-and-white listing. If the mark needs a gradient to be readable, it breaks in all of them. Build it in black on white first, and treat colour as something added afterwards." },
      { heading: "It has to be describable", text: "Could a customer describe your mark to a friend accurately enough that they would recognise it? Marks that pass are built on one clear idea rather than three competing ones." },
      { heading: "It has to be ownable", text: "Search your industry plus the word logo and look at the first forty results. If your mark could sit in that grid unnoticed, it is identifying your sector rather than you." },
    ],
  },
  {
    slug: "why-your-website-is-slow",
    title: "Why your website is slow, and what it is costing you",
    description: "Slow sites lose customers before a single word is read. The causes are usually four things, and three of them are free to fix.",
    tag: "Web development",
    date: "2026-08-28",
    readingTime: "5 min",
    body: [
      { text: "Speed is the first impression, delivered before your headline has rendered. People leave slow pages, and the ones who stay trust what they find less." },
      { heading: "Images straight from the camera", text: "A phone photograph is often four thousand pixels wide. Displayed in a card three hundred pixels across, every extra pixel is downloaded and thrown away. Resize and export as WebP and a page can lose eighty per cent of its weight." },
      { heading: "Plugins nobody removed", text: "Every plugin adds code to every page, including pages that do not use it. Audit what is installed against what is actually used, and be ruthless." },
      { heading: "Fonts loading in the wrong order", text: "A badly configured font blocks text from appearing until it downloads. Preconnect to the host, limit the weights you load, and set display behaviour so text renders immediately in a fallback." },
      { heading: "Hosting chosen on price alone", text: "Shared hosting puts your site on a machine with hundreds of others. When one gets traffic, yours slows down. It is the hardest to fix and it sets the ceiling on everything else." },
    ],
  },
  {
    slug: "local-seo-first-moves",
    title: "Local SEO: the first five moves for a small business",
    description: "Before you spend anything on content or links, five pieces of housekeeping decide whether you appear in local search at all.",
    tag: "Search",
    date: "2026-09-04",
    readingTime: "5 min",
    body: [
      { text: "Someone typing your service plus a town name is closer to buying than almost any other visitor you will get. Five things decide whether you show up for them." },
      { heading: "Claim the Google Business Profile", text: "It outranks your website in map results. Claim it, verify it, then finish it properly: correct category, service list, hours, and real photographs rather than stock." },
      { heading: "Make your details identical everywhere", text: "Suite 200 in one place and Ste. 200 in another is enough inconsistency to weaken the signal. Pick one exact format and use only that." },
      { heading: "Put the address in the markup", text: "Structured data tells search engines what your address is rather than making them infer it. One block of code, invisible to visitors." },
      { heading: "Ask for reviews at the right moment", text: "Ask immediately after delivering something the customer is pleased with, with a link straight to the review form. Never buy reviews." },
      { heading: "One page per service, per place", text: "A single page listing five services competes weakly for all five. Separate pages, each about one thing, compete much better." },
    ],
  },
];

export const pricing = [
  { title: "Brand identity", figure: "from $500", body: "Logo suite, colour and type system, social and stationery kit, written guidelines. Three to four weeks.", note: "Extended systems, photography direction and templates are scaled from the same starting point." },
  { title: "Website, designed and built", figure: "from $500", body: "Designed and developed, mobile first, with an editor you can use and analytics configured. Six to eight weeks.", note: "Ecommerce and booking systems are quoted separately, toward the upper end of the range." },
  { title: "Search and social, monthly", figure: "from $500 / month", body: "Ongoing SEO, content and campaign management with monthly reporting against enquiries. Thirty days' notice to stop.", note: "Advertising budget is paid by you, direct to the platform. We take no commission on it." },
];
