"use client";
import React from "react";
import Editor from "@monaco-editor/react";

const TableDoc = () => {
  const code = `{
    "tableName": "users",
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "defaultValue": null
      },
      {
        "name": "full_name",
        "type": "string",
        "defaultValue": null
      }
    ]
  }`;

  return (
    <div className="mx-auto w-11/12 flex gap-x-5 ">
      <div className="w-1/2 overflow-hidden">
        <Editor
          height="300px"
          defaultLanguage="json"
          defaultValue={code}
          options={{ readOnly: true }}
        />
      </div>
      <div className="mb-4 w-1/2 font-light">
        <h2 className="text-center text-2xl font-bold pt-5 ">
          テーブル作成のJSONデータ
        </h2>
        <div className="mt-5 w-2/3 mx-auto">
          <p className="mt-5">以下のJSONデータは、テーブルの構造を表します。</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>tableName:</strong> テーブル名を表します。
            </li>
            <li>
              <strong>columns:</strong> テーブルの各カラムを表します。
            </li>
          </ul>
          <p className="mt-5">各カラムは以下のように構成されます:</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>name:</strong> カラムの論理名を表します。
            </li>
            <li>
              <strong>type:</strong> カラムの型を表します。
            </li>
            <li>
              <strong>defaultValue:</strong> デフォルト値を表します。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TableDoc;
