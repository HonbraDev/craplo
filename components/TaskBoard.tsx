import { FC, useEffect, useState } from "react";
import Column from "../components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getTask, getTasksObject, updateTask } from "../utils/todoRequests";
import { TaskState } from "../utils/types";
import formTaskState from "../utils/formTaskState";
import defaultTasks from "../utils/defaultTasks";
import { TaskStatus, TodoTask } from "@microsoft/microsoft-graph-types";

const TaskBoard: FC<{ taskListId: string }> = ({ taskListId }) => {
  const [taskState, setTaskState] = useState<TaskState>(defaultTasks);

  const fetchTasks = async () => {
    console.log("Refreshing");
    const promise = getTasksObject(taskListId);
    const tasks = await promise;
    setTaskState(formTaskState(tasks));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || result.source == result.destination) return;

    const taskStateCopy = { ...taskState };

    // remove element
    taskStateCopy.columns[result.source.droppableId].taskIds.splice(
      taskStateCopy.columns[result.source.droppableId].taskIds.indexOf(
        result.draggableId
      ),
      1
    );

    // array.splice(index, 0, ...elements);

    taskStateCopy.columns[result.destination.droppableId].taskIds.splice(
      result.destination.index,
      0,
      result.draggableId
    );

    setTaskState(taskStateCopy);

    const taskPromises = taskStateCopy.columns[
      result.destination.droppableId
    ].taskIds.map((taskId) => getTask(taskListId, taskId));

    const tasks = await Promise.all(taskPromises);

    console.log(tasks);

    await Promise.all(
      tasks.map((task, index) =>
        updateTask(taskListId, task.id, {
          ...task,
          status: result.destination.droppableId as TaskStatus,
          body: {
            content: index.toString(),
          },
        })
      )
    );

    fetchTasks();
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {taskState.columnOrder.map((columnId) => {
            const column = taskState.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => taskState.tasks[taskId]
            );

            return (
              <div className="flex flex-col p-4 border border-transparent hover:border-gray-700 focus-within:border-gray-700 rounded-lg transition-colors gap-4 pb-0">
                <h2 className="text-xl font-bold">{column.title}</h2>
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  taskListId={taskListId}
                  fetchTasks={fetchTasks}
                />
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
