"use client";
import { signInWithGoogle } from "@/lib/firebases/auth";
import { useRouter } from "next/navigation";
import React from "react";

export const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();

    if (isOk) router.push("/project/previewMode");
  };
  return (
    <button
      className="w-44 h-16 mt-24 bg-green-400 hover:bg-green-400/50 rounded-lg text-2xl text-white absolute mx-auto"
      onClick={handleSignIn}
    >
      Try it
    </button>
  );
};
