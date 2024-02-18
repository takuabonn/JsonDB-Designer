import { Editor } from "@monaco-editor/react";
import { ERDiagram } from "./feature/ErDiagram";
import { useState } from "react";
import { getCurrentUser } from "@/lib/firebases/server";
import { ProjectList } from "./project/ProjectList";
import { FaDatabase } from "react-icons/fa6";
import Link from "next/link";
import { ProjectCreate } from "./project/ProjectCreate";
import Image from "next/image";
import { SignIn } from "./auth/SignIn";
import TableDoc from "./docs/TableDoc";
import RelationDoc from "./docs/RelationDoc";
// export const runtime = 'edge';
export default async function Home() {
  return (
    <>
      <header className="z-10 fixed top-0 left-0 w-full bg-green-400 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">JSONDB DESIGNER</h1>
        {/* <nav className="mt-2 text-sm">
          <a href="#" className="text-white hover:text-white mr-4">
            ホーム
          </a>
          <a href="#" className="text-white hover:text-white mr-4">
            ログイン
          </a>
        </nav> */}
      </header>
      <div className="h-96 w-screen mt-5 bg-gradient-to-bl from-blue-500 via-green-500 to-yellow-200">
        <div className="flex justify-center gap-3">
          <div className="pl-16 pt-32 relative">
            <div>
              <div className="text-4xl text-white my-auto">JSONDB</div>
              <div className="text-4xl text-white my-auto">DESIGNER</div>
            </div>
            <div className="mt-8 text-white">
              <h1 className="text-center text-3xl font-bold mb-4">
                直感的なJSON形式で
              </h1>
              <h1 className="text-3xl font-bold mb-4">DB設計</h1>
            </div>
            <SignIn />
          </div>
          <div className="shrink mt-28">
            <div
              className="shadow-blue-500 shadow-2xl relative"
              style={{ height: "400px", width: "800px" }}
            >
              <Image
                className=""
                src={"/CreateNextApp3-ezgif.com-crop (1).gif"}
                alt="json-db-designer"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-64 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

      <div className="mt-20 pb-16">
        <div className="mt-5">
          <TableDoc />
        </div>
        <div className="mt-20">
          <RelationDoc />
        </div>
      </div>
      <hr className="mt-1 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

      <footer className="w-full bg-green-400 text-white py-4 text-center">
        <p className="inline-block">&copy; 2024 takuabonn</p>
        <Link href={"/termsOfService"} className="ml-5 inline-block">
          利用規約
        </Link>
        <Link href={"/privacyPolicy"} className="ml-5 inline-block">
          プライバシーポリシー
        </Link>
      </footer>
    </>
  );
}
