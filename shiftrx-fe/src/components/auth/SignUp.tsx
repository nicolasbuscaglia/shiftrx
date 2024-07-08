"use client";
import { useSignUpMutation } from "@/redux/services/authApi";
import AuthForm from "./AuthForm";
import Link from "next/link";

const SignUp = () => {
  const [signUp, { error }] = useSignUpMutation();

  return (
    <AuthForm label="Sign up" onAuth={signUp} error={error}>
      <div className="mt-3">
        <span className="text-sm mr-1">Have an account?</span>
        <Link href="/login">
          <span className="text-blue-500 text-sm">Login</span>
        </Link>
      </div>
    </AuthForm>
  );
};

export default SignUp;
