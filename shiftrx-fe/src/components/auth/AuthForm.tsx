"use client";
import { useAuth } from "@/app/context/AuthProvider";
import { setAccessToken } from "@/services/auth";
import { AuthFormInput } from "@/types/User";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorForm from "../ErrorForm";
import SubmitButton from "../SubmitButton";

interface AuthFormProps {
  label: string;
  onAuth: (data: AuthFormInput) => Promise<{ data?: { access_token: string } }>;
  error?: FetchBaseQueryError | SerializedError | undefined;
  children?: ReactNode;
}

const AuthForm = ({ label, onAuth, error, children }: AuthFormProps) => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInput>();

  const onSubmit: SubmitHandler<AuthFormInput> = async (data) => {
    const { data: response } = await onAuth({
      username: data.username,
      password: data.password,
    });
    if (response) {
      setAccessToken(response.access_token);
      setIsAuthenticated(true);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 min-w-full">
      <div className="p-6 bg-white rounded shadow-md min-w-80 max-w-80">
        <h2 className="mb-4 text-xl font-bold">{label}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 text-sm">
              Username
            </label>
            <input
              id="username"
              {...formRegister("username")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formRegister("password")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            <ErrorForm error={error} />
          </div>
          <SubmitButton label={label} />
        </form>
        {children}
      </div>
    </div>
  );
};

export default AuthForm;
