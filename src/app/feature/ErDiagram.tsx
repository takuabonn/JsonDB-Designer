"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  updateEdge,
  NodeTypes,
  Connection,
  applyNodeChanges,
  OnNodesChange,
} from "reactflow";
import Editor from "@monaco-editor/react";
import { JsonData, RelationCol, RelationType } from "@/app/node/types";
import { TableNode } from "@/app/node/TableNode";
import "reactflow/dist/style.css";
import {RelationEdge} from "@/app/relationEdge/RelationEdge";
import {
  relationEdgeSourceHandleId,
  relationEdgeTargetHandleId,
} from "@/util/relationHandle";
const nodeTypes = {
  table: TableNode,
};
const edgeTypes = {
  relation: RelationEdge,
};

type PropsType = {
  currentJson: string,
  previewMode?: boolean,
  projectId?: string
}
export const ERDiagram = ({currentJson, previewMode, projectId}:PropsType) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = (changes: any) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes as any) as any);
  };

  useEffect(() => {
    try {
      if (currentJson.trim() === "") {
        setNodes([]);
        setEdges([]);
        return;
      }
  
      const { tables, relations } = JSON.parse(currentJson) as JsonData;

      const cuTableNameMap:any = {}
      const cuRelationNameMap: any = {}
      for(const table of tables) {
        
        if (table.tableName in cuTableNameMap) return;
        cuTableNameMap[table.tableName] = 1;
        
      }
      for(const relation of relations) {
        if (relation.source.relationName in cuRelationNameMap || relation.target.relationName in cuRelationNameMap) return;
        cuRelationNameMap[relation.source.relationName] = 1;
        cuRelationNameMap[relation.target.relationName] = 1;
      }

      const newNodes = tables.map((table, index) => {
        const tableRelations: Array<RelationCol> = relations?.reduce(
          (result, relation) => {
            if (table.tableName === relation.source.table) {
              return [...result,  {
                type: "source",
                relationName: relation.source.relationName,
                relationType: relation.relationType as RelationType,
              }];
            }
            if (table.tableName === relation.target.table) {
              return [...result, {
                type: "target",
                relationName: relation.target.relationName,
                relationType: relation.relationType as RelationType,
              }];
            }
            return result
          },
          [] as Array<RelationCol>
        );

        const previousNode:Node|undefined = nodes.find((prev: Node) => prev.id === table.tableName);

        return {
          id: table.tableName,
          type: "table", // テーブルを表すタイプ
          position: {
            x: previousNode?.position.x ?? ((index + 1) % 2) * 20,
            y: previousNode?.position.y ?? Math.floor((index + 1) / 2) * 150,
          }, // 2個ずつで改行する配置
          width: 100, // 仮の幅を設定
          height: 50, // 仮の高さを設定
          data: { ...table, relations: tableRelations },
        };
      });
      const relationEdges = relations?.map((rel) => {
        const base = {
          id: `edge-${rel.source.relationName}-${rel.target.relationName}`,
          type: "relation",
          data: { relationType: rel.relationType },
        };
        return {
          ...base,
          source: rel.source.table,
          target: rel.target.table,
          sourceHandle: relationEdgeSourceHandleId(rel.source.relationName),
          targetHandle: relationEdgeTargetHandleId(rel.target.relationName),
        };
      });
     

      setEdges(relationEdges);
      
      setNodes(newNodes);
     
    } catch (error) {
      // console.error("Invalid JSON:", error);
    }
  }, [currentJson]);

  const onSave = async () => {
    const request = JSON.stringify({...JSON.parse(currentJson), projectId: projectId})
    const response = await fetch(`/api/project/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: request,
    });
  }

  return (
    <>
      <div className="w-2/3 h-auto">
        {!previewMode && <button className="w-32 h-auto px-2 bg-green-400 hover:bg-green-500 text-white border rounded" onClick={onSave}>save</button>}
        <ReactFlow
          // fitView
          snapToGrid
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
      <svg width="0" height="0">
        <defs>
          <marker
            id="one"
            markerWidth="12.5"
            markerHeight="12.5"
            // eslint-disable-next-line react/no-unknown-property
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeWidth="3"
              strokeLinecap="square"
              fill="none"
              points="-10,-8 -10,8"
            />
          </marker>

          <marker
            id="many"
            markerWidth="12.5"
            markerHeight="12.5"
            // eslint-disable-next-line react/no-unknown-property
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeLinejoin="round"
              strokeLinecap="square"
              strokeWidth="1.5"
              fill="none"
              points="0,-8 -10,0 0,8"
            />
          </marker>
        </defs>
      </svg>
    </>
  );
};
