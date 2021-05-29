import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { instance } = useMsal();
  const router = useRouter();

  useEffect(() => {
    if (instance.getActiveAccount()) router.replace("/dashboard");
  }, [instance.getActiveAccount()]);

  return (
    <>
      <h1>onlyPublic</h1>
      <button onClick={() => instance.loginPopup()}>Sign in</button>
    </>
  );
};

export default Dashboard;
