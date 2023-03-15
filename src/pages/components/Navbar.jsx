import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import { Link } from "react-router-dom";
import { navAccodingRole } from "./navAccodingRole";
import { BiLeftArrowAlt } from "react-icons/bi";

const Navbar = () => {
  const role = useSelector((state) => state?.userData?.role);
  const dispatch = useDispatch();
  const accordingRole = useMemo(() => navAccodingRole(role), [role]);

  return (
    <div className="navDiv">
      <div>
        {accordingRole.map((item, index) => (
          <Link style={{ padding: "16px 8px" }} key={index} to={item.route}>
            {item.name}
          </Link>
        ))}
      </div>
      <div>
        <Link style={{ padding: "10px 5px" }} to="/Profile">
          Profile
        </Link>
        <button onClick={() => SignedOut(dispatch)}>
          Logout
          <BiLeftArrowAlt />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
