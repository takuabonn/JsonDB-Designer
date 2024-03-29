import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { APIResponse } from "@/app/api/types";
import { auth, db } from "@/lib/firebases/client";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

// export const runtime = 'edge';
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      const userDoc = doc(db, "users", userCreds.user.uid);
      const docSnap = await getDoc(userDoc);
      if (!docSnap.exists()) {
        await setDoc(userDoc, {
          name: userCreds.user.displayName,
          id: userCreds.user.uid
        })
      }
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    
  const response = await fetch("/api/auth/signOut", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}