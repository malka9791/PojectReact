import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from './login';
import { Box } from '@mui/material';
export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
      Login
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
<Box
            sx={{
              backgroundColor: '#f88cda82',  // גוון ורוד בהיר
              padding: 3,
              borderRadius: 2,
              width: 300,
              margin: 'auto',
              boxShadow: 3,
            }}
          >
        <DialogTitle id="alert-dialog-title">
          {"Login"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Login/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions> </Box>
      </Dialog>
     
    </React.Fragment>
  );
}