import * as React from "react";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/globalHelper";
import Avatar from "@mui/material/Avatar";
import profilePic from "../../Assets/profile.png";
import { navAccodingRole } from "../../GlobalData/navAccodingRole";
import "./menu.css";
const Menue = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData);
  const role = useSelector((state) => state?.userData?.role);
  const accordingRole = useMemo(() => navAccodingRole(role), [role]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    SignedOut(dispatch);
    handleClose();
  };

  return (
    <div className="menu">
      <Avatar
        style={{ border: "1px solid grey" }}
        src={user?.profilePicture || profilePic}
        sx={{ width: 56, height: 56 }}
      />
      <Button
        sx={{
          lineHeight: "1.2",
          color: "darkblue",
          textTransform: "inherit",
          width: "100%",
        }}
        id="basic-Button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span>
          <h4 className="role">{user?.role}</h4>
        </span>
        <KeyboardArrowDownIcon style={{ marginLeft: "5px" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-Button",
        }}
      >
        <span className="smallScreenMenu">
          {accordingRole?.map((val, index) => (
            <MenuItem
              key={index}
              sx={{ width: "100px", justifyContent: "center" }}
            >
              <Link className="menuLinks" to={val.route}>
                {val.name}
              </Link>
            </MenuItem>
          ))}
        </span>
        <MenuItem
          onClick={logOut}
          sx={{
            width: "100px",
            justifyContent: "center",
          }}
        >
          <Link className="menuLinks">Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Menue;
