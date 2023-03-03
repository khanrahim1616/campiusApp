import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// LogIn SignUp screens
import SignUp from "./pages/Signup/SignUp";
import LogIn from "./pages/LogIn/LogIn";
// profile for all users0\=['/]
import Profile from "./pages/Profile/Profile";
// Company Routes
import Company from "./pages/Company/Company";
import CompanyJobPost from "./pages/Company/jobPost";
// Student Routes
import Student from "./pages/Student/Student";
// Admin Routes
import { Admin } from "./pages/Admin/Admin";
// Loader
import { Spin } from "antd";
// BlockUser
import BlockUser from "./pages/BlockUser.jsx/BlockUser";
// unVerifiedUsers
import UnVerifiedUser from "./pages/unVerifiedUser/unVerifiedUser";

const RoutesFile = () => {
  const state = useSelector((state) => state);
  const isVerified = state?.userData?.isVerified;
  const userBLock = state?.userData?.isBlocked;
  const admin = state?.userData?.role === "admin";
  const student =
    state?.userData?.role === "Student" && isVerified && !userBLock;
  const comapny =
    state?.userData?.role === "Company" && isVerified && !userBLock;
  if (state?.loader) {
    return (
      <>
        <div className="content">
          <Spin tip="Loading" size="large" />
        </div>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        {student ? (
          <Routes>
            <Route path="/Student" element={<Student />} />
            <Route path="*" element={<Student />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        ) : comapny ? (
          <Routes>
            <Route path="/" element={<Company />} />
            <Route path="*" element={<Company />} />
            <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        ) : admin ? (
          <Routes>
            <Route path="/Admin" element={<Admin />} />
            <Route path="*" element={<Admin />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        ) : !!state?.userData?.uid && !isVerified ? (
          <Routes>
            <Route path="*" element={<UnVerifiedUser />} />
          </Routes>
        ) : userBLock ? (
          <Routes>
            <Route path="*" element={<BlockUser />} />
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
