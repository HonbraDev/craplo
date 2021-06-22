import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import DashboardMain from "../components/DashboardMain";
import { Button, Card, CardActions } from "@material-ui/core";
import { loginRequest } from "../utils/authConfig";

const Dashboard = () => {
  const { instance } = useMsal();
  return (
    <>
      <AuthenticatedTemplate>
        <DashboardMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Card className="mx-auto my-8">
          <CardActions>
            <Button onClick={() => instance.loginPopup(loginRequest)}>
              Sign in with Microsoft
            </Button>
          </CardActions>
        </Card>
      </UnauthenticatedTemplate>
    </>
  );
};

export default Dashboard;
