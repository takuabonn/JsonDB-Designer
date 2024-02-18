import { adminDB } from "@/lib/firebases/server";
import firebase from "firebase/compat/app";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "../../types";

type DataType = {
    projectName: string;
    user_id: string;
}
export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } },
  ): Promise<NextResponse<APIResponse<DataType>> | undefined> {
    const id = params.projectId;
    try {
        const docRef = adminDB.collection("projects").doc(id)
        const doc = await docRef.get();
        
        if (!doc.exists) {
          console.log('ドキュメントが存在しません');
          return;
        }
        const data = doc.data() as DataType;
        return NextResponse.json<APIResponse<DataType>>({ success: true, data: data });

      } catch (error) {
        console.error('ドキュメントの取得中にエラーが発生しました', error);
      }
       
  }