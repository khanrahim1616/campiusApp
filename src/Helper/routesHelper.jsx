// LogIn SignUp screens
import SignUp from "../pages/Signup/SignUp";
import LogIn from "../pages/LogIn/LogIn";
// profile for all users
import Profile from "../pages/Profile/Profile";
// Company Routes
import Company from "../pages/Company/Company";
import CompanyJobPost from "../pages/Company/jobPost";
// Student Routes
import Student from "../pages/Student/Student";
// Admin Routes
import { Admin } from "../pages/Admin/Admin";
// BlockUser
import BlockUser from "../pages/BlockUser.jsx/BlockUser";
// unVerifiedUsers
import UnVerifiedUser from "../pages/unVerifiedUser/unVerifiedUser";

export const routes = (state) => {
  const isVerified = state?.userData?.isVerified;
  const unVerifiedUsers = !!state?.userData?.uid && !isVerified;
  const userBLock = state?.userData?.isBlocked;
  const admin = state?.userData?.role === "admin";
  const student =
    state?.userData?.role === "Student" && isVerified && !userBLock;
  const comapny =
    state?.userData?.role === "Company" && isVerified && !userBLock;

  if (student) {
    return [
      {
        path: "/home",
        element: Student,
      },
      {
        path: "/profile",
        element: Profile,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/home",
      },
    ];
  }
  if (comapny) {
    return [
      {
        path: "/home",
        element: Company,
      },
      {
        path: "/Job-post",
        element: CompanyJobPost,
      },
      {
        path: "/profile",
        element: Profile,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/home",
      },
    ];
  }
  if (admin) {
    return [
      {
        path: "/home",
        element: Admin,
      },
      {
        path: "/profile",
        element: Profile,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/home",
      },
    ];
  }
  if (unVerifiedUsers) {
    return [
      {
        path: "*",
        element: UnVerifiedUser,
      },
    ];
  }
  if (userBLock) {
    return [
      {
        path: "*",
        element: BlockUser,
      },
    ];
  } else {
    return [
      {
        path: "/logIn",
        element: LogIn,
      },
      {
        path: "/signUp",
        element: SignUp,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/LogIn",
      },
    ];
  }
};
