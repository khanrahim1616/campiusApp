export const navAccodingRole = (role) => {
  return role === "Company"
    ? companyNav
    : role === "Student"
    ? studentNav
    : AdminNav;
};

const companyNav = [
  {
    route: "/home",
    name: "Home",
  },
  {
    route: "/Job-post",
    name: "Job-Post",
  },
  {
    route: "/profile",
    name: "Profile",
  },
];

const studentNav = [
  {
    route: "/home",
    name: "Home",
  },
  {
    route: "/profile",
    name: "Profile",
  },
];

const AdminNav = [
  {
    route: "/home",
    name: "Home",
  },
  {
    route: "/profile",
    name: "Profile",
  },
];
