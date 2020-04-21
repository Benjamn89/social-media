import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const useStyles = {
  textField: {
    "& > *::after": {
      borderBottom: "solid 2px #c7ecee",
    },
    "& > *": {
      marginBottom: "20px",
      width: "40ch",
    },
  },
};

const inputText = (props) => {
  const { classes } = props;
  return (
    <TextField
      autoComplete="off"
      className={classes.textField}
      id="standard-basic"
      label={props.title}
    />
  );
};

export default withStyles(useStyles)(inputText);
