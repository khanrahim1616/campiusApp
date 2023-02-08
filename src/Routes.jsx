import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Student from "./pages/Student/Student";
import Company from "./pages/Company/Company";
import CompanyJobPost from "./pages/Company/CompanyJobPost";
import CompanyPostedJob from "./pages/Company/CompanyPostedJob";
import AppliedJobs from "./pages/Student/AppliedJobs";
import CompanyProfile from "./pages/Company/companyProfile";
import StudentProfile from "./pages/Student/StudentProfile";

const RoutesFile = () => {
  const state = useSelector((state) => state);

  if (state?.loader) {
    return <>Loading</>;
  }
  return (
    <>
      <BrowserRouter>
        {state?.userData?.role === "Student" ? (
          <Routes>
            <Route path="/Student" element={<Student />} />
            <Route path="*" element={<Student />} />
            <Route path="/AppliedJobs" element={<AppliedJobs />} />
            <Route path="/Profile" element={<StudentProfile />} />
          </Routes>
        ) : state?.userData?.role === "Company" ? (
          <Routes>
            <Route path="/" element={<Company />} />
            <Route path="*" element={<Company />} />
            <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
            <Route path="/CompanyPostedJob" element={<CompanyPostedJob />} />
            <Route path="/Profile" element={<CompanyProfile />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="*" element={<LogIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};
export default RoutesFile;
