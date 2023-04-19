import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ErrorAlert = ({ message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
