"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function handleOAuth() {
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        router.replace("/dashboard"); // or your destination after sign-in
      }
    }
    handleOAuth();
  }, [code, supabase, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg text-blue-700">Signing you in...</span>
    </div>
  );
}