import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageUpload from "../../components/imageUpload";
import Navbar from "../../components/Navbar";
import Modalprofile from "../../components/EditProfileModal";
import Button from "../../components/Button";
import { Box } from "@mui/material";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { GrEdit } from "react-icons/gr";
import Input from "../../components/Input";
import "./profile.css";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState(false);
  const { email, role, username, experience } = state?.userData;
  const close = () => setOpen(false);

  return (
    <div>
      <Navbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "aliceblue",
          padding: "24px",
          borderRadius: "10px",
          flexDirection: "column",
          height: ["90vh", "80vh", "80vh", "80vh"],
        }}
      >
        <Box>
          <ImageUpload />
        </Box>
        <Box component={"div"} className="profieData">
          <p>
            <label>Username:</label> <br />
            <Input className="profileInputs" value={username} disabled />
          </p>
          <p>
            <label>Role:</label> <br />
            <Input className="profileInputs" value={role} disabled />
          </p>
          {role === "Student" && (
            <p>
              <label>Experience:</label> <br />
              <Input className="profileInputs" value={experience} disabled />
            </p>
          )}
          <p>
            <label>Email:</label> <br />
            <Input className="profileInputs" value={email} disabled />
          </p>
          <Button
            style={{ width: "110px !important", padding: "8px !important" }}
            className="ButtonReuse"
            onClick={() => setOpen(true)}
            btnText={
              <span>
                <GrEdit /> Edit profile
              </span>
            }
          />
        </Box>
      </Box>
      {open && <Modalprofile close={close} open={open} setAlert={setAlert} />}
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
