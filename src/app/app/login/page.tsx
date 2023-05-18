"use client";
import SignIn from "@/components/app/signIn";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((e, session) => {
      if (session) {
        router.push("/");
      }
    });
  }, [supabase]);
  return (
    <main className="">
      <SignIn />
    </main>
  );
}
