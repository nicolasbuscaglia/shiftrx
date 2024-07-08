"use client";
import { useLoginMutation } from "@/redux/services/authApi";
import AuthForm from "./AuthForm";
import Link from "next/link";

const Login = () => {
  const [login, { error }] = useLoginMutation();

  return (
    <AuthForm label="Login" onAuth={login} error={error}>
      <div className="mt-3">
        <span className="text-sm mr-1">No account?</span>
        <Link href="/register">
          <span className="text-blue-500 text-sm">Sign Up</span>
        </Link>
      </div>
    </AuthForm>
  );
};

export default Login;
