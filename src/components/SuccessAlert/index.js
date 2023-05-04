import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const SuccessAlert = ({ message, open, onClose }) => {
  return (
    <Snackbar
      className="snackBar"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert
        style={{ marginTop: 70 }}
        onClose={onClose}
        severity="success"
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
