import { adminDB } from "@/lib/firebases/server";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "../../types";

export async function DELETE(request: NextRequest) {
    const reqBody = (await request.json()) as { projectId: string };
    
    const docRef = adminDB.collection('projects').doc(reqBody.projectId);
    // ドキュメントを削除
    await docRef.delete()
    return NextResponse.json<APIResponse<{id: string}>>({ success: true, data: {id: docRef.id}});
  }