import React, { useState } from "react";
import Markdown from "./Markdown";
import { makeStyles } from "@material-ui/core/styles";
import CodeList from "./CodeList";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      paddingTop: "32px",
    },
  },
  sidebar: {
    [theme.breakpoints.down("md")]: {
      flex: 1,
    },
    [theme.breakpoints.down("lg")]: {
      flex: 2,
    },
    [theme.breakpoints.up("lg")]: {
      flex: 1,
    },
  },
  code: {
    [theme.breakpoints.down("md")]: {
      flex: 1,
    },
    [theme.breakpoints.down("lg")]: {
      flex: 6,
    },
    [theme.breakpoints.up("lg")]: {
      flex: 5,
    },
    scroll: "overflow",
    [theme.breakpoints.down("md")]: {
      paddingTop: "16px",
    },
  },
  appBar: {
    marginBotton: "16px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [filename, setFilename] = useState("");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const baseurl =
    "https://raw.githubusercontent.com/geetesh-gupta/code-with-gg/master/";
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Hidden only={["md", "lg", "xl"]}>
        <>
          <AppBar position="sticky" color="inherit" className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                onClick={() => setIsDrawerOpen(true)}
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Code With GG
              </Typography>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor={"top"}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onOpen={() => setIsDrawerOpen(true)}
          >
            <CodeList setCurrentOpen={setFilename} />
          </SwipeableDrawer>
        </>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <div className={classes.sidebar}>
          <CodeList setCurrentOpen={setFilename} />
        </div>
      </Hidden>
      <Container className={classes.code}>
        <Card style={{ padding: "16px" }}>
          {filename !== "" ? (
            <Markdown file={proxyurl + baseurl + filename} />
          ) : (
            "Use the sidebar to open a code"
          )}
        </Card>
      </Container>
    </div>
  );
}

export default App;
