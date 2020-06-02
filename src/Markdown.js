import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { renderToString } from "react-dom/server";
import Highlight from "react-highlight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const Markdown = ({ file }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(file)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setData(text);
      });
  }, [file]);

  if (data === "") {
    return (
      <Fade
        in={true}
        style={{
          transitionDelay: data !== "" ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <div>
          <CircularProgress color="inherit" size={20} thickness={6} />{" "}
          Loading...
        </div>
      </Fade>
    );
  }

  return (
    <Highlight innerHTML={true}>
      {renderToString(
        <ReactMarkdown
          source={data}
          className="code-markdown"
          sourcePos
          includeNodeIndex
          linkTarget="_blank"
        />
      )}
    </Highlight>
  );
};

export default Markdown;
