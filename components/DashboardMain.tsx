import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import formTaskState from "../utils/formTaskState";
import { getTaskLists, getTasksObject } from "../utils/todoRequests";
import { TaskState } from "../utils/types";
import BaseLayout from "./BaseLayout";
import Column from "./Column";

const DashboardMain = () => {
  const [state, setState] = useState<TaskState>(formTaskState({}));
  const [lists, setLists] = useState<TodoTaskList[]>([]);
  const [selectedList, setSelectedList] = useState(0);
  const [taskListsLoading, setTaskListsLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    setTaskListsLoading(true);
    getTaskLists().then((newTaskLists) => {
      setTaskListsLoading(false);
      setLists(newTaskLists);
    });
  }, []);

  useEffect(() => {
    if (lists.length !== 0) {
      setTasksLoading(true);
      getTasksObject(lists[selectedList].id).then((tasks) => {
        setState(formTaskState(tasks));
        setTasksLoading(false);
      });
    }
  }, [selectedList, lists]);

  return (
    <>
      <BaseLayout
        appBarChildren={
          <>
            <Button
              onClick={async () => {
                const lists = await getTaskLists();
                setLists(lists);
              }}
            >
              Fetch tasklists
            </Button>
          </>
        }
        branding="Craplo"
        drawerContent={
          <List>
            {taskListsLoading ? (
              <CircularProgress className="mx-auto my-4 block" />
            ) : (
              lists.map((list, index) => (
                <ListItem
                  button
                  key={list.id}
                  selected={index === selectedList}
                  onClick={() => setSelectedList(index)}
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
          <DragDropContext
            onDragEnd={(result, provided) => {
              if (!result.destination) return;
              if (
                result.source.droppableId === result.destination.droppableId &&
                result.source.index === result.destination.index
              )
                return;

              const stateCopy = { ...state };

              stateCopy.columns[result.source.droppableId].taskIds.splice(
                stateCopy.columns[result.source.droppableId].taskIds.indexOf(
                  result.draggableId
                ),
                1
              );

              stateCopy.columns[result.destination.droppableId].taskIds.splice(
                result.destination.index,
                0,
                result.draggableId
              );

              setState(stateCopy);

              provided.announce("test");
            }}
          >
            <div className="flex gap-4 p-4 w-full overflow-x-auto">
              {state.columnOrder.map((columnId) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
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
