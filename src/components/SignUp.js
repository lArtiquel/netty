import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  fname: '',
  sname: '',
  dob: '',
  location: '',
  bio: ''
}

export default function SignIn() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM_STATE)

  const resetForm = () => {
    setForm(INITIAL_FORM_STATE)
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  const submitForm = () => {
    // submittin
    resetForm()
  }

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Sign Up
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please, Sign Up</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Your login info</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            onChange={handleFormChange}
            value={form.email}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            inputProps={{ maxLength: 2 }}
            required
            onChange={handleFormChange}
            value={form.password}
          />
        </DialogContent>
        <DialogContent dividers>
          <DialogContentText>Your personal info</DialogContentText>
          <TextField
            margin="dense"
            name="fname"
            label="First Name"
            type="text"
            fullWidth
            required
            onChange={handleFormChange}
            value={form.fname}
          />
          <TextField
            margin="dense"
            name="sname"
            label="Second Name"
            type="text"
            fullWidth
            required
            onChange={handleFormChange}
            value={form.sname}
          />
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            defaultValue="2000-05-05"
            onChange={handleFormChange}
            value={form.dob}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            onChange={handleFormChange}
            value={form.location}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Tell me about yourself"
            type="text"
            multiline
            rows="4"
            fullWidth
            onChange={handleFormChange}
            value={form.bio}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitForm} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
