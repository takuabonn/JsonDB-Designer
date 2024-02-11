import { Editor } from "@monaco-editor/react";
import { ERDiagram } from "./feature/ErDiagram";
import { useState } from "react";
import { getCurrentUser } from "@/lib/firebases/server";

// export const runtime = 'edge';
export default async function Home() {
  const currentUser = await getCurrentUser();
  
  return (
    <>
      <div>{currentUser ? currentUser.displayName : "ゲスト"}</div>
    </>
  );
}
