'use client'
import { signInWithGoogle, signOut } from "@/lib/firebases/auth";
import { getCurrentUser } from "@/lib/firebases/server";
import { UserRecord } from "firebase-admin/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const router = useRouter();
  

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();

    if (isOk) router.push("/");
  };

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push("/");
  };
  
  return (
    <>
     <div className="flex justify-between content-center items-center w-full h-12 bg-green-400 text-white">
        <div className="pl-5">
        <h1> JSONDB-DESIGNER</h1>
        </div>
        <div className="pr-5">
        <button className="inline-block px-3" onClick={handleSignIn}>Login</button>
        <button className="inline-block px-3" onClick={handleSignOut}>Logout</button>
        </div>
        </div>
    </>
  );
}
