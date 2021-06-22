import { ListAlt } from "@material-ui/icons";
import { TaskStatus, TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import formTaskState from "../utils/formTaskState";
import { TaskState } from "../utils/types";
import useInterval from "../utils/useInterval";
import BaseLayout from "./BaseLayout";
import Column from "./Column";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import {
  getTaskLists,
  getTasksObject,
  updateTask,
} from "../utils/todoRequests";

const DashboardMain = () => {
  const [taskState, setTaskState] = useState<TaskState>(formTaskState({}));
  const [tasksLoading, setTasksLoading] = useState(true);
  const [taskLists, setTaskLists] = useState<TodoTaskList[]>([]);
  const [taskListsLoading, setTaskListsLoading] = useState(true);
  const [selectedTaskList, setSelectedTaskList] = useState("");

  // fetch user's tasklists
  const fetchTaskLists = async (showLoadingIndicator?: boolean) => {
    // enable loading indicator
    if (showLoadingIndicator) setTaskListsLoading(true);

    // fetch tasklists
    const newTaskLists = await getTaskLists();

    // if there isn't a tasklist selected, select the first one
    if (!selectedTaskList) setSelectedTaskList(newTaskLists[0].id);

    // update the state
    setTaskLists(newTaskLists);

    // disable loading indicator
    if (showLoadingIndicator) setTaskListsLoading(false);
  };

  // fetch tasks from the selected tasklist
  const fetchTasks = async (showLoadingIndicator?: boolean) => {
    // if there aren't any tasklists or there isn't a tasklist selected, return
    if (taskLists.length === 0) return;

    // enable loading indicator
    if (showLoadingIndicator) setTasksLoading(true);

    // fetch tasks from selected tasklist
    const newTasks = await getTasksObject(selectedTaskList);

    // parse fetched tasks and update state
    setTaskState(formTaskState(newTasks));

    // disable loading indicator
    if (showLoadingIndicator) setTasksLoading(false);
  };

  // rearrange and update dragged task
  const onDragEnd = async (result: DropResult) => {
    // if we don't need to update, return
    if (
      !result.destination ||
      (result.source.droppableId === result.destination.droppableId &&
        result.source.index === result.destination.index)
    )
      return;

    // copy the current state
    const taskStateCopy = { ...taskState };

    // remove the task from the source
    taskStateCopy.columns[result.source.droppableId].taskIds.splice(
      taskStateCopy.columns[result.source.droppableId].taskIds.indexOf(
        result.draggableId
      ),
      1
    );

    // add the task to the destination
    taskStateCopy.columns[result.destination.droppableId].taskIds.splice(
      result.destination.index,
      0,
      result.draggableId
    );

    // optimistic ui
    setTaskState(taskStateCopy);

    // get all tasks in the destination list
    const tasks = taskStateCopy.columns[
      result.destination.droppableId
    ].taskIds.map((taskId) => taskState.tasks[taskId]);

    // generate updated tasks
    const updatedTasks = tasks.map((task, index) => ({
      ...task,
      status: result.destination.droppableId as TaskStatus,
      body: {
        content: index.toString(),
      },
    }));

    // filter only those which we really need to update
    const filteredTasks = updatedTasks.filter((task, index) => {
      return (
        tasks[index].body.content !== task.body.content ||
        tasks[index].status !== task.status
      );
    });

    // create promises to update the tasks
    const updateTaskPromises = filteredTasks.map((task) =>
      updateTask(selectedTaskList, task.id, task)
    );

    // await the promises
    await Promise.all(updateTaskPromises);
  };

  // initially fetch the tasklists
  useEffect(() => {
    fetchTaskLists(true);
  }, []);

  // fetch the tasks everytime the selected tasklist updates
  useEffect(() => {
    fetchTasks(true);
  }, [selectedTaskList]);

  // fetch tasklists every 15 seconds
  useInterval(() => {
    fetchTaskLists();
  }, 15000);

  // fetch tasks from selected tasklist every 10 seconds
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
              taskLists.map((list) => (
                <ListItem
                  button
                  key={list.id}
                  selected={list.id === selectedTaskList}
                  onClick={() => setSelectedTaskList(list.id)}
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
