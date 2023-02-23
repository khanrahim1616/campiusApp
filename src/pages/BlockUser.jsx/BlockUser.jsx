import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/Helper";

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
      <h3>You are blocked Kindly conact your admin (Via slack)</h3>
      <button onClick={() => SignedOut(dispatch)}>SignOut</button>
    </div>
  );
};

export default BlockUser;
