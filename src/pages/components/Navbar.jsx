import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = useSelector((state) => state?.userData?.role);
  const dispatch = useDispatch();

  return (
    <div className="navDiv">
      <div>
        {role === "Company" ? (
          <>
            <Link to="/">Company </Link>
            <Link to="/CompanyJobPost">JobPost </Link>
          </>
        ) : role === "Student" ? (
          <>
            <Link to="/Student">Student </Link>
          </>
        ) : (
          <>
            <Link to="/Admin">Admin </Link>
          </>
        )}
      </div>
      <div>
        <Link to="/Profile">Profile</Link>
        <button onClick={() => SignedOut(dispatch)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
