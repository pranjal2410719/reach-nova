import { apiClient, ApiClientError } from "./client";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "INFLUENCER" | "BRAND" | "ADMIN";
  createdAt?: string;
}

export interface AuthUser {
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "INFLUENCER" | "BRAND";
}

export async function login(data: LoginData): Promise<AuthUser> {
  return apiClient<AuthUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signup(data: SignupData): Promise<{ success: boolean }> {
  return apiClient<{ success: boolean }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout(): Promise<{ success: boolean }> {
  return apiClient<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    return await apiClient<AuthUser>("/auth/me");
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 401) {
      return null;
    }
    throw error;
  }
}