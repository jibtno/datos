"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/utils/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function handleOAuthCallback() {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error("OAuth callback error:", error.message);
        // Optionally redirect to error page
      } else {
        router.push("/admin");
      }
    }

    handleOAuthCallback();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center text-lg font-medium">
      Processing sign-in...
    </div>
  );
}
