import client from "./msGraphClient";
import { TodoTask, TodoTaskList } from "@microsoft/microsoft-graph-types";
import { PageIterator } from "@microsoft/microsoft-graph-client";

export const getTaskLists = async () =>
  (await client.api("/me/todo/lists").get()).value as TodoTaskList[];

export const getTasks = async (input: string | TodoTaskList) => {
  const tasks: TodoTask[] = [];
  let id: string;

  if (typeof input === "string") id = input;
  if (typeof input === "object") id = input.id;

  const response = await client
    .api(`/me/todo/lists/${id}/tasks?$top=999`)
    .get();

  const iterator = new PageIterator(client, response, (data) =>
    Boolean(tasks.push(data))
  );

  await iterator.iterate();

  return tasks;
};

export const getTasksObject = async (input: string | TodoTaskList) => {
  const tasks: Record<string, TodoTask> = {};
  let id: string;

  if (typeof input === "string") id = input;
  if (typeof input === "object") id = input.id;

  const response = await client
    .api(`/me/todo/lists/${id}/tasks?$top=999`)
    .get();

  const iterator = new PageIterator(client, response, (data) =>
    Boolean((tasks[data.id] = data))
  );

  await iterator.iterate();

  return tasks;
};

export const updateTask = async (listId: string, id: string, task: TodoTask) =>
  (await client
    .api(`/me/todo/lists/${listId}/tasks/${id}`)
    .patch(task)) as TodoTask;

export const getTask = async (listId: string, id: string) =>
  (await client.api(`/me/todo/lists/${listId}/tasks/${id}`).get()) as TodoTask;

export const createTask = async (listId: string, task: TodoTask) =>
  (await client.api(`/me/todo/lists/${listId}/tasks/`).post(task)) as TodoTask;

export const deleteTask = async (listId: string, id: string) =>
  await client.api(`/me/todo/lists/${listId}/tasks/${id}`).delete();
