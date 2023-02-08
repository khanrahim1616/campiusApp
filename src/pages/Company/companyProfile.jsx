import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modalprofile from "./ProfileModal";

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const { email, role, username } = state?.userData;

  const close = () => setOpen(false);

  return (
    <div>
      <h1>Profile</h1>
      <div className=" profilediv">
        <div>
          <p>Image</p>
          <p>Name: {username}</p>
          <p>Categoery: {role}</p>
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

export default CompanyProfile;
