import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import Button from "../../components/Button/Button";

const BlockUser = () => {
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
      <h3>You are blocked Kindly contact your admin (Via slack)</h3>
      <Button onClick={() => SignedOut(dispatch)} btnText={"SignOut"} />
    </div>
  );
};

export default BlockUser;
