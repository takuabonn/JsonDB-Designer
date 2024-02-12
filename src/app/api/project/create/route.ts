import { adminDB } from "@/lib/firebases/server";
import { getCurrentUser } from "@/lib/firebases/server";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "../../types";

export async function POST(request: NextRequest) {
    const reqBody = (await request.json()) as { projectName: string };

    const currentUser = await getCurrentUser();
    let documentRef = adminDB.collection('projects').doc();

    documentRef.create({
        project_id: documentRef.id,
        projectName: reqBody.projectName,
        user_id: currentUser?.uid
    })
    

    return NextResponse.json<APIResponse<{id: string}>>({ success: true, data: {id: documentRef.id}});

  }