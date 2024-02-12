import { adminDB } from "@/lib/firebases/server";
import { getCurrentUser } from "@/lib/firebases/server";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "../../types";

export interface ModelNodeData {
    tableName: string;
    documentation?: string;
    columns: Array<{
      name: string;
      type: string;
      displayType?: string;
      documentation?: string;
      defaultValue?: string | null;
    }>;
    relations: RelationCol[] | [];
  }
  
  export interface JsonData {
    tables: ModelNodeData[];
    relations: Array<{
      source: Source;
      target: Target;
      relationType: RelationType;
    }>;
  }

  interface Source {
    table: string;
    column: string;
    relationName: string;
  }
  interface Target {
    table: string;
    column: string;
    relationName: string;
  }

    
  export interface RelationCol {
    type: "source" | "target";
    relationName: string;
    relationType: RelationType;
  }

  export interface RelationData {
    source: Source;
    target: Target;
    relationType: RelationType;
  }
  
  export type RelationDataList = RelationData[];
  
  export type RelationType = "Many-Many" | "One-Many" | "One-One";
export async function PUT(request: NextRequest) {
    const reqBody = (await request.json()) as { projectId: string, tables: ModelNodeData[], relations: RelationData[] };

    let documentRef = adminDB.doc(`projects/${reqBody.projectId}`)
    documentRef.update({
        tables: reqBody.tables,
        relations: reqBody.relations,
    })

    return NextResponse.json<APIResponse<string>>({ success: true, data: "has been created" });

  }