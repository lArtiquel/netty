import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SignIn() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color='primary' variant='contained' onClick={handleClickOpen}>
        > Sign In
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Please, Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email'
            type='email'
            fullWidth
            required
          />
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleClose} color='primary'>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
