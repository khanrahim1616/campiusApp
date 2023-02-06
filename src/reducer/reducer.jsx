import * as types from "./types";

const initialState = {
  userData: false,
  loader: true,
  jobData: [],
  appliedJobs: [],
  appliedStudentData: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
