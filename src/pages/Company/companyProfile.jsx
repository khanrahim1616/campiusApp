import React, { useState } from "react";
import Modalprofile from "./Modalprofile";
import { useSelector } from "react-redux";

const CompanyProfile = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUsernme] = useState("");
  const [uuid, setUuid] = useState("");
  const state = useSelector((state) => state);
  const { email, role, username, uid } = state?.userData;

  const edit =async (username, uid) => {
    await setUsernme(username);
    await setUuid(uid);
    await setOpen(true);
  };

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

          <button onClick={() => edit(username, uid)}>Edit profile</button>
        </div>
      </div>
      {open && (
        <div>
          <Modalprofile
            userName={userName}
            close={close}
            open={open}
            uid={uuid}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
