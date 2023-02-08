import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";

const Modalprofile = ({ close, open }) => {
  const state = useSelector((state) => state);
  const { username, uid } = state?.userData;
  const [input, setInput] = useState(username);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const updates = async () => {
    await update(ref(db, "Accounts/" + uid), {
      username: input,
    });
    close();
  };

  return (
    <Modal
      open={open}
      close={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button onClick={close}>close</Button>
        <br />
        <label htmlFor="userName">Username: </label>
        <input
          id="userName"
          type="text"
          maxLength={20}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button type="submit" onClick={updates}>update</Button>
      </Box>
    </Modal>
  );
};

export default Modalprofile;
