import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthenticatedDashboard from "../components/AuthenticatedDashboard";

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <AuthenticatedTemplate>
        <AuthenticatedDashboard />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {() => {
          router.replace("/");
          return "Redirecting...";
        }}
      </UnauthenticatedTemplate>
    </>
  );
};

export default Dashboard;
