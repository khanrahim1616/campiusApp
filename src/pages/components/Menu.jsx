import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import Avatar from "@mui/material/Avatar";
import profilePic from "../../Assets/profile.png";

const Menue = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu">
      <Avatar
        style={{ border: "1px solid grey" }}
        src={user?.profilePicture || profilePic}
        sx={{ width: 56, height: 56 }}
      />
      <Button
        style={{
          color: "black",
          textTransform: "inherit",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span>
          <span style={{ fontSize: "18px" }}>{user?.username}</span>
          <br />
          {user?.role}
        </span>
        <KeyboardArrowDownIcon style={{ marginLeft: "5px" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link className="Links" to="/Profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link onClick={() => SignedOut(dispatch)} className="Links">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Menue;
