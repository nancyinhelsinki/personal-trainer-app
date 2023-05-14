import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddCustomer({ addCustomer }) {
  const [open, setOpen] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addCustomer(newCustomer);
    setOpen(false);
    setNewCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        New Customer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            value={newCustomer.firstname}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, firstname: event.target.value })
            }
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.lastname}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, lastname: event.target.value })
            }
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.streetaddress}
            onChange={(event) =>
              setNewCustomer({
                ...newCustomer,
                streetaddress: event.target.value,
              })
            }
            margin="dense"
            label="Address"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.postcode}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, postcode: event.target.value })
            }
            margin="dense"
            label="Post Code"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.city}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, city: event.target.value })
            }
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.email}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, email: event.target.value })
            }
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            value={newCustomer.phone}
            onChange={(event) =>
              setNewCustomer({ ...newCustomer, phone: event.target.value })
            }
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddCustomer;
