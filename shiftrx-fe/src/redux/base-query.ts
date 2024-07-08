"use client";
import { getAccessToken } from "@/services/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});
