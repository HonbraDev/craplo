import { TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task: FC<{ task: TodoTask; index: number }> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 w-full shadow rounded-lg bg-gray-700 mb-4"
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
