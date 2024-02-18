'use client'
import { ERDiagram } from "@/app/feature/ErDiagram";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

const defaultJson = {
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
export default function PreviewMode() {
  const [currentJson, setJson] = useState(JSON.stringify(defaultJson, null, 2));

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
      // console.error("Invalid JSON:", error);
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
       
      />
      </div>
      <div className="grow shrink p-0 basis-1/3">
      <ERDiagram currentJson={currentJson} previewMode={true}/>

      </div>
    </>
  );
}

