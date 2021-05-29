import { TaskStatus, TodoTask } from "@microsoft/microsoft-graph-types";
import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../utils/types";
import Task from "./Task";
import { createTask } from "../utils/todoRequests";

const Column: FC<{
  column: ColumnType;
  tasks: TodoTask[];
  taskListId: string;
  fetchTasks: () => void;
}> = ({ column, tasks, taskListId, fetchTasks }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const onNewTaskName = (e) => setNewTaskName(e.target.value);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="flex flex-col h-full"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}

          {provided.placeholder}

          {/* <form
              className="flex rounded-lg border border-gray-700 focus-within:shadow focus-within:border-transparent focus-within:bg-gray-700 transition-all overflow-hidden bg-gray-700"
              onSubmit={async (e) => {
                const newTaskNameCopy = newTaskName;
                setNewTaskName("");
                e.preventDefault();
                console.log(newTaskNameCopy);
                await createTask(taskListId, {
                  title: newTaskNameCopy,
                  status: column.id as TaskStatus,
                });
                fetchTasks();
              }}
            >
              <input
                className="w-full p-4 focus:outline-none bg-transparent"
                type="text"
                placeholder="Add task"
                value={newTaskName}
                onChange={onNewTaskName}
              />
            </form> */}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
