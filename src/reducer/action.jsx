import * as types from "./types";

export const getuserData = (payload) => {
  return {
    type: types.GET_FIREBASE_DATA,
    payload,
  };
};

export const getJobData = (payload) => {
  return {
    type: types.GET_JOB_DATA,
    payload,
  };
};

export const getAappliedJobs = (payload) => {
  return {
    type: types.GET_APPLIED_JOBS,
    payload,
  };
};

// student applied on jobs

export const getAppliedStudentData = (payload) => {
  return {
    type: types.GET_APPLIED_STUDENT_DATA,
    payload,
  };
};
