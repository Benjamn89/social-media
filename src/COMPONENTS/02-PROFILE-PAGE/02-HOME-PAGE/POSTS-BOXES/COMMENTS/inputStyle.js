import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {},
  input: {
    width: "80%",
    margin: "20px 0",
  },
}));

export default function Hook() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        className={classes.input}
        id="outlined-basic"
        label="Leave Comment"
        variant="outlined"
        multiline
      />
    </form>
  );
}
