import { TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { X } from "react-feather";
import toast from "react-hot-toast";
import { deleteTask } from "../utils/todoRequests";

const Task: FC<{
  task: TodoTask;
  index: number;
  fetchTasks: () => void;
  listId: string;
}> = ({ task, index, fetchTasks, listId }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="px-4 py-3 w-full shadow rounded-lg bg-gray-700 mb-4 flex items-center justify-between group"
        >
          <span>{task.title}</span>
          <X
            height="20"
            width="20"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={async () => {
              const promise = deleteTask(listId, task.id);
              toast.promise(promise, {
                loading: "Deleting task",
                success: "Deleted task",
                error: "Error deleting task",
              });
              await promise;
              fetchTasks();
            }}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
