import React, { useState } from "react";
import Markdown from "./Markdown";
import { makeStyles } from "@material-ui/core/styles";
import CodeList from "./CodeList";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  code: {
    scroll: "overflow",
    paddingTop: "16px",
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

  const theme = useTheme();
  const isWindowMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="inherit">
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
        anchor={isWindowMobile ? "top" : "left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <CodeList
          setCurrentOpen={(filename) => {
            setIsDrawerOpen(false);
            setFilename(filename);
          }}
        />
      </SwipeableDrawer>
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
