import { apiClient } from "./client";

export interface Campaign {
  id: string;
  title: string;
  organization: string;
  category: string;
  status: "OPEN" | "CLOSED" | "UPCOMING";
  location: string;
  deadline: string;
  description: string;
  budget: string | null;
  eligibility: string[];
  contactInfo: string | null;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  applicationCount: number;
}

export interface CampaignsResponse {
  campaigns: Campaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CampaignFilters {
  search?: string;
  category?: string;
  status?: "OPEN" | "CLOSED" | "UPCOMING";
  minBudget?: number;
  maxBudget?: number;
  page?: number;
  limit?: number;
}

export interface CreateCampaignData {
  title: string;
  organization: string;
  category: string;
  location: string;
  deadline: string;
  description: string;
  budget?: number;
  eligibility?: string[];
  contactInfo?: string;
}

export async function getCampaigns(filters: CampaignFilters = {}): Promise<CampaignsResponse> {
  const params = new URLSearchParams();
  
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.status) params.append("status", filters.status);
  if (filters.minBudget) params.append("minBudget", filters.minBudget.toString());
  if (filters.maxBudget) params.append("maxBudget", filters.maxBudget.toString());
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const queryString = params.toString();
  const endpoint = queryString ? `/campaigns?${queryString}` : "/campaigns";

  return apiClient<CampaignsResponse>(endpoint);
}

export async function getCampaign(id: string): Promise<{ campaign: Campaign }> {
  return apiClient<{ campaign: Campaign }>(`/campaigns/${id}`);
}

export async function createCampaign(data: CreateCampaignData): Promise<{ campaign: Campaign }> {
  return apiClient<{ campaign: Campaign }>("/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
}