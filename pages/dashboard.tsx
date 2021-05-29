import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import AuthenticatedDashboard from "../components/AuthenticatedDashboard";

const Dashboard = () => {
  return <>
    <AuthenticatedTemplate>
      <AuthenticatedDashboard />
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>go sign in or something</UnauthenticatedTemplate>
  </>;
};

export default Dashboard;
