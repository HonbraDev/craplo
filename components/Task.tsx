import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";
import { TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dragged: {
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
    },
  })
);

const Task: FC<{
  task: TodoTask;
  index: number;
  listId: string;
}> = ({ task, index, listId }) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`w-full flex gap-2 items-center px-3 py-2 bg-white hover:z-10 relative ${
            snapshot.isDragging ? classes.dragged : ""
          }`}
        >
          <span>{task.title}</span>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
