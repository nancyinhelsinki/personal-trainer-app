import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
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
import dayjs from "dayjs";

function Trainings({ trainings, deleteTraining }) {
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => deleteTraining(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
    { field: "activity", headerName: "Activity", width: 160 },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD.MM.YYYY hh:mm A"),
    },
    { field: "duration", headerName: "Duration (mins)", width: 180 },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      valueGetter: (params) => {
        return `${params.row.customer.firstname || ""} ${
          params.row.customer.lastname || ""
        }`;
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Paper>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography align="left" variant="h6">
            Trainings
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
          getRowId={(row) => row.id}
          rows={trainings}
          columns={columns}
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
export default Trainings;
