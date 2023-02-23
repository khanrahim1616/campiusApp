import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageUpload from "../components/imageUpload";
import Modalprofile from "./ProfileModal";

const StudentProfile = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const { email, role, username, experience } = state?.userData;

  const close = () => setOpen(false);

  return (
    <div>
      <h1>Profile</h1>
      <div className=" profilediv">
        <div>
          <ImageUpload />
          <p>Name: {username}</p>
          <p>Categoery: {role}</p>
          <p>Experience:{experience} </p>
          <p>Email: {email}</p>
          <button onClick={() => setOpen(true)}>Edit profile</button>
        </div>
      </div>
      {open && (
        <div>
          <Modalprofile close={close} open={open} />
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
