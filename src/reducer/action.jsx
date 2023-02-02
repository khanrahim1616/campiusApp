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
