import React, { useState } from "react";
import Markdown from "./Markdown";
import { makeStyles } from "@material-ui/core/styles";
import CodeList from "./CodeList";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
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
  },
}));

function App() {
  const classes = useStyles();
  const [filename, setFilename] = useState("");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const baseurl =
    "https://raw.githubusercontent.com/geetesh-gupta/code-with-gg/master/";

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <CodeList setCurrentOpen={setFilename} />
      </div>
      <Container className={classes.code}>
        {filename !== "" && <Markdown file={proxyurl + baseurl + filename} />}
      </Container>
    </div>
  );
}

export default App;
