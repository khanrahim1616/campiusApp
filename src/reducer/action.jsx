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

// company data realtime
export const getCompanyDataRealTime = (payload) => {
  return {
    type: types.GET_COMPANY_DATA_REALTIME,
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
// for real time data update for applied users

export const getParticularAppliedStudent = (payload) => {
  return {
    type: types.GET_PARTICULAR_APPLIED_STUDENT,
    payload,
  };
};

// All Users Data for admin

export const getAllStudentData = (payload) => {
  return {
    type: types.GET_ALL_ACCOUNTS_DATA,
    payload,
  };
};

// sign out
export const logOut = () => {
  return {
    type: types.SIGN_OUT,
  };
};
