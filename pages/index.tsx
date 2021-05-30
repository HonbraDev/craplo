import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loginRequest } from "../utils/authConfig";

const Dashboard = () => {
  const { instance } = useMsal();
  const router = useRouter();

  useEffect(() => {
    if (instance.getActiveAccount()) router.replace("/dashboard");
  }, [instance.getActiveAccount()]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <header className="col-span-2">
          <h1 className="text-3xl font-bold flex gap-4 items-center">
            Honbrasoft Craplo
          </h1>
        </header>
        <section className="p-4 bg-gray-700 shadow rounded-lg flex gap-4 flex-col w-1/2">
          <button
            className="cursor-pointer border-b border-transparent hover:border-white transition-color w-max"
            onClick={() => instance.loginPopup(loginRequest).catch((e) => {})}
          >
            Sign in with Microsoft
          </button>
        </section>
        ( this page is work-in-progress )
      </div>
    </>
  );
};

export default Dashboard;
