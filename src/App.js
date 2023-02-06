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
          dispatch(triger.getuserData(data));
        });
      } else {
        dispatch(triger.getuserData(false));
      }
    });
  }, []);

  useEffect(() => {
    if (state?.userData?.role === "Company") {
      // get posted jobs data

      onValue(ref(db, "Jobs/" + state?.userData?.uid), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData = Object.entries(data).map((item) => ({
            id: item[0],
            ...item[1],
          }));
          dispatch(triger.getJobData(newData));

          const studentApppliedJobs = newData.filter(
            (item) => item?.appliedJobs
          );
          dispatch(triger.getAappliedJobs(studentApppliedJobs));

          // 1st line # student applied on these jobs
          // 2nd line # get uid of students
          // 3rd line # get username email of student
          // 4th line # remove duplicate satudent id

          const appliedJobs = studentApppliedJobs
            .map((item1) => item1.appliedJobs)
            .flat(2)
            .filter((currelem, ind, arr) => arr.indexOf(currelem) == ind);

          Promise.all(
            appliedJobs.map((studentId) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + studentId), (snapshot) => {
                  const data1 = snapshot.val();
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            dispatch(triger.getAppliedStudentData(res));
          });
        } else {
          dispatch(triger.getJobData([]));
          dispatch(triger.getAappliedJobs([]));
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

          Promise.all(
            accordingExperience.map((item) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + item.companyId), (snapshot) => {
                  const data = snapshot.val();
                  let data1 = { ...item, username: data?.username };
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            dispatch(triger.getJobData(res));
          });

          //  student applied jobs

          let appliedJobs = data1?.filter(
            (item) =>
              item.experience === state?.userData.experience &&
              item?.appliedJobs?.includes(state?.userData?.uid)
          );

          Promise.all(
            appliedJobs.map((item) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + item.companyId), (snapshot) => {
                  const data = snapshot.val();
                  let data1 = { ...item, username: data?.username };
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            dispatch(triger.getAappliedJobs(res));
            console.log(res);
          });
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
