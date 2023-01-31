import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";
import { Link } from "react-router-dom";

const Company = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const signedOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: GET_FIREBASE_DATA,
          payload: false,
        });
      })
      .catch((error) => {});
  };

  return (
    <div>
      <Link to="/CompanyJobPost">JobPost</Link>
      <br />
      <Link to="/CompanyPostedJob">CompanyPostedJob</Link>
      <p>{state?.userData?.role}</p>
      <button onClick={signedOut}>Logout</button>
    </div>
  );
};

export default Company;
