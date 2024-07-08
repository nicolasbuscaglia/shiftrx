import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../base-query";
import { AuthFormInput } from "@/types/User";

const basePath = "/auth/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<{ access_token: string }, AuthFormInput>({
      query: ({ username, password }) => ({
        url: `${basePath}sign-up`,
        method: "POST",
        body: { username, password },
      }),
    }),
    login: builder.mutation<{ access_token: string }, AuthFormInput>({
      query: ({ username, password }) => ({
        url: `${basePath}login`,
        method: "POST",
        body: { username, password },
      }),
    }),
    validateSession: builder.query<{ message: string }, void>({
      query: () => `${basePath}validate`,
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useValidateSessionQuery } =
  authApi;
