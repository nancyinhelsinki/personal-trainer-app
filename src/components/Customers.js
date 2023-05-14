import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";

import { Paper, Box, IconButton, Typography, Stack } from "@mui/material";

import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";
import { getIdFromUrl } from "../utils/utils";

function Customers({
  customers,
  addTraining,
  addCustomer,
  deleteCustomer,
  editCustomer,
}) {
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
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
      width: 130,
    },
    { field: "lastname", headerName: "Last Name", width: 130 },
    {
      field: "streetaddress",
      headerName: "Address",
      width: 160,
    },
    { field: "postcode", headerName: "Post Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Phone", width: 130 },
  ];

  // For CSV export
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }
  //
  return (
    <>
      <Paper>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          paddingBottom={1}
        >
          <Typography align="left" variant="h6">
            Customers
          </Typography>
          <AddCustomer addCustomer={addCustomer} />
        </Box>
        <DataGrid
          getRowId={(row) => getIdFromUrl(row.links[0].href)}
          rows={customers}
          columns={columns}
          editMode="row"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Paper>
    </>
  );
}
export default Customers;
