import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  openSignUpFormAction,
  signUpAction,
  closeSignUpFormAction
} from '../store/actions/authActions'
import CoolButton from './CoolButton'
import Dialog from './Dialog'

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  fname: '',
  sname: '',
  dob: '',
  location: '',
  bio: ''
}

const SignUp = ({
  isSignUpOpened,
  openSignUpForm,
  closeSignUpForm,
  signUp,
  authError
}) => {
  const [form, setForm] = useState(INITIAL_FORM_STATE)

  const closeAndCleanUp = () => {
    // close dialog
    closeSignUpForm()
    // set form to init state
    setForm(INITIAL_FORM_STATE)
  }

  const handleClose = () => {
    closeAndCleanUp()
  }

  const handleSubmit = () => {
    // on success it'll automatically close dialog and clear error state
    signUp(form)
  }

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const resolveBody = () => {
    return (
      <>
        <Box mb={2} borderRadius={8} boxShadow={4}>
          <Box px={2} py={1}>
            <Typography align="center" gutterBottom>
              Type your credentials
            </Typography>
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
          </Box>
        </Box>

        {authError ? <Alert severity="error">{authError}</Alert> : null}

        <Box mt={2} borderRadius={8} boxShadow={4}>
          <Box px={2} py={1}>
            <Typography align="center" gutterBottom>
              Type your personal info
            </Typography>
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
              InputLabelProps={{ shrink: true }}
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
          </Box>
        </Box>
      </>
    )
  }

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Sign Up
        </Button>
      </>
    )
  }

  return (
    <>
      <CoolButton color="blue" onClick={openSignUpForm}>
        Sign Up
      </CoolButton>

      {isSignUpOpened && (
        <Dialog
          title="Please, Sign Up"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialogInState={closeSignUpForm}
        />
      )}
    </>
  )
}

SignUp.propTypes = {
  isSignUpOpened: PropTypes.bool.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  closeSignUpForm: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignUpOpened: state.auth.isSignUpOpened,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSignUpForm: () => dispatch(openSignUpFormAction()),
    signUp: (newUser) => dispatch(signUpAction(newUser)),
    closeSignUpForm: () => dispatch(closeSignUpFormAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
