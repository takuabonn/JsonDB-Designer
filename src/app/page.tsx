import { Editor } from "@monaco-editor/react";
import { ERDiagram } from "./feature/ErDiagram";
import { useState } from "react";
import { getCurrentUser } from "@/lib/firebases/server";
import { ProjectList } from "./project/ProjectList";
import { FaDatabase } from "react-icons/fa6";
import Link from 'next/link'
import { ProjectCreate } from "./project/ProjectCreate";
// export const runtime = 'edge';
export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <>
      {/* <div>{currentUser ? currentUser.displayName : "ゲスト"}</div> */}
      <div className="flex justify-center mt-10 gap-10">
        <Link href={"/project/previewMode"}>
          <button className="text-green-400 hover:text-green-600">プレビューモード</button>
        </Link>
        <ProjectCreate/>
      </div>
      <ProjectList userId={currentUser?.uid!}/>
    </>
  );
}
