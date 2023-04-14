export const navAccodingRole = (role) => {
  return role === "Company"
    ? companyNav
    : role === "Student"
    ? studentNav
    : AdminNav;
};

const companyNav = [
  {
    route: "/Home",
    name: "Home",
  },
  {
    route: "/Job-Post",
    name: "JobPost",
  },
];

const studentNav = [
  {
    route: "/Home",
    name: "Home",
  },
];

const AdminNav = [
  {
    route: "/Home",
    name: "Home",
  },
];
