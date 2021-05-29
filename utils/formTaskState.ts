import { TodoTask } from "@microsoft/microsoft-graph-types";
import taskSorter from "./taskSorter";

const formTaskState = (tasks: Record<string, TodoTask>) => {
  const values = Object.values(tasks);
  return {
    tasks,
    columns: {
      notStarted: {
        id: "notStarted",
        title: "Not started",
        taskIds: values
          .sort(taskSorter)
          .filter((task) => task.status === "notStarted")
          .map((task) => task.id),
      },
      inProgress: {
        id: "inProgress",
        title: "In progress",
        taskIds: values
          .sort(taskSorter)
          .filter((task) => task.status === "inProgress")
          .map((task) => task.id),
      },
      completed: {
        id: "completed",
        title: "Completed",
        taskIds: values
          .sort(taskSorter)
          .filter((task) => task.status === "completed")
          .map((task) => task.id),
      },
    },
    columnOrder: ["notStarted", "inProgress", "completed"],
  };
};

export default formTaskState;
