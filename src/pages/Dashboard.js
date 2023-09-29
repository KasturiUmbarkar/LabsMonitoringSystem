import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Avatar, Box, Button, Drawer, TextField } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import UserDetails from "./UserDetails";
import { AuthContext } from "../commonComponents/AuthContext";
import { useNavigate } from "react-router-dom";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterRows, setFilteredRows] = useState({
    filterValue: "",
    filteredRows: rowData,
  });

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      width: 350,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer", display: "contents", fontWeight: "bold" }}
          onClick={() => handleNameColumnClick(params)}
        >
          <Avatar
            src={params.row.image}
            sx={{
              width: "10%",
              height: "50%",
              backgroundColor: "rgb(247 245 245)",
              margin: "0 5px",
              border: "1px solid gray",
            }}
          />
          {params.value}
        </div>
      ),
    },
    { field: "userId", headerName: "USER ID", width: 250 },
    {
      field: "role",
      headerName: "ROLE",
      width: 350,
      renderCell: (params) => {
        if (params.value.split(",").length > 3) {
          return (
            <div style={{ display: "flex" }}>
              {params.value.split(",").splice(0, 3).join()}
              <Avatar
                sx={{
                  width: "8%",
                  height: "20%",
                  backgroundColor: "#4e2c90",
                  margin: "0 5px",
                  fontSize: "1rem",
                  padding: "0.2rem",
                }}
              >
                +{(params.value.split(",").length % 3) + 1}
              </Avatar>
            </div>
          );
        } else {
          return params.value;
        }
      },
    },
    {
      field: "lastLogin",
      headerName: "LAST LOGIN",
      width: 300,
      renderCell: (params) =>
        `${params.value.getDate()}-${params.value.getMonth()}-${params.value.getFullYear()}
        ${params.value.getHours()}:${params.value.getMinutes()} AM`,
    },
    {
      field: "menu",
      headerName: "",
      renderCell: (params) => (
        <MoreVertRoundedIcon
          onClick={() => {
            handleNameColumnClick(params);
          }}
          sx={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  /**
   * handleNameColumnClick opens the user details drawer on click of user name
   * @param {object} param - object with row(selected row) data
   */
  const handleNameColumnClick = (params) => {
    setOpenDrawer(true);
    setSelectedRow(params.row);
  };

  /**
   * calls an api to fetch users data on mounting of component
   */
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        const rows = res.data.users.map((user) => {
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            userId: user.id * 8949,
            role: [
              "Admin",
              "Super admin",
              "Supervisor",
              "Manager",
              "Fleet Manager",
              "Driver",
            ]
              .slice(user.id % 6, 6)
              .join(),
            lastLogin: new Date(),
            image: user.image,
          };
        });
        setRowData(rows);
        setFilteredRows({ filteredRows: rows });
      })
      .catch(() => {
        toast.error("Something went wrong! Please try again!!");
      });
  }, []);

  /**
   * hupdate user details in localstorage on logout and navigate to login
   */
  const handleLogOut = (event) => {
    event.preventDefault();
    auth.setUserDetails({});
    navigate("/");
  };

  /**
   * filter the users as per provided value
   */
  const handleSearchFilter = (event) => {
    const { value = filterRows.filterValue } = event.target;
    const filteredRows =
      rowData.filter(
        (row) =>
          row.name.toLowerCase().includes(value.toLowerCase()) ||
          row.userId.toString().includes(value)
      ) || [];
    setFilteredRows({ filteredRows, filterValue: value });
  };

  return (
    <div className="container">
      <div className="content-space">
        <div>
          <h6 className="title">Users</h6>
          <p className="support-txt">
            Here are all the users for this project.
          </p>
        </div>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginRight: "15px",
              border: "2px solid",
              fontWeight: "bold",
            }}
          >
            + Add User
          </Button>
          <Button
            variant="contained"
            onClick={handleLogOut}
            sx={{ backgroundColor: "#4e2c90" }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          className="search-txt-field"
          onChange={handleSearchFilter}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "40px",
              height: "40px",
              backgroundColor: "white",
            },
            "& .MuiFormLabel-root": {
              top: "-7px",
            },
            "& .MuiDataGrid-root": {
              borderStyle: "none",
            },
          }}
        />
        <FilterAltOutlinedIcon
          sx={{
            marginLeft: "10px",
            color: filterRows.filterValue ? "black" : "#9ca4b4",
          }}
        />{" "}
        <span
          style={{
            cursor: "pointer",
            color: filterRows.filterValue ? "black" : "#9ca4b4",
          }}
          onClick={handleSearchFilter}
        >
          Filter
        </span>
      </div>
      <Box>
        <DataGrid
          rows={filterRows.filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            sorting: {
              sortModel: [{ field: "name", sort: "asc" }],
            },
          }}
          pageSizeOptions={[5]}
          sx={{
            borderStyle: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e7e9ee",
              borderRadius: "8px",
              minHeight: "45px !important",
              maxHeight: "45px !important",
              borderBottom: "solid 4px rgb(247 245 245)",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "solid 4px rgb(247 245 245)",
              minHeight: "80px !important",
              maxHeight: "80px !important",
            },
            "& .MuiDataGrid-cell: hover": {
              outline: "none",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "white",
              borderRadius: "8px",
              borderLeft: "5px solid orange",
              minHeight: "80px !important",
              maxHeight: "80px !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              height: "420px !important",
            },
          }}
        />
      </Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          "& .MuiPaper-root": {
            width: "60vh",
            borderTopLeftRadius: "20px",
          },
        }}
      >
        <UserDetails user={selectedRow} onClose={() => setOpenDrawer(false)} />
      </Drawer>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Dashboard;
