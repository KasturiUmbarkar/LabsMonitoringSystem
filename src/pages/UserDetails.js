import React from "react";
import { Avatar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";

const UserDetails = ({ user, onClose }) => {
  return (
    <div>
      <div className="content-space margin-left">
        <p className="title heading">User Details</p>
        <CloseIcon
          sx={{
            height: "20px",
            width: "20px",
            cursor: "pointer",
            marginRight: "1rem",
          }}
          onClick={onClose}
        />
      </div>
      <div className="user-details margin-left">
        <Avatar
          src={user.image}
          sx={{
            height: "70px",
            width: "70px",
            backgroundColor: "rgb(247 245 245)",
            margin: "1rem 5px",
            border: "1px solid gray",
          }}
        />
        <div>
          <p className="heading">{user.name}</p>
          <p className="label">User Id: {user.userId}</p>
          <Button
            variant="contained"
            color="success"
            sx={{
              margin: "-2rem 1rem 1rem 1rem",
              padding: "2px 10px",
              borderRadius: "15px",
            }}
          >
            Active
          </Button>
        </div>
      </div>
      <hr />
      <div className="user-header margin-left">
        <Avatar sx={{ height: "30px", width: "30px", margin: "0 5px" }} />
        <p className="heading">Basic & account Details</p>
      </div>
      <p className="heading margin-left">{user.name}</p>
      <p className="label margin-left">Full name</p>
      <p className="heading margin-left">{user.role}</p>
      <p className="label margin-left">User roles</p>
      <hr />
      <div className="user-header margin-left">
        <Avatar
          sx={{
            height: "30px",
            width: "30px",
            margin: "0 5px",
          }}
        >
          {<BarChartIcon />}
        </Avatar>
        <p className="heading">User data</p>
      </div>
      <p className="heading margin-left">
        {user.lastLogin.getDate()}-{user.lastLogin.getMonth()}-
        {user.lastLogin.getFullYear()} {user.lastLogin.getHours()}:
        {user.lastLogin.getMinutes()} AM
      </p>
      <p className="label margin-left">Last login</p>
    </div>
  );
};

export default UserDetails;
