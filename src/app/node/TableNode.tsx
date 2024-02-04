import {
    relationEdgeSourceHandleId,
    relationEdgeTargetHandleId,
  } from "@/util/relationHandle";
  import { Handle, Position } from "reactflow";
  import { ModelNodeData, RelationCol, RelationDataList } from "./types";
  
  type PropsType = {
    data: ModelNodeData;
    // relationCols: RelationCol[];
  };
  
  export const TableNode = ({ data }: PropsType) => {
    return (
      <table
        className="font-sans bg-white border-2 border-separate border-black rounded-lg"
        style={{ minWidth: 200, maxWidth: 500, borderSpacing: 0 }}
      >
        <thead>
          <tr>
            <th
              className="p-2 font-extrabold bg-gray-200 border-b-2 border-black rounded-t-md"
              colSpan={4}
            >
              {data.tableName}
              {!!data.documentation && (
                <span className="font-mono font-normal">
                  &nbsp;({data.documentation})
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.columns?.map((col) => {
            return (
              <tr key={col.name} title={col.documentation}>
                <td className="font-mono font-semibold border-t-2 border-r-2 border-gray-300">
                  {col.name}
                </td>
                <td className="p-2 font-mono border-t-2 border-r-2 border-gray-300">
                  {col.displayType || ""}
                </td>
                <td className="font-mono border-t-2 border-gray-300">
                  <div className="relative p-2">{col.defaultValue || ""}</div>
                </td>
              </tr>
            );
          })}
          {data.relations?.map((relationCol) => {
            let targetHandle: JSX.Element | null = null;
            let sourceHandle: JSX.Element | null = null;
            const targetHandleId = relationEdgeTargetHandleId(
              relationCol.relationName
            );
            const sourceHandleId = relationEdgeSourceHandleId(
              relationCol.relationName
            );
  
            targetHandle =
              relationCol.type === "target" ? (
                <Handle
                  key={targetHandleId}
                  type="target"
                  id={targetHandleId}
                  position={Position.Left}
                  isConnectable={false}
                />
              ) : null;
            sourceHandle =
              relationCol.type === "source" ? (
                <Handle
                  key={sourceHandleId}
                  type="source"
                  id={sourceHandleId}
                  position={Position.Right}
                  isConnectable={false}
                />
              ) : null;
            return (
              <tr key={relationCol.relationName} title={relationCol.relationName}>
                <td className="font-mono font-semibold border-t-2 border-r-2 border-gray-300">
                  <div className="relative px-2">
                    {relationCol.relationName}
                    {targetHandle}
                  </div>
                </td>
                <td className="p-2 font-mono border-t-2 border-r-2 border-gray-300">
                  {""}
                </td>
                <td className="font-mono border-t-2 border-gray-300">
                  <div className="relative px-2">
                    {""}
                    {sourceHandle}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  