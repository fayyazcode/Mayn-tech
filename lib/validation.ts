import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(120),
  email: z.string().trim().email("That email address does not look right."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "A line or two about the project, please.").max(4000),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  timeline: z.string().trim().max(40).optional().or(z.literal("")),
  // honeypot: real people never fill this in
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
