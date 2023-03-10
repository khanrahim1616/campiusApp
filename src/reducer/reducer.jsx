import * as types from "./types";

const initialState = {
  userData: false,
  loader: true,
  jobData: [],
  appliedJobs: [],
  appliedStudentData: [],
  allAccounts: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_OUT:
      return {
        state: initialState,
      };

    case types.GET_FIREBASE_DATA:
      return {
        ...state,
        userData: action.payload,
        loader: false,
      };

    case types.GET_JOB_DATA:
      return {
        ...state,
        jobData: action.payload,
      };

    case types.GET_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: action.payload,
      };

    case types.GET_APPLIED_STUDENT_DATA:
      return {
        ...state,
        appliedStudentData: action.payload,
      };

    case types.GET_ALL_ACCOUNTS_DATA:
      return {
        ...state,
        allAccounts: action.payload,
      };

    default:
      return state;
  }
};
