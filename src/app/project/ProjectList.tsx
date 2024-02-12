'use client'
import { db } from "@/lib/firebases/client";
import { collection, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDatabase } from "react-icons/fa6";

type PropsType = {
    userId: string;
}


export const ProjectList = ({userId}: PropsType) => {

    const [projects, setProjects] = useState<any[]>([])
    useEffect(() => {
        const projectsCollectionRef = collection(db, 'projects');
        const q = query(projectsCollectionRef, where('user_id', '==', userId), limit(12));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ret:any[] = [];
            querySnapshot.forEach((doc) => {
              ret.push({ ...doc.data(), project_id: doc.id });
            });
            setProjects(ret);
          }, (error) => {
            console.error('Error getting projects:', error);
          });

        // コンポーネントがアンマウントされたときにリスナーを解除する
        return () => unsubscribe();
     
    }, [userId])

    const onDelete = async (projectId:string) => {
        const response = await fetch("/api/project/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ projectId }),
          });
    }

    return (
        <div className="w-9/12 mx-auto mt-10 grid grid-cols-4 gap-4">
          
            {
                projects.map(project => (
                    <div className="border rounded shadow-xl h-auto" key={project.project_id}>
                        <div className="flex justify-center py-10 px-2 gap-4 ">
                            <FaDatabase className="text-green-400" size={"1.5em"}/>
                        <div>{project.projectName}</div>
                        </div>
                        <div className="flex justify-center w-32  mx-auto pb-2 gap-4">
                        <Link href={`/project/${project.project_id}`}>
                            <button className="text-green-400 hover:text-green-500">編集</button>
                        </Link>
                            <button onClick={() => onDelete(project.project_id)} className="text-green-400 hover:text-green-500">削除</button>
                        </div>
                    </div>
                ))
            }
            
        </div>
    )
}