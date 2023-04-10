import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import ReUseButton from "../components/ReUseButton";

const UnVerifiedUser = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h3>Kindly contact your admin (Via slack) to approve your Account</h3>
      <ReUseButton onClick={() => SignedOut(dispatch)} btnText={"SignOut"} />
    </div>
  );
};

export default UnVerifiedUser;
