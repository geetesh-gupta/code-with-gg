import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  withStyles,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import codelist from "./code_list.json";

const StyledListItemIcon = withStyles({
  root: {
    minWidth: "32px",
  },
})(ListItemIcon);

const StyledListItem = withStyles({
  root: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})(ListItem);

const StyledCollapse = withStyles({
  root: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})(Collapse);

const StyledList = withStyles({
  root: {
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})(List);

const useStyles = makeStyles((theme) => ({
  sidebar: {
    padding: "16px",
    paddingLeft: 0,
  },
}));

const LIST_ITEM_PADDING_LEFT = 16;

export const CodeListFolder = ({ children, folderName, depth }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  return (
    <StyledList component="nav" aria-labelledby="nested-list-subheader">
      <StyledListItem
        button
        onClick={() =>
          isCollapseOpen ? setIsCollapseOpen(false) : setIsCollapseOpen(true)
        }
        style={{ paddingLeft: `${LIST_ITEM_PADDING_LEFT * depth}px` }}
      >
        <StyledListItemIcon>
          <FolderIcon />
        </StyledListItemIcon>
        <ListItemText primary={folderName} />
        {isCollapseOpen ? <ExpandLess /> : <ExpandMore />}
      </StyledListItem>
      <StyledCollapse in={isCollapseOpen} timeout="auto" unmountOnExit>
        {children}
      </StyledCollapse>
    </StyledList>
  );
};

export const CodeListFile = ({ filepath, filename, setCurrentOpen, depth }) => {
  return (
    <StyledList component="div" disablePadding>
      <StyledListItem
        button
        onClick={() => setCurrentOpen(filepath)}
        style={{ paddingLeft: `${LIST_ITEM_PADDING_LEFT * depth}px` }}
      >
        <StyledListItemIcon>
          <InsertDriveFileIcon />
        </StyledListItemIcon>
        <ListItemText primary={filename} />
      </StyledListItem>
    </StyledList>
  );
};

export const getCodeList = (jsonObj, setCurrentOpen, depth) => {
  return jsonObj.map((obj) => {
    if (obj.type === "folder") {
      return (
        <CodeListFolder folderName={obj.name} key={obj.path} depth={depth + 1}>
          {getCodeList(obj.children, setCurrentOpen, depth + 1)}
        </CodeListFolder>
      );
    } else {
      return (
        <CodeListFile
          filename={obj.name}
          filepath={obj.path}
          setCurrentOpen={setCurrentOpen}
          key={obj.path}
          depth={depth + 1}
        />
      );
    }
  });
};

const CodeList = ({ setCurrentOpen }) => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      {getCodeList(codelist.children, setCurrentOpen, 0)}
    </div>
  );
};

export default CodeList;
