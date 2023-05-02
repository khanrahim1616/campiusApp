import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageUpload from "../../components/imageUpload";
import Navbar from "../../components/Navbar";
import Modalprofile from "../../components/EditProfileModal";
import Button from "../../components/Button";
import "./profile.css";
import { Box } from "@mui/material";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState(false);
  const { email, role, username, experience } = state?.userData;
  const close = () => setOpen(false);

  return (
    <div>
      <Navbar />
      <div className="profilediv">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "lightblue",
            padding: "24px",
            borderRadius: "10px",
            flexDirection: ["column", "row", "row", "row"],
          }}
        >
          <div>
            <ImageUpload />
          </div>
          <div className="profielSecondDiv">
            <p>
              Name: <br /> {username}
            </p>
            <p>
              Role: <br /> {role}
            </p>
            <p>
              Email: <br /> {email}
            </p>
            {role === "Student" && (
              <p>
                Experience: <br /> {experience}
              </p>
            )}
            <Button
              className="ButtonReuse"
              onClick={() => setOpen(true)}
              btnText={"Edit profile"}
            />
          </div>
        </Box>
      </div>
      {open && (
        <div>
          <Modalprofile close={close} open={open} setAlert={setAlert} />
        </div>
      )}
      {!!alert?.isSuccess && (
        <SuccessAlert
          message={"Profile updated successfully"}
          open={!!alert?.isSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
      {!!alert?.isNotSuccess && (
        <ErrorAlert
          message={"Something went wrong"}
          open={!!alert?.isNotSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
