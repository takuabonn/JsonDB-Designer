import React, { memo } from "react";
import {
  EdgeProps,
  EdgeText,
  // getEdgeCenter,
  getSmoothStepPath,
  BaseEdge,
} from "reactflow";
import { RelationEdgeData } from "./types";


export const RelationEdge = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
  }: EdgeProps<RelationEdgeData>) => {
    const [path, centerX, centerY] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      borderRadius: 8,
    });
    console.log(data)
  
  
    const { relationType } = data!;
    
    if (typeof relationType === 'undefined' || !["Many-Many", "One-Many", "One-One"].includes(relationType)) {
      // relationType が undefined の場合、エッジを描画せずに null を返す
      return null;
    }
  
    const [markerStart, markerEnd] = {
      "Many-Many": ["url(#many)", "url(#many)"],
      "One-Many": ["url(#one)", "url(#many)"],
      "One-One": ["url(#one)", "url(#one)"],
    }[relationType];
  
    return (
      <>
        <BaseEdge
          path={path}
          markerStart={markerStart}
          markerEnd={markerEnd}
        />
      </>
    );
  };
  