import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import Tabss from "./Tabs";

export const Admin = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <button onClick={() => SignedOut(dispatch)}>Signout</button>
        Admin
      </div>
      <Tabss />
    </>
  );
};
