import { TodoTask } from "@microsoft/microsoft-graph-types";

export interface ColumnType {
  id: string;
  title: string;
  taskIds: string[];
}

export interface TaskState {
  tasks: Record<string, TodoTask>;
  columns: Record<string, ColumnType>;
  columnOrder: string[];
}
