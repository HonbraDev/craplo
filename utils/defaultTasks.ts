import { TaskState } from "./types";

const defaultTasks: TaskState = {
  tasks: {},
  columns: {
    notStarted: {
      id: "notStarted",
      title: "Not started",
      taskIds: [],
    },
    inProgress: { id: "inProgress", title: "In progress", taskIds: [] },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["notStarted", "inProgress", "completed"],
};

export default defaultTasks;
