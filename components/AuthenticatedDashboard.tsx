import { useMsal } from "@azure/msal-react";
import { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { getTaskLists } from "../utils/todoRequests";
import TaskBoard from "./TaskBoard";

const AuthenticatedDashboard = () => {
  const [taskLists, setTaskLists] = useState<TodoTaskList[]>([]);
  const [currentTaskList, setCurrentTaskList] = useState<TodoTaskList>();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const fetchTaskLists = async () => {
    setTaskLists(await getTaskLists());
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        <header className="col-span-2">
          <h1 className="text-3xl font-bold flex gap-4 items-center">
            {currentTaskList ? (
              <>
                <ArrowLeft
                  onClick={() => setCurrentTaskList(undefined)}
                  className="cursor-pointer"
                />
                {currentTaskList.displayName}
              </>
            ) : (
              "Honbrasoft Craplo"
            )}
          </h1>
        </header>
        {currentTaskList ? (
          <TaskBoard taskListId={currentTaskList.id} />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <section className="p-4 bg-gray-700 shadow rounded-lg flex gap-4 flex-col">
              <h2 className="text-2xl font-bold">Your To-Do lists</h2>
              <ul className="flex flex-col gap-2">
                {taskLists.map((taskList) => (
                  <li key={taskList.id}>
                    <a
                      className="cursor-pointer border-b border-transparent hover:border-white transition-color"
                      onClick={() => {
                        console.log(taskList.id);
                        setCurrentTaskList(taskList);
                      }}
                    >
                      {taskList.displayName}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section className="p-4 bg-gray-700 shadow rounded-lg flex gap-4 flex-col">
              <h2 className="text-2xl font-bold">Your account</h2>
              <h3 className="text-xl font-semibold">{activeAccount.name}</h3>
              <a
                className="cursor-pointer border-b border-transparent hover:border-white transition-color w-max"
                onClick={() => instance.logout()}
              >
                Sign out
              </a>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthenticatedDashboard;
