import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/globalHelper";
import Button from "../../components/Button";
import Input from "../../components/Input";

const BlockUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData);
  return (
    <div className="LoginSignUpForm">
      <div className="formDiv">
        <h1 className="unauthorisedUersHaeding">
          <i>You are block, Kindly contact your admin (via slack)</i>
        </h1>
        <Input
          type="text"
          value={user.email}
          className="Input disableInput"
          disabled
        />
        <div className="buttonDiv">
          <Button
            onClick={() => SignedOut(dispatch)}
            className={"ButtonReuse button"}
            btnText={"Sign out"}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
