import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

export const cateringSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a phone number."),
  eventDate: z.string().min(1, "Please choose a date."),
  startTime: z.string().optional().default(""),
  endTime: z.string().optional().default(""),
  location: z.string().min(1, "Please choose a location."),
  guestCount: z.string().min(1, "Please estimate your guest count."),
  eventType: z.string().min(1, "Please choose an event type."),
  addOns: z.array(z.string()).optional().default([]),
  notes: z.string().max(2000).optional().default(""),
});

export const careersSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a phone number."),
  role: z.string().min(1, "Please choose a role."),
  location: z.string().min(1, "Please choose a location."),
  over18: z
    .union([z.boolean(), z.string()])
    .refine((v) => v === true || v === "true" || v === "on", {
      message: "You must be 18 or older to apply.",
    }),
  availability: z.string().min(1, "Please share your availability."),
  message: z.string().max(2000).optional().default(""),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CateringInput = z.infer<typeof cateringSchema>;
export type CareersInput = z.infer<typeof careersSchema>;
