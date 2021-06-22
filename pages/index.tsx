import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import DashboardMain from "../components/DashboardMain";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@material-ui/core";
import { loginRequest } from "../utils/authConfig";

const Dashboard = () => {
  const { instance } = useMsal();
  return (
    <>
      <AuthenticatedTemplate>
        <DashboardMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="absolute inset-0 flex justify-center items-center">
          <Card className="mx-auto my-8">
            <CardContent>
              <Typography variant="h4">Honbrasoft Craplo</Typography>
            </CardContent>
            <CardActions className="justify-center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => instance.loginPopup(loginRequest)}
              >
                Sign in with Microsoft
              </Button>
            </CardActions>
            <Link href="https://github.com/honbradev/craplo">
              <Typography
                className="text-center"
                variant="subtitle2"
                gutterBottom
              >
                GitHub
              </Typography>
            </Link>
          </Card>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};

export default Dashboard;
