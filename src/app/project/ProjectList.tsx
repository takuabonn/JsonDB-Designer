"use client";
import { db } from "@/lib/firebases/client";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDatabase } from "react-icons/fa6";

type PropsType = {
  userId: string;
};

export const ProjectList = ({ userId }: PropsType) => {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const projectsCollectionRef = collection(db, "projects");
    const q = query(
      projectsCollectionRef,
      where("user_id", "==", userId),
      limit(12)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ret: any[] = [];
        querySnapshot.forEach((doc) => {
          ret.push({ ...doc.data(), project_id: doc.id });
        });
        setProjects(ret);
      },
      (error) => {
        console.error("Error getting projects:", error);
      }
    );

    // コンポーネントがアンマウントされたときにリスナーを解除する
    return () => unsubscribe();
  }, [userId]);

  const onDelete = async (e: any, projectId: string) => {
    e.preventDefault();

    const response = await fetch("/api/project/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });
  };

  return (
    <div className="w-full mx-auto mt-3 overflow-scroll">
      {projects.map((project) => (
        <Link href={`/project/${project.project_id}`} key={project.project_id}>
          <div className=" h-16 px-5 py-5 border-b" key={project.project_id}>
            <div className="flex justify-start  px-2 gap-4 relative">
              <FaDatabase className="text-green-400" size={"1.3em"} />
              <div className="text-sm">{project.projectName}</div>
              <button
                onClick={(e) => onDelete(e, project.project_id)}
                className="absolute end-0 text-sm text-green-400 hover:text-green-500"
              >
                削除
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
