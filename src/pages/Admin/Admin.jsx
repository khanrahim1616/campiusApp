import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import AllAccounts from "./AllAccounts";

export const Admin = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <button onClick={() => SignedOut(dispatch)}>Signout</button>
        Admin
      </div>
      <div>
        <AllAccounts />
      </div>
    </>
  );
};
