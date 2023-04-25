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
    name: "JobPost",
  },
];

const studentNav = [
  {
    route: "/home",
    name: "Home",
  },
];

const AdminNav = [
  {
    route: "/home",
    name: "Home",
  },
];
