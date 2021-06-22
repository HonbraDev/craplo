import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Drawer } from "@material-ui/core";
import React, { FC, ReactChild, ReactChildren } from "react";
import { Button } from "@material-ui/core";

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

export interface BaseLayoutProps {
  branding: string;
  drawerContent: ReactChildren | ReactChild;
  children: ReactChildren | ReactChild;
  appBarChildren?: ReactChildren | ReactChild;
}

const BaseLayout: FC<BaseLayoutProps> = ({
  branding,
  drawerContent,
  children,
  appBarChildren,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} variant="outlined">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {branding}
          </Typography>
          {appBarChildren}
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
