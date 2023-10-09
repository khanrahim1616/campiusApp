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
  let dba;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dba = onValue(ref(db, "Accounts/" + user.uid), (snapshot) => {
          const data = snapshot.val();
          dispatch(triger.getuserData(data));
        });
      } else {
        dba && dba();
        dispatch(triger.getuserData(false));
      }
    });
  }, []);

  useEffect(() => {
    if (state?.userData?.role === "admin") {
      onValue(ref(db, "Accounts/"), (snapshot) => {
        const newData = snapshot.val();
        if (newData) {
          const data = Object.values(newData).filter((e) => e.role !== "admin");
          dispatch(triger.getAllStudentData(data));
        } else {
          dispatch(triger.getAllStudentData([]));
        }
      });
    } else if (state?.userData?.role === "Company") {
      // get posted jobs data

      onValue(ref(db, "Jobs/" + state?.userData?.uid), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData = Object.entries(data).map((item) => ({
            id: item[0],
            ...item[1],
          }));
          dispatch(triger.getJobData(newData));

          // 1st line # only get object in item.appliedJobsAppear
          // 2nd line # get studentData full object
          // 3rd line # get uid of students
          // 4th line # get username email of student
          // 5th line # remove duplicate satudent id

          const forGetingStudentData = newData
            .filter((item) => item?.appliedJobs)
            .map((item1) => item1.appliedJobs)
            .flat(2)
            .filter((currelem, ind, arr) => arr.indexOf(currelem) === ind);
          let initial = true;
          Promise.all(
            forGetingStudentData.map((studentId) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + studentId), (snapshot) => {
                  const data1 = snapshot.val();
                  console.log(data1, "data1");
                  if (!initial)
                    dispatch(triger.getParticularAppliedStudent(data1));
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            initial = false;
            dispatch(triger.getAppliedStudentData(res));
          });
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

          //  For showing company posted jobs and filtered according student experience
          // in 2nd line of filter if we applied on that job that job will not appear

          let accordingExperience = data1?.filter(
            (item) =>
              item.experience === state?.userData.experience &&
              !item?.appliedJobs?.some((item) => item === state?.userData?.uid)
          );

          // getting name of each company
          let initial = true;
          Promise.all(
            accordingExperience.map((item) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + item.companyId), (snapshot) => {
                  const data = snapshot.val();
                  let data1 = {
                    ...item,
                    username: data?.username,
                    isBlocked: data?.isBlocked,
                  };
                  if (!initial) {
                    dispatch(triger.getCompanyDataRealTime(data1));
                  }
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            initial = false;
            res = res.filter((val) => !val.isBlocked);
            dispatch(triger.getJobData(res));
          });

          //  student applied jobs

          let appliedJobs = data1?.filter((item) =>
            item?.appliedJobs?.some((item) => item === state?.userData?.uid)
          );

          // getting name of each company

          Promise.all(
            appliedJobs.map((item) => {
              return new Promise((resolve) => {
                onValue(ref(db, "Accounts/" + item.companyId), (snapshot) => {
                  const data = snapshot.val();
                  let data1 = {
                    ...item,
                    username: data?.username,
                    isBlocked: data?.isBlocked,
                  };
                  return resolve(data1);
                });
              });
            })
          ).then((res) => {
            res = res.filter((val) => !val.isBlocked);
            dispatch(triger.getAappliedJobs(res));
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

// trying for realtime

// let temp = [];
// appliedJobs.map((item) => {
//   console.log("myon value");
//   onValue(ref(db, "Accounts/" + item.companyId), (snapshot) => {
//     const data = snapshot.val();
//     let data1 = {
//       ...item,
//       username: data?.username,
//       isBlocked: data?.isBlocked,
//     };
//     temp.push(data1);
//     let temp1 = temp
//       .filter((val) => !!val.isBlocked)
//       .filter((v, i, a) => {
//         return a.findIndex((v2) => v2.id === v.id) === i;
//       });
//     ("first", temp1);
//     dispatch(triger.getAappliedJobs(data1));
//   });
// });
