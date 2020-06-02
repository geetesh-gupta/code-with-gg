import React, { useEffect, useState } from 'react';
import './App.css';
import Markdown from "./Markdown";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'row'
        },
    },
    sidebar: {
        [theme.breakpoints.down('md')]: {
            flex: 1,
        },
        [theme.breakpoints.down('lg')]: {
            flex: 2,
        },
        [theme.breakpoints.up('lg')]: {
            flex: 1,
        },
    },
    code: {
        [theme.breakpoints.down('md')]: {
            flex: 1,
        },
        [theme.breakpoints.down('lg')]: {
            flex: 6,
        },
        [theme.breakpoints.up('lg')]: {
            flex: 5,
        },
        scroll: 'overflow'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function App() {
    const classes = useStyles();
    const [filename, setFilename] = useState('');
    const [nested, setNested] = useState('');
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const baseurl = "https://raw.githubusercontent.com/geetesh-gupta/code-with-gg/master/codes/";

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItem button
                        onClick={() => (nested === 'dp') ? setNested('') : setNested('dp')}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="DP" />
                        {nested === 'dp' ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={nested === 'dp'} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button
                                onClick={() => setFilename('dp/LCS.md')}
                                className={classes.nested}>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText primary="LCS" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className={classes.code}>
                {filename !== '' && <Markdown file={proxyurl + baseurl + filename} />}
            </div>
        </div>
    );
}

export default App;
