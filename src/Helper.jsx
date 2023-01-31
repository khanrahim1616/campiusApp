import react, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { db } from "./Firebaseconfig";
import { useSelector } from "react-redux";

const Helper = () => {
  const state = useSelector((state) => state);
  const auth = getAuth();
  
  useEffect(() => {

    });
  }, []);

  return <div>Helper</div>;
};

export default Helper;
