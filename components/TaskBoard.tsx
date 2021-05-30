import { FC, useEffect, useState } from "react";
import Column from "../components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { deleteTask, getTasksObject, updateTask } from "../utils/todoRequests";
import { TaskState } from "../utils/types";
import formTaskState from "../utils/formTaskState";
import defaultTasks from "../utils/defaultTasks";
import { TaskStatus } from "@microsoft/microsoft-graph-types";
import toast from "react-hot-toast";
import useInterval from "../utils/useInterval";

const TaskBoard: FC<{ taskListId: string }> = ({ taskListId }) => {
  const [taskState, setTaskState] = useState<TaskState>(defaultTasks);

  const fetchTasks = async (src?: string) => {
    try {
      const promise = getTasksObject(taskListId);
      const tasks = await promise;
      setTaskState(formTaskState(tasks));
    } catch (e) {
      console.error(e);
      toast.error(`Failed to fetch tasks.`);
    }
  };

  useEffect(() => {
    fetchTasks("useEffect");
  }, [taskListId]);

  useInterval(() => fetchTasks("interval"), 10000);

  const deleteTaskOptimistic = async (id: string) => {
    const promise = deleteTask(taskListId, id);

    toast.promise(promise, {
      loading: "Deleting task",
      success: "Deleted task",
      error: "Error while deleting task",
    });

    const taskStateCopy = { ...taskState };

    const columnId = taskStateCopy.tasks[id].status;

    delete taskStateCopy.tasks[id];

    taskStateCopy.columns[columnId].taskIds.splice(
      taskStateCopy.columns[columnId].taskIds.indexOf(id),
      1
    );

    setTaskState(taskStateCopy);

    await promise;
  };

  const onDragEnd = async (result: DropResult) => {
    if (
      !result.destination ||
      (result.source.droppableId === result.destination.droppableId &&
        result.source.index === result.destination.index)
    )
      return;

    const taskStateCopy = { ...taskState };

    taskStateCopy.columns[result.source.droppableId].taskIds.splice(
      taskStateCopy.columns[result.source.droppableId].taskIds.indexOf(
        result.draggableId
      ),
      1
    );

    taskStateCopy.columns[result.destination.droppableId].taskIds.splice(
      result.destination.index,
      0,
      result.draggableId
    );

    setTaskState(taskStateCopy);

    const tasks = taskStateCopy.columns[
      result.destination.droppableId
    ].taskIds.map((taskId) => taskState.tasks[taskId]);

    const updatedTasks = tasks.map((task, index) => ({
      ...task,
      status: result.destination.droppableId as TaskStatus,
      body: {
        content: index.toString(),
      },
    }));

    const filteredTasks = updatedTasks.filter((task, index) => {
      return (
        tasks[index].body.content !== task.body.content ||
        tasks[index].status !== task.status
      );
    });

    const updateTaskPromises = filteredTasks.map((task, index) =>
      updateTask(taskListId, task.id, task)
    );

    await Promise.all(updateTaskPromises);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {taskState.columnOrder.map((columnId) => {
            const column = taskState.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => taskState.tasks[taskId]
            );

            return (
              <div
                key={column.id}
                className="flex flex-col gap-4 pb-0 w-60 p-4 bg-white text-black rounded-lg"
                style={{
                  height: "calc(min-content + 5rem)",
                }}
              >
                <h2 className="text-xl font-bold">{column.title}</h2>
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  deleteTask={deleteTaskOptimistic}
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
