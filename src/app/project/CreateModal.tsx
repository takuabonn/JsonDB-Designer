"use client"
import { db } from "@/lib/firebases/client";
import { addDoc, collection, doc, getCountFromServer, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react"

export const CreateModal = memo(({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const router = useRouter();
    const [projectName, setProjectName] = useState("");

    const handleCreateProject = async () => {
        const response = await fetch("/api/project/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ projectName }),
          });
          const {data} = await response.json() as any
             // モーダルを閉じる
        setOpen(false);
        router.replace(`/project/${data.id}/`)
       
    };

    return (
        <div className="w-screen h-screen bg-gray-400/50 fixed top-0">
            <div className="z-50 w-80 h-40 bg-white mx-auto mt-60 relative">
            <div className="w-full h-auto px-3 py-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md z-10">
                <input
                    type="text"
                    placeholder="プロジェクト名を入力してください"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <div className="flex justify-center gap-4">
                <button onClick={handleCreateProject} className="w-20 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500">作成</button>
                <button onClick={() => setOpen(false)} className="w-20 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500">閉じる</button>

                </div>
            </div>
            </div>
        </div>
       
    );
});