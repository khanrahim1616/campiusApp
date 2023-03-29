import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageUpload from "../components/imageUpload";
import Navbar from "../components/Navbar";
import Modalprofile from "./ProfileModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const { email, role, username, experience } = state?.userData;

  const close = () => setOpen(false);

  return (
    <div>
      <Navbar />
      <div className=" profilediv">
        <div>
          <ImageUpload />
        </div>
        <div className="profielSecondDiv">
          <p>Name: {username}</p>
          <p>Categoery: {role}</p>
          <p>Email: {email}</p>
          {role === "Student" && <p>Experience: {experience}</p>}
          <button className="postJobBtn" onClick={() => setOpen(true)}>Edit profile</button>
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

export default Profile;
