import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import BetaDashboardMain from "../components/BetaDashboardMain";

const Dashboard = () => {
  return (
    <>
      <AuthenticatedTemplate>
        <BetaDashboardMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        go sign in or something lol
      </UnauthenticatedTemplate>
    </>
  );
};

export default Dashboard;
