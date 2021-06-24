import { createStyles, makeStyles, Theme, IconButton } from "@material-ui/core";
import { TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dragged: {
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export interface TaskProps {
  task: TodoTask;
  index: number;
  removeTask: (taskId: string) => Promise<void>;
}

const Task: FC<TaskProps> = ({ task, index, removeTask }) => {
  const classes = useStyles();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group w-full flex justify-between gap-2 items-center px-3 py-2 bg-white hover:z-10 relative ${
            snapshot.isDragging ? classes.dragged : ""
          }`}
        >
          <span>{task.title}</span>
          <IconButton
            onClick={() => removeTask(task.id)}
            size="small"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Close />
          </IconButton>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
