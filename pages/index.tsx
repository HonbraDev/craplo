import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import DashboardMain from "../components/DashboardMain";

const Dashboard = () => {
  return (
    <>
      <AuthenticatedTemplate>
        <DashboardMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        go sign in or something lol
      </UnauthenticatedTemplate>
    </>
  );
};

export default Dashboard;
