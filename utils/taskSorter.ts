import { TodoTask } from "@microsoft/microsoft-graph-types";

const taskSorter = (a: TodoTask, b: TodoTask) => {
  const nameA = parseInt(a.body.content);
  const nameB = parseInt(b.body.content);

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

export default taskSorter;
