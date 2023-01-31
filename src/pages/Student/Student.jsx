import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";

const Student = () => {
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
      <p>{state?.userData?.role}</p>
      <button onClick={signedOut}>Logout</button>
    </div>
  );
};

export default Student;
