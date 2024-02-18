"use client";

import React from "react";
import Editor from "@monaco-editor/react";

const RelationDoc = () => {
  const code = `{
    "source": {
      "table": "users",
      "relationName": "user",
      "column": "id"
    },
    "target": {
      "table": "posts",
      "relationName": "posts",
      "column": "user_id"
    },
    "relationType": "One-Many"
  }`;

  return (
    <div className="mx-auto w-11/12 flex gap-x-5">
      <div className="w-1/2 overflow-hidden">
        <Editor
          height="350px"
          defaultLanguage="json"
          defaultValue={code}
          options={{ readOnly: true }}
        />
      </div>
      <div className="w-1/2 font-light">
        <div className="mb-4">
          <h2 className="text-center text-2xl font-bold mb-2">
            リレーションのJSONデータ
          </h2>
          <div className="mt-5 w-2/3 mx-auto">
            <p>以下のJSONデータは、テーブル間のリレーションを表します。</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>source:</strong> リレーションの親を表します。
              </li>
              <li>
                <strong>target:</strong> リレーションの子を表します。
              </li>
              <li>
                <strong>relationType:</strong> 親:子の関係を表します。
              </li>
            </ul>
            <p className="mt-5">sourceとtargetは以下のように構成されます:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>table:</strong> 自身のテーブル名を表します。
              </li>
              <li>
                <strong>relationName:</strong> 一意のリレーション名を表します。
              </li>
              <li>
                <strong>column:</strong>{" "}
                紐づくカラムを表します。外部キーまたは主キーを指定します。
              </li>
            </ul>
            <p className="mt-5">relationType</p>
            <div className="flex">
              <p>1:1 One-One</p>
              <p>1:N One-Many</p>
              <p>N:N Many-Many</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationDoc;
