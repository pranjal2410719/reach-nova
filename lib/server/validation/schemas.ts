import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["INFLUENCER", "BRAND", "ADMIN"]).default("INFLUENCER"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const campaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["OPEN", "CLOSED", "UPCOMING"]).default("OPEN"),
  location: z.string().min(1, "Location is required"),
  deadline: z.string().transform((str) => new Date(str)),
  description: z.string().min(1, "Description is required"),
  budget: z.number().optional(),
  eligibility: z.array(z.string()).default([]),
  contactInfo: z.string().optional(),
});

export const applicationSchema = z.object({
  campaignId: z.string().min(1, "Campaign ID is required"),
  message: z.string().optional(),
});

export const applicationUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export const campaignFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  minBudget: z.coerce.number().optional(),
  maxBudget: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CampaignInput = z.infer<typeof campaignSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ApplicationUpdateInput = z.infer<typeof applicationUpdateSchema>;
export type CampaignFilters = z.infer<typeof campaignFiltersSchema>;