import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/globalHelper";
import Button from "../../components/Button";

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
      <Button onClick={() => SignedOut(dispatch)} btnText={"SignOut"} />
    </div>
  );
};

export default UnVerifiedUser;
