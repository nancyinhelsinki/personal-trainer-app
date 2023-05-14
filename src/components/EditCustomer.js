import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField, IconButton } from "@mui/material";

function EditCustomer({ customerInfo, editCustomer }) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: customerInfo.firstname,
    lastname: customerInfo.lastname,
    email: customerInfo.email,
    phone: customerInfo.phone,
    streetaddress: customerInfo.streetaddress,
    postcode: customerInfo.postcode,
    city: customerInfo.city,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedCustomer = { ...customerInfo, ...customer };
    editCustomer(updatedCustomer);
    setOpen(false);
    setCustomer({
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
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            value={customer.firstname}
            onChange={(event) =>
              setCustomer({ ...customer, firstname: event.target.value })
            }
            margin="dense"
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.lastname}
            onChange={(event) =>
              setCustomer({ ...customer, lastname: event.target.value })
            }
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.streetaddress}
            onChange={(event) =>
              setCustomer({
                ...customer,
                streetaddress: event.target.value,
              })
            }
            margin="dense"
            label="Address"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.postcode}
            onChange={(event) =>
              setCustomer({ ...customer, postcode: event.target.value })
            }
            margin="dense"
            label="Post Code"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.city}
            onChange={(event) =>
              setCustomer({ ...customer, city: event.target.value })
            }
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.email}
            onChange={(event) =>
              setCustomer({ ...customer, email: event.target.value })
            }
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            value={customer.phone}
            onChange={(event) =>
              setCustomer({ ...customer, phone: event.target.value })
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
export default EditCustomer;
