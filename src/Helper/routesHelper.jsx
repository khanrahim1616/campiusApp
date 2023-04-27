// * all routes *
// LogIn SignUp screens
import SignUp from "../pages/Signup";
import LogIn from "../pages/LogIn";
// profile
import Profile from "../pages/Profile";
// Company
import Company from "../pages/Company";
import CompanyJobPost from "../pages/Company/jobPost";
// Student
import Student from "../pages/Student";
// Admin
import { Admin } from "../pages/Admin";
// BlockUser
import BlockUser from "../pages/BlockUser";
// unVerifiedUsers
import UnVerifiedUser from "../pages/unVerifiedUser";

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
        path: "/unVerifiedUser",
        element: UnVerifiedUser,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/unVerifiedUser",
      },
    ];
  }
  if (userBLock) {
    return [
      {
        path: "/blockUser",
        element: BlockUser,
      },
      {
        path: "*",
        isNavigate: true,
        navigatePath: "/blockUser",
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
