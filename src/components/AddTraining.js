import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/fi";

function AddTraining({ customer, addNewTraining }) {
  const [open, setOpen] = React.useState(false);
  const [newTraining, setNewTraining] = React.useState({
    activity: "",
    date: dayjs(),
    duration: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addNewTraining(customer, newTraining);
    setOpen(false);
    setNewTraining({
      activity: "",
      date: "",
      duration: "",
    });
  };

  const changeDate = (newValue) => {
    setNewTraining({ ...newTraining, date: newValue });
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Add Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add New Training For {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={newTraining.activity}
            onChange={(event) =>
              setNewTraining({ ...newTraining, activity: event.target.value })
            }
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DateTimePicker value={newTraining.date} onChange={changeDate} />
          </LocalizationProvider>
          <TextField
            value={newTraining.duration}
            onChange={(event) =>
              setNewTraining({ ...newTraining, duration: event.target.value })
            }
            margin="dense"
            label="Duration (mins)"
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
export default AddTraining;
