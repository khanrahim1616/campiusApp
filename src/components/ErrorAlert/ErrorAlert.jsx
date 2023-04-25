import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ErrorAlert = ({ message, open, onClose }) => {
  return (
    <Snackbar
      className="snackBar"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
