"use client"
import { db } from "@/lib/firebases/client";
import { addDoc, collection, doc, getCountFromServer, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react"
import { CreateModal } from "./CreateModal";

export const ProjectCreate = () => {
    const [isOpen, setOpen] = useState(false)
    return (
       <>
        <button className="text-green-400 hover:text-green-600" onClick={() => setOpen(true)}>プロジェクト作成</button>
        {isOpen && <CreateModal setOpen={setOpen}/>}
       </>
    )

}