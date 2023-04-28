import React from "react";
import { useDispatch } from "react-redux";
import { SignedOut } from "../../Helper/globalHelper";
import Button from "../../components/Button";

const UnVerifiedUser = () => {
  const dispatch = useDispatch();
  return (
    <div className="LoginSignUpForm">
      <h1 style={{ textAlign: "center" }}>
        Kindly contact your admin to approve your account (via slack)
      </h1>
      <Button
        onClick={() => SignedOut(dispatch)}
        className={"ButtonReuse"}
        btnText={"Sign out"}
      />
    </div>
  );
};

export default UnVerifiedUser;
