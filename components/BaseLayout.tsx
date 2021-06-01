import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Drawer } from "@material-ui/core";
import { FC, ReactChild, ReactChildren } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
    },
  })
);

export interface LayoutProps {
  branding: string;
  drawerContent: ReactChildren | ReactChild;
  children: ReactChildren | ReactChild;
}

const BaseLayout: FC<LayoutProps> = ({ branding, drawerContent, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} variant="outlined">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {branding}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{drawerContent}</div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
