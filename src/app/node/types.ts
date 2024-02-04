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
  
  export interface RelationData {
    source: Source;
    target: Target;
    relationType: RelationType;
  }
  
  export type RelationDataList = RelationData[];
  
  export interface RelationCol {
    type: "source" | "target";
    relationName: string;
    relationType: RelationType;
  }
  
  export type RelationType = "Many-Many" | "One-Many" | "One-One";
  