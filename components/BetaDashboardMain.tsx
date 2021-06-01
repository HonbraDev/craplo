import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import exampleTasks from "../utils/exampleTasks";
import formTaskState from "../utils/formTaskState";
import { TaskState } from "../utils/types";
import BaseLayout from "./BaseLayout";
import Column from "./Column";

const BetaDashboardMain = () => {
  const [state, setState] = useState<TaskState>(formTaskState(exampleTasks));
  const [lists, setLists] = useState([
    "Default list",
    "List one",
    "List two",
    "List three",
  ]);
  return (
    <>
      <BaseLayout
        branding="Craplo"
        drawerContent={
          <List>
            {lists.map((list) => (
              <ListItem button key={list} selected={list === lists[0]}>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText>{list}</ListItemText>
              </ListItem>
            ))}
          </List>
        }
      >
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
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

              return <Column key={columnId} tasks={tasks} column={column} />;
            })}
          </div>
        </DragDropContext>
      </BaseLayout>
    </>
  );
};

export default BetaDashboardMain;
