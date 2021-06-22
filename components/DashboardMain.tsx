import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { TaskStatus, TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import formTaskState from "../utils/formTaskState";
import {
  getTaskLists,
  getTasksObject,
  updateTask,
} from "../utils/todoRequests";
import { TaskState } from "../utils/types";
import useInterval from "../utils/useInterval";
import BaseLayout from "./BaseLayout";
import Column from "./Column";

const DashboardMain = () => {
  const [taskState, setTaskState] = useState<TaskState>(formTaskState({}));
  const [listsArray, setListsArray] = useState<TodoTaskList[]>([]);
  const [selectedList, setSelectedList] = useState("");
  const [taskListsLoading, setTaskListsLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);

  const fetchTaskLists = async (loading?: boolean) => {
    if (loading) setTaskListsLoading(true);
    const newTaskListsArray = await getTaskLists();
    if (!selectedList) setSelectedList(newTaskListsArray[0].id);
    setListsArray(newTaskListsArray);
    if (loading) setTaskListsLoading(false);
  };

  const fetchTasks = async (loading?: boolean) => {
    if (listsArray.length === 0) return;

    if (loading) setTasksLoading(true);
    const newTasks = await getTasksObject(selectedList);
    setTaskState(formTaskState(newTasks));
    if (loading) setTasksLoading(false);
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
      updateTask(selectedList, task.id, task)
    );

    await Promise.all(updateTaskPromises);
  };

  useEffect(() => {
    fetchTaskLists(true);
  }, []);

  useEffect(() => {
    fetchTasks(true);
  }, [selectedList, listsArray]);

  useInterval(() => {
    fetchTaskLists();
  }, 15000);

  useInterval(() => {
    fetchTasks();
  }, 10000);

  return (
    <>
      <BaseLayout
        appBarChildren={<></>}
        branding="Honbrasoft Craplo"
        drawerContent={
          <List>
            {taskListsLoading ? (
              <CircularProgress className="mx-auto my-4 block" />
            ) : (
              listsArray.map((list, index) => (
                <ListItem
                  button
                  key={list.id}
                  selected={list.id === selectedList}
                  onClick={() => setSelectedList(list.id)}
                >
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText>{list.displayName}</ListItemText>
                </ListItem>
              ))
            )}
          </List>
        }
      >
        {tasksLoading ? (
          <CircularProgress className="m-4" />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 p-4 w-full overflow-x-auto">
              {taskState.columnOrder.map((columnId) => {
                const column = taskState.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => taskState.tasks[taskId]
                );

                return <Column key={columnId} tasks={tasks} column={column} />;
              })}
            </div>
          </DragDropContext>
        )}
      </BaseLayout>
    </>
  );
};

export default DashboardMain;
