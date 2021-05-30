import { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import toast from "react-hot-toast";
import { getTaskLists } from "../utils/todoRequests";
import useInterval from "../utils/useInterval";
import TaskBoard from "./TaskBoard";

const AuthenticatedDashboard = () => {
  const [taskLists, setTaskLists] = useState<TodoTaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTaskList, setCurrentTaskList] = useState<TodoTaskList>(null);

  const fetchTaskLists = async () => {
    try {
      const fetchedTaskLists = await getTaskLists();
      setTaskLists(fetchedTaskLists);
      setLoading(false);
      if (!currentTaskList) setCurrentTaskList(fetchedTaskLists[0]);
    } catch (e) {
      console.error(e)
      toast.error(`Failed to fetch taskLists.`);
    }
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  useInterval(fetchTaskLists, 15000);

  return (
    <>
      <div className="flex h-full w-full absolute top-0 left-0">
        <aside className="h-full w-64 p-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Craplo</h1>
          {taskLists.map((taskList) => (
            <button
              className={`px-4 py-2 text-left rounded-lg hover:bg-gray-600 transition-colors flex gap-2 items-center border-2 border-transparent focus:outline-none ${
                currentTaskList?.id === taskList.id
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
          {loading ? "Loading..." : null}
        </aside>
        <main className="w-full h-full bg-gray-800 p-4 overflow-auto rounded-tl-2xl">
          {currentTaskList ? (
            <TaskBoard taskListId={currentTaskList.id} />
          ) : (
            "content goes here"
          )}
        </main>
      </div>
    </>
  );
};

export default AuthenticatedDashboard;
