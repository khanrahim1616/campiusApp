import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Button from "../Button/Button";
import "../../pages/Profile/profile.css";

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
    try {
      let data =
        role === "Student"
          ? { username: userName, experience: userExperience }
          : { username: userName };
      await update(ref(db, "Accounts/" + uid), data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  let disablConditions =
    (userExperience === experience && userName === username) ||
    userName.length < 5 ||
    userName.length > 20;

  return (
    <Modal open={open}>
      <Box sx={style}>
        <h3
          style={{
            display: "flex",
          }}
        >
          <MdOutlineKeyboardBackspace
            className="modalCloseIcon"
            onClick={close}
          />
          Edit Profile
        </h3>
        <form>
          <label htmlFor="userName">Username: </label>
          <input
            id="userName"
            className="selectOptions"
            type="text"
            onChange={(e) => setInput(e.target.value.trimStart())}
            value={userName}
          />
          <br />
          {role === "Student" && (
            <>
              <label htmlFor="experience">Experience:</label>
              <span>
                <select
                  id="experience"
                  className="selectOptions"
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
            </>
          )}
          <span style={{ display: "flex", justifyContent: "end" }}>
            <Button
              disabled={!!disablConditions}
              className={!!disablConditions ? "opacity1 " : "ButtonReuse"}
              onClick={updates}
              btnText={"update"}
            />
          </span>
        </form>
      </Box>
    </Modal>
  );
};

export default Modalprofile;
