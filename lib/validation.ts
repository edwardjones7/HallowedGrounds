import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().default(""),
  source: z.string().optional().default("website"),
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

// In-store catering / tray order — distinct from full-service event catering.
export const trayOrderSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a phone number."),
  pickupLocation: z.string().min(1, "Please choose a pickup location."),
  pickupDate: z.string().min(1, "Please choose a pickup date."),
  pickupTime: z.string().optional().default(""),
  items: z.string().min(2, "Please tell us what you'd like to order."),
  quantity: z.string().min(1, "Please estimate a quantity."),
  dietaryNotes: z.string().max(2000).optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().default(""),
  subject: z.string().min(1, "Please choose a topic."),
  message: z.string().min(2, "Please enter a message.").max(2000),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CateringInput = z.infer<typeof cateringSchema>;
export type CareersInput = z.infer<typeof careersSchema>;
export type TrayOrderInput = z.infer<typeof trayOrderSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
