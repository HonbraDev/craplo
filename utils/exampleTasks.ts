import { TodoTask } from "@microsoft/microsoft-graph-types";

const defaultTasks: Record<string, TodoTask> = {
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHlAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "notStarted",
      title: "1) somebody",
      createdDateTime: "2021-05-29T14:41:59.3148829Z",
      lastModifiedDateTime: "2021-05-29T14:54:11.0833201Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHlAAA=",
      body: { content: "", contentType: "text" },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHkAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "completed",
      title: "9.1) me",
      createdDateTime: "2021-05-29T13:16:43.8327429Z",
      lastModifiedDateTime: "2021-05-29T13:30:00.3110477Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHkAAA=",
      body: { content: "", contentType: "text" },
      completedDateTime: {
        dateTime: "2021-05-28T22:00:00.0000000",
        timeZone: "UTC",
      },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHjAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "completed",
      title: "9) roll",
      createdDateTime: "2021-05-29T13:16:41.493015Z",
      lastModifiedDateTime: "2021-05-29T13:26:42.5442851Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHjAAA=",
      body: { content: "", contentType: "text" },
      completedDateTime: {
        dateTime: "2021-05-28T22:00:00.0000000",
        timeZone: "UTC",
      },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHiAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "completed",
      title: "8) gonna",
      createdDateTime: "2021-05-29T13:16:38.6216209Z",
      lastModifiedDateTime: "2021-05-29T13:26:39.5036354Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHiAAA=",
      body: { content: "", contentType: "text" },
      completedDateTime: {
        dateTime: "2021-05-28T22:00:00.0000000",
        timeZone: "UTC",
      },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHhAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "completed",
      title: "7) is",
      createdDateTime: "2021-05-29T13:16:33.9013432Z",
      lastModifiedDateTime: "2021-05-29T13:26:34.3462773Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHhAAA=",
      body: { content: "", contentType: "text" },
      completedDateTime: {
        dateTime: "2021-05-28T22:00:00.0000000",
        timeZone: "UTC",
      },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHgAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "completed",
      title: "6) world",
      createdDateTime: "2021-05-29T13:16:32.0494727Z",
      lastModifiedDateTime: "2021-05-29T14:00:31.9348682Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHgAAA=",
      body: { content: "", contentType: "text" },
      completedDateTime: {
        dateTime: "2021-05-29T00:00:00.0000000",
        timeZone: "UTC",
      },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHfAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "notStarted",
      title: "5) the",
      createdDateTime: "2021-05-29T13:16:29.0237559Z",
      lastModifiedDateTime: "2021-05-29T14:54:12.250197Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHfAAA=",
      body: { content: "", contentType: "text" },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHeAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "notStarted",
      title: "4) me",
      createdDateTime: "2021-05-29T13:16:26.385338Z",
      lastModifiedDateTime: "2021-05-29T14:54:11.9793866Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHeAAA=",
      body: { content: "", contentType: "text" },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHdAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "notStarted",
      title: "3) told",
      createdDateTime: "2021-05-29T13:16:23.3665909Z",
      lastModifiedDateTime: "2021-05-29T14:54:11.606025Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHdAAA=",
      body: { content: "", contentType: "text" },
    },
  "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHcAAA=":
    {
      importance: "normal",
      isReminderOn: false,
      status: "notStarted",
      title: "2) once",
      createdDateTime: "2021-05-29T13:16:19.3651575Z",
      lastModifiedDateTime: "2021-05-29T14:54:11.3521391Z",
      id: "AAMkAGRhODczNTBkLTFiNWUtNGM2YS1hNDJlLWE5ODk1ODhiNmY0ZABGAAAAAAD9z9apY6J0RZj0A-5GB4aRBwCBbhJZjCcyQaLApYWXzHANAAGcebq5AACBbhJZjCcyQaLApYWXzHANAAGcemHcAAA=",
      body: { content: "", contentType: "text" },
    },
};

export default defaultTasks;
