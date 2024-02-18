"use client"
import React, { memo, useState } from "react"
import { CreateModal } from "./CreateModal";
import { IoIosAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

export const CreateButton = () => {
    const [projectName, setProjectName] = useState("");
    const router = useRouter();

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
        router.replace(`/project/${data.id}/`)
       
    };
    return (
       <div className="p-2 mt-5">
        <input
            type="text"
            placeholder="プロジェクト追加する"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mb-4 px-10 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <IoIosAdd className="mb-10 mt-2 mx-auto cursor-pointer" size={"1.8em"} onClick={handleCreateProject}/>

       </div>
    )

}