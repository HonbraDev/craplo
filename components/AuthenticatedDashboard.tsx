import { useMsal } from "@azure/msal-react";
import { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle } from "react-feather";
import { getTaskLists } from "../utils/todoRequests";
import TaskBoard from "./TaskBoard";

const AuthenticatedDashboard = () => {
  const [taskLists, setTaskLists] = useState<TodoTaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TodoTaskList>();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  console.log(currentTaskList?.id);

  const fetchTaskLists = async () => {
    setTaskLists(await getTaskLists());
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  return (
    <>
      <div className="flex  flex-col h-full w-full absolute top-0 left-0">
        <header className="w-full p-4 bg-gray-700">
          <h1 className="text-2xl font-bold">Honbrasoft Craplo</h1>
        </header>
        <div className="h-full w-full flex">
          <aside className="h-full w-64 p-4 flex flex-col gap-2 pt-2 bg-gray-700">
            {taskLists.map((taskList) => (
              <button
                className={`px-4 py-2 text-left rounded-lg hover:bg-gray-600 transition-colors flex gap-2 items-center border-2 border-transparent focus:outline-none ${
                  currentTaskList === taskList
                    ? "bg-gray-600  border-gray-500"
                    : ""
                }`}
                key={taskList.id}
                onClick={() => setCurrentTaskList(taskList)}
              >
                <CheckCircle height="16" width="16" className="" />
                {taskList.displayName}
              </button>
            ))}
          </aside>
          <main className="w-full h-full bg-gray-800 p-4 overflow-auto">
            {currentTaskList ? (
              <TaskBoard taskListId={currentTaskList.id} />
            ) : (
              "content goes here"
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedDashboard;
