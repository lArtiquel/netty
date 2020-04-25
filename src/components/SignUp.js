import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  signUpAction,
  clearAuthErrorAction
} from '../store/actions/authActions'

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  fname: '',
  sname: '',
  dob: '2000-01-01',
  location: '',
  bio: ''
}

const SignUp = ({ signUp, authError, clearError }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM_STATE)

  const resetForm = () => {
    setForm(INITIAL_FORM_STATE)
    clearError()
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  const handleSubmit = (e) => {
    // don't forget to prevent default form submit behaviour
    e.preventDefault()
    // dispatch signUp action
    signUp(form)
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
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Please, Sign Up</DialogTitle>
          {authError ? <Alert severity="error">{authError}</Alert> : null}
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
              inputProps={{ minLength: 6 }}
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
              required
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
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // this prop dispatches an action in store
    signUp: (newUser) => dispatch(signUpAction(newUser)),
    clearError: () => dispatch(clearAuthErrorAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
