import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Button from "../Button";
import "../../pages/Profile/profile.css";
import Input from "../Input";

const Modalprofile = ({ close, open, setAlert }) => {
  const state = useSelector((state) => state);
  const { username, uid, role, experience } = state?.userData;
  const [userName, setInput] = useState(username);
  const [userExperience, setExperience] = useState(experience);
  const [error, setError] = useState(false);

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
    await update(ref(db, "Accounts/" + uid), data)
      .then(() => {
        close();
        setAlert({ isSuccess: true });
      })
      .catch(() => {
        setAlert({ isNotSuccess: true });
      });
  };

  const isError = (e) => {
    if (e?.target?.value?.length < 4 && e?.target?.value?.length > 0) {
      setError("Username must contain 4 characters");
    } else if (e?.target?.value === "") {
      setError("!Required");
    } else {
      setError(false);
    }
  };

  let disable =
    (userExperience === experience && userName === username) || !!error;

  return (
    <>
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
            <Input
              style={{ marginBottom: "8px" }}
              id="userName"
              maxLength={14}
              className="selectOptions"
              type="text"
              onChange={(e) => {
                setInput(e?.target?.value?.trim() || "");
                isError(e);
              }}
              value={userName}
            />
            {error && <span className="errors">{error}</span>}
            {role === "Student" && (
              <>
                <label htmlFor="experience">Experience:</label>
                <span>
                  <select
                    id="experience"
                    className="selectOptions"
                    value={userExperience}
                    onChange={(e) => setExperience(e?.target?.value)}
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
                disabled={!!disable}
                className={!!disable ? "opacity1 " : "ButtonReuse"}
                onClick={updates}
                btnText={"Update"}
              />
            </span>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Modalprofile;
