import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

const useStyles = makeStyles({
  appBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.8)",
    marginBottom: "15px",
  },
  title: {
    color: "#000",
  },
});
// const drawerWidth = 0;
// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     boxShadow: "none",
//     borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
//     [theme.breakpoints.up("sm")]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   title: {
//     color: "#000",
//   },
// }));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          BOOK STORE
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
