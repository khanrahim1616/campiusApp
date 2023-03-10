export const navAccodingRole = (role) => {
  return role === "Company"
    ? companyNav
    : role === "Student"
    ? studentNav
    : AdminNav;
};

const companyNav = [
  {
    route: "/Company",
    name: "Company",
  },
  {
    route: "/CompanyJobPost",
    name: "JobPost",
  },
];

const studentNav = [
  {
    route: "/Student",
    name: "Student",
  },
];
const AdminNav = [
  {
    route: "/Admin",
    name: "Admin",
  },
];
