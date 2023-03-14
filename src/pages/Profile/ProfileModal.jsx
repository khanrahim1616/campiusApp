import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";

const Modalprofile = ({ close, open }) => {
  const state = useSelector((state) => state);
  const { username, uid, role, experience } = state?.userData;
  const [userName, setInput] = useState(username);
  const [userExperience, setExperience] = useState(experience);

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
    let data =
      role === "Student"
        ? { username: userName, experience: userExperience }
        : { username: userName };
    await update(ref(db, "Accounts/" + uid), data);
    close();
  };

  let disablConditions =
    (userExperience === experience && userName === username) || !userName;

  return (
    <Modal
      open={open}
      close={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={updates}>
          <button onClick={close}>X</button>
          <br />
          <br />
          <label htmlFor="userName">Username: </label>
          <input
            id="userName"
            type="text"
            maxLength={20}
            onChange={(e) => setInput(e.target.value)}
            value={userName}
          />
          <br />
          {role === "Student" && (
            <span>
              <select
                value={userExperience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Experience
                </option>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </span>
          )}
          <br />
          <button disabled={!!disablConditions} type="submit">
            update
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default Modalprofile;
