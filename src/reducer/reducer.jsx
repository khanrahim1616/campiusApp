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

    // ye neeche wale se related hai realtime chalane ke liye

    case types.GET_JOB_DATA:
      return {
        ...state,
        jobData: action.payload,
      };

    // for company data realtime

    // its wrong now i will work on it
    case types.GET_COMPANY_DATA_REALTIME:
      return {
        ...state,
        jobD11111ata: action.payload,
      };

    case types.GET_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: action.payload,
      };

    // ye neeche wale se related hai realtime chalane ke liye

    case types.GET_APPLIED_STUDENT_DATA:
      return {
        ...state,
        appliedStudentData: action.payload,
      };

    // for student data realtime

    case types.GET_PARTICULAR_APPLIED_STUDENT:
      let temp = [...state?.appliedStudentData];
      let currentIndex = temp.findIndex(
        (item) => item?.uid === action?.payload?.uid
      );
      temp[currentIndex] = action?.payload;
      return {
        ...state,
        appliedStudentData: temp,
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
