import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// LogIn SignUp screens
import SignUp from "./pages/Signup/SignUp";
import LogIn from "./pages/LogIn/LogIn";
// Company Routes
import Company from "./pages/Company/Company";
import CompanyJobPost from "./pages/Company/CompanyJobPost";
import CompanyPostedJob from "./pages/Company/CompanyPostedJob";
import CompanyProfile from "./pages/Company/companyProfile";
// Student Routes
import Student from "./pages/Student/Student";
import AppliedJobs from "./pages/Student/AppliedJobs";
import StudentProfile from "./pages/Student/StudentProfile";
// Admin Routes
import { Admin } from "./pages/Admin/Admin";
// Loader
import { Spin } from "antd";
import BlockUser from "./pages/BlockUser.jsx/BlockUser";

const RoutesFile = () => {
  const state = useSelector((state) => state);
  const userBLock = state?.userData?.isBlocked;
  const student = state?.userData?.role === "Student" && !userBLock;
  const comapny = state?.userData?.role === "Company" && !userBLock;
  const admin = state?.userData?.role === "admin";
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
            <Route path="/AppliedJobs" element={<AppliedJobs />} />
            <Route path="/Profile" element={<StudentProfile />} />=
          </Routes>
        ) : comapny ? (
          <Routes>
            <Route path="/" element={<Company />} />
            <Route path="*" element={<Company />} />
            <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
            <Route path="/CompanyPostedJob" element={<CompanyPostedJob />} />
            <Route path="/Profile" element={<CompanyProfile />} />
          </Routes>
        ) : admin ? (
          <Routes>
            <Route path="/Admin" element={<Admin />} />
            <Route path="*" element={<Admin />} />
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

// const userRoutes = [
//   { path: "/LogIn", component: LogIn },
//   { path: "/SignUp", component: SignUp },
//   { path: "/Admin", component: Admin, conditions: [isAdmin] },
//   { path: "/Student", component: Student, conditions: [isStudent] },
//   { path: "/AppliedJobs", component: AppliedJobs, conditions: [isStudent] },
//   {
//     path: "/Profile",
//     component: isStudent ? StudentProfile : CompanyProfile,
//     conditions: [isStudent, isCompany],
//   },
//   { path: "/", component: Company, conditions: [isCompany] },
//   {
//     path: "/CompanyJobPost",
//     component: CompanyJobPost,
//     conditions: [isCompany],
//   },
//   {
//     path: "/CompanyPostedJob",
//     component: CompanyPostedJob,
//     conditions: [isCompany],
//   },
// ];

// const getUserRoutes = () => {
//   return userRoutes.reduce((routes, { path, component, conditions }) => {
//     if (!conditions || conditions.some((condition) => condition())) {
//       routes.push(<Route key={path} path={path} element={<component />} />);
//     }
//     return routes;
//   }, []);
// };

// <BrowserRouter>
//   <Routes>
//     {getUserRoutes()}
//     <Route path="*" element={<Navigate to="/LogIn" />} />
//   </Routes>
// </BrowserRouter>;
