import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navAccodingRole } from "./navAccodingRole";
import Menue from "./Menu";

const Navbar = () => {
  const role = useSelector((state) => state?.userData?.role);
  const accordingRole = useMemo(() => navAccodingRole(role), [role]);

  return (
    <div className="navDiv">
      <div className="firstNavDiv">
        {accordingRole.map((item, index) => (
          
            <Link
            key={index}
              className="Links"
              style={{ padding: "16px 8px" }}
              
              to={item.route}
            >
              {item.name}
            </Link>
          
        ))}
      </div>
      <Menue />
    </div>
  );
};

export default Navbar;
