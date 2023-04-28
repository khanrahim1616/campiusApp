import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/globalHelper";
import Button from "../../components/Button";

const BlockUser = () => {
  const dispatch = useDispatch();
  return (
    <div className="LoginSignUpForm">
      <h1>You are block, Kindly contact your admin (via slack)</h1>
      <Button
        onClick={() => SignedOut(dispatch)}
        className={"ButtonReuse"}
        btnText={"Sign out"}
      />
    </div>
  );
};

export default BlockUser;
