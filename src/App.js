import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, IconButton, Snackbar } from "@mui/material";
import { API_URL, TRAININGS_URL } from "./components/constants";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventIcon from "@mui/icons-material/Event";

import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import TrainingCalendar from "./components/TrainingCalendar";

const drawerWidth = 240;

export default function App() {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Customers");
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Get customer list
  const getCustomers = () => {
    fetch(API_URL + "customers")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong in GET request");
      })
      .then((data) => {
        console.log(data.content);
        var cleanArr = data.content.filter(
          (item) => item.email != null && item.email != ""
        );

        setCustomers(cleanArr);
      })
      .catch((error) => console.error(error));
  };

  // Add new customers
  const addCustomer = (newCustomer) => {
    fetch(API_URL + "customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => {
        if (response.ok) {
          snackbarFeedback("New customer created successfully!");
          getCustomers();
        } else
          alert("Something went wrong in addition: " + response.statusText);
      })
      .catch((err) => console.error(err));
  };

  //  Edit customer
  const editCustomer = (customer) => {
    console.log(customer);
    fetch(customer.links[0].href, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          snackbarFeedback("Customer updated successfully!");
          getCustomers();
        } else
          alert("Something went wrong in addition: " + response.statusText);
      })
      .catch((err) => console.error(err));
  };

  // Delete customer
  const deleteCustomer = (customer) => {
    if (window.confirm("Are you sure?")) {
      fetch(customer.links[0].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            snackbarFeedback("Customer deleted successfully!");
            getCustomers();
          } else {
            snackbarFeedback("Something went wrong!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // Get trainings
  const getTrainings = () => {
    fetch(TRAININGS_URL)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong in GET request");
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCustomers();

    getTrainings();
  }, []);

  // Delete training
  const deleteTraining = (training) => {
    if (window.confirm("Are you sure?")) {
      fetch(training.links[0].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            snackbarFeedback("Training deleted successfully!");
            getTrainings();
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // Add training to a customer
  const addTraining = (customer, newTraining) => {
    const customerNewTraining = {
      ...newTraining,
      customer: customer.links[0].href,
    };
    fetch(API_URL + "trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customerNewTraining),
    })
      .then((response) => {
        if (response.ok) {
          snackbarFeedback("Training created successfully!");
          getTrainings();
        } else
          alert("Something went wrong in addition: " + response.statusText);
      })
      .catch((err) => console.error(err));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const snackbarFeedback = (message) => {
    setMsg(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setPage("Customers")}>
                <ListItemIcon>{<AccountBoxIcon />}</ListItemIcon>
                <ListItemText primary={"Customers"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setPage("Trainings")}>
                <ListItemIcon>{<DirectionsRunIcon />}</ListItemIcon>
                <ListItemText primary={"Trainings"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setPage("Calendar")}>
                <ListItemIcon>{<EventIcon />}</ListItemIcon>
                <ListItemText primary={"Calendar"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {page == "Customers" && (
            <Box padding={4}>
              <Customers
                customers={customers}
                addTraining={addTraining}
                addCustomer={addCustomer}
                editCustomer={editCustomer}
                deleteCustomer={deleteCustomer}
              />
            </Box>
          )}
          {page == "Trainings" && (
            <Box padding={4}>
              <Trainings
                trainings={trainings}
                deleteTraining={deleteTraining}
              />
            </Box>
          )}
          {page == "Calendar" && (
            <Box padding={4}>
              <TrainingCalendar trainings={trainings} />
            </Box>
          )}
        </Main>
      </Box>
      <Snackbar
        open={snackbarOpen}
        message={msg}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
