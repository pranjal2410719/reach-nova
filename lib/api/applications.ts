import { apiClient } from "./client";

export interface Application {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string | null;
  createdAt: string;
  campaign: {
    id: string;
    title: string;
    organization: string;
    category: string;
    status: string;
    location: string;
    deadline: string;
  };
}

export interface ApplicationResponse {
  application: Application;
}

export interface ApplicationsResponse {
  applications: Application[];
}

export interface ApplyData {
  campaignId: string;
  message?: string;
}

export async function apply(data: ApplyData): Promise<ApplicationResponse> {
  return apiClient<ApplicationResponse>("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getUserApplications(): Promise<ApplicationsResponse> {
  return apiClient<ApplicationsResponse>("/applications/user");
}

export async function getCampaignApplications(campaignId: string): Promise<ApplicationsResponse> {
  return apiClient<ApplicationsResponse>(`/applications/campaign/${campaignId}`);
}

export async function updateApplicationStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
): Promise<ApplicationResponse> {
  return apiClient<ApplicationResponse>(`/applications/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}