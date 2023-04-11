import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navAccodingRole } from "./navAccodingRole";
import Menue from "./Menu";
import Avatar from "@mui/material/Avatar";
import logo from "../../Assets/logo.png";

const Navbar = () => {
  const role = useSelector((state) => state?.userData?.role);
  const accordingRole = useMemo(() => navAccodingRole(role), [role]);

  return (
    <div className="navDiv">
      <div className="firstNavDiv">
        <Avatar
          style={{ border: "1px solid grey" }}
          src={logo}
          sx={{ width: 56, height: 56 }}
        />
        {accordingRole.map((item, index) => (
          <Link
            key={index}
            className="Links linksHidden"
            style={{ padding: "16px 8px" }}
            to={item.route}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Menue accordingRole={accordingRole} />
    </div>
  );
};

export default Navbar;
