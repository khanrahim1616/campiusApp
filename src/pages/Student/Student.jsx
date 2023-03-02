import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import { Link } from "react-router-dom";
import Jobs from "./Jobs";

const Student = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Link to={"/profile"}>Profile</Link>
        <button onClick={() => SignedOut(dispatch)}>Logout</button>
      </div>
      <Jobs />
    </div>
  );
};

export default Student;
