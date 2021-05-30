import { TaskStatus, TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../utils/types";
import Task from "./Task";

const Column: FC<{
  column: ColumnType;
  tasks: TodoTask[];
  deleteTask: (id: string) => Promise<void>;
}> = ({ column, tasks, deleteTask }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="flex flex-col h-full overflow-y-auto"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              listId={column.id}
              deleteTask={deleteTask}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
