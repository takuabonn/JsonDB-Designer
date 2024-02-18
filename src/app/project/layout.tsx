import { getCurrentUser } from "@/lib/firebases/server";
import { Header } from "../Header";
import { ProjectList } from "./ProjectList";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FaDatabase } from "react-icons/fa6";
import Link from "next/link";
import { CreateButton } from "./CreateButton";

export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();

  return (
        <div className="flex flex-col">
          
            <div className="flex">
                <div className="flex justify-around w-56 shrink-0 text-center self-center">
                    <div>PROJECT</div>
                    <FaArrowLeft className="cursor-pointer"/>
                </div>
                <Header/>
            </div >
           
            <div className="flex">
                <div className="w-56 shrink-0 border-x overflow-scroll" style={{height:"90vh"}}>
                <p className="mt-3 text-center text-sm text-gray-500/40">プレビューモード</p>
                <Link href={"/project/previewMode"}>
                        <div className=" h-16 px-5 py-5 border-b" >
                            <div className="flex justify-center  px-2 gap-4 relative">
                                <FaDatabase className="text-green-400" size={"1.3em"}/>
                              
                    
                            </div>
                        
                        </div>
                        </Link>

                    {/* <IoIosAdd className="mb-10 mt-5 mx-auto cursor-pointer" size={"1.8em"}/> */}
                    <CreateButton/>
                    <p className="text-center text-sm text-gray-500/40">プロジェクト一覧</p>
                    
                    <ProjectList userId={currentUser?.uid!}/>
                </div>
                {children}
            
            </div>
        </div>
  );
}
