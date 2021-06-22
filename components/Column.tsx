import {
  Card,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { TodoTask } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../utils/types";
import Task from "./Task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2),
      paddingBottom: 0,
    },

    addTask: {
      width: `calc(100% - ${theme.spacing(2) * 2})`,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  })
);

export interface ColumnProps {
  column: ColumnType;
  tasks: TodoTask[];
}

const Column: FC<ColumnProps> = ({ column, tasks }) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <Card className="rounded-lg w-64 " style={{ height: "max-content" }}>
          <div className={classes.header}>
            <Typography variant="h6">{column.title}</Typography>
          </div>
          <TextField className={classes.addTask} placeholder="Add task" />
          <div
            className="pb-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                listId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        </Card>
      )}
    </Droppable>
  );
};

export default Column;
