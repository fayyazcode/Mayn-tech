export type ServiceKey = "identity" | "web-design" | "development" | "seo" | "social";

export interface Service {
  slug: ServiceKey;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface Project {
  slug: string;
  name: string;
  sector: string;
  kind: string;
  note: string;
  url: string;
  image: string;
}

export interface Stage {
  n: string;
  title: string;
  body: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readingTime: string;
  body: { heading?: string; text: string }[];
}

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };
