import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Paper,
  Box,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";

function Customers({
  customers,
  addTraining,
  addCustomer,
  deleteCustomer,
  editCustomer,
}) {
  //const [search, setSearch] = useState("");

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 260,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => deleteCustomer(params.row)}
          >
            <DeleteIcon />
          </IconButton>
          <EditCustomer customerInfo={params.row} editCustomer={editCustomer} />

          <AddTraining addNewTraining={addTraining} customer={params.row} />
        </Stack>
      ),
    },
    {
      field: "firstname",
      headerName: "First Name",
      width: 100,
    },
    { field: "lastname", headerName: "Last Name", width: 100 },
    {
      field: "streetaddress",
      headerName: "Address",
      width: 160,
    },
    { field: "postcode", headerName: "Post Code", width: 90 },
    { field: "city", headerName: "City", width: 90 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Phone", width: 130 },
  ];

  // const searchBar () => {}

  const getRowId = (url) => {
    //example url: http://traineeapp.azurewebsites.net/api/trainings/13756
    return url.substring(url.lastIndexOf("/") + 1);
  };

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <Paper>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography align="left" variant="h6">
            Customers
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            variant="standard"
          ></TextField>{" "}
        </Box>
        <DataGrid
          getRowId={(row) => getRowId(row.links[0].href)}
          rows={customers}
          columns={columns}
          editMode="row"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </>
  );
}
export default Customers;
