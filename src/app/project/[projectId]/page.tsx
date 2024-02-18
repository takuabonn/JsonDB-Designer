'use client'
import { ERDiagram } from "@/app/feature/ErDiagram";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const iniJson = {
  tables: [
    {
      tableName: "users",
      columns: [
        {
          name: "id",
          type: "integer",
          defaultValue: null,
        },
        {
          name: "full_name",
          type: "string",
          defaultValue: null,
        },
      ],
    },
    {
      tableName: "posts",
      columns: [
        {
          name: "id",
          type: "integer",
          defaultValue: null,
        },
        {
          name: "user_id",
          type: "integer",
          defaultValue: null,
        },
        {
          name: "content",
          type: "string",
          defaultValue: null,
        },
      ],
    },
  ],
  relations: [
    {
      source: {
        table: "users",
        relationName: "user",
        column: "id",
      },
      target: {
        table: "posts",
        relationName: "posts",
        column: "user_id",
      },
      relationType: "One-Many",
    },
  ],
};
export default function Project({ params }: { params: { projectId: string } }) {
  useEffect(() => {
    const projectFetch = async () => {
      const response = await fetch(`/api/project/${params.projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const json = await response.json()
        if (!("tables" in json.data)) {
          return;
        }
        const tables = json.data.tables;
        const relations = json.data.relations
        const mergedJson = {
          tables:tables, relations:relations
        };
        setJson(JSON.stringify(mergedJson, null, 2))

      }
    }
    projectFetch()

  },[])
  const [currentJson, setJson] = useState(JSON.stringify(iniJson, null, 2));

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.updateOptions({
      formatOnType: true,
      formatOnPaste: true,
      formatOnSave: true,
    });
  };
  const handleEditorChange = (value: string | undefined, event: any) => {
    try {
      setJson(value!);
    } catch (error) {
    }
  };
  return (
    <>
     <div className="grow shrink-0 basis-1/3">
      <Editor
        height={"93vh"}
        language="json"
        value={currentJson}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true
        }}
       
      />
      </div>
      <div className="grow shrink p-0 basis-1/3">
      <ERDiagram currentJson={currentJson} projectId={params.projectId}/>

      </div>
   
    </>
  );
}
