import "./App.css";
import RoutesFile from "./Routes";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "./Firebaseconfig";
import * as triger from "./reducer/action";

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, "Accounts/" + user.uid), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          dispatch(triger.getuserData(data));
        });
      } else {
        dispatch(triger.getuserData(false));
      }
    });
  }, []);

  useEffect(() => {
    if (state?.userData?.role === "Company") {
      onValue(ref(db, "Jobs/" + state?.userData?.uid), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData = Object.entries(data).map((item) => ({
            id: item[0],
            ...item[1],
          }));
          dispatch(triger.getJobData(newData));
        } else {
          dispatch(triger.getJobData([]));
        }
      });
    } else if (state?.userData?.role === "Student") {
      onValue(ref(db, "Jobs/"), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // getting job Data of Each company

          const data1 = Object.entries(data).flatMap((item) =>
            Object.entries(item[1]).map((item1) => ({
              id: item1[0],
              ...item1[1],
              companyId: item[0],
            }))
          );

          //  filtered according student experience

          let accordingExperience = data1?.filter(
            (item) =>
              item.experience === state?.userData.experience &&
              !item?.appliedJobs?.includes(state?.userData?.uid)
          );

          //  student applied jobs

          let appliedJobs = data1?.filter(
            (item) =>
              item.experience === state?.userData.experience &&
              item?.appliedJobs?.includes(state?.userData?.uid)
          );
          dispatch(triger.getJobData(accordingExperience));
          dispatch(triger.getAappliedJobs(appliedJobs));
        } else {
          dispatch(triger.getJobData([]));
          dispatch(triger.getAappliedJobs([]));
        }
      });
    }
  }, [state?.userData?.uid]);
  return <RoutesFile />;
};
export default App;
