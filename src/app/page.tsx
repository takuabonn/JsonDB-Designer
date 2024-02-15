import { Editor } from "@monaco-editor/react";
import { ERDiagram } from "./feature/ErDiagram";
import { useState } from "react";
import { getCurrentUser } from "@/lib/firebases/server";
import { ProjectList } from "./project/ProjectList";
import { FaDatabase } from "react-icons/fa6";
import Link from 'next/link'
import { ProjectCreate } from "./project/ProjectCreate";
import Image from "next/image";
import { SignIn } from "./auth/SignIn";
// export const runtime = 'edge';
export default async function Home() {
  return (
    <>
      {/* <div>{currentUser ? currentUser.displayName : "ゲスト"}</div> */}
      <div className="h-screen w-screen bg-gradient-to-bl from-blue-500 via-green-500 to-yellow-200">
       <div className="flex">
        <div className="pl-16 pt-32 relative">
          <div className="text-8xl text-white my-auto">
          JSONDB
          </div>
        
          <div className="text-8xl text-white my-auto">
          DESIGNER
          </div>
          <SignIn/>
          {/* <button className="w-44 h-16 mt-16 bg-white hover:bg-gray-400/50 rounded-lg text-2xl text-gray-400 absolute left-44">
          Try it
          </button> */}
        </div>
        
        <Image className="pt-32 pl-5 drop-shadow-2xl " src={"/json-db-designer_im.png"} alt="json-db-designer" width={800} height={800}/>

       </div>
      </div>
  
    </>
  );
}
