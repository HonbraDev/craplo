import { TaskStatus, TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../utils/types";
import Task from "./Task";

const Column: FC<{
  column: ColumnType;
  tasks: TodoTask[];
  fetchTasks: () => void;
}> = ({ column, tasks, fetchTasks }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="flex flex-col h-full"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              fetchTasks={fetchTasks}
              listId={column.id}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
