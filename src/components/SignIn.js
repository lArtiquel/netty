import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  openSignInFormAction,
  signInAction,
  closeSignInFormAction
} from '../store/actions/authActions'
import CoolButton from './CoolButton'
import Dialog from './Dialog'

function SignIn({
  isSignInOpened,
  openSignInForm,
  closeSignInForm,
  signIn,
  authError
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const closeAndCleanUp = () => {
    // close dialog
    closeSignInForm()
    // clean form fields
    setEmail('')
    setPassword('')
  }

  const handleSubmit = () => {
    // on success it'll automatically close dialog and clear error state
    signIn({ email, password })
  }

  const closeDialog = () => {
    closeAndCleanUp()
  }

  const resolveBody = () => {
    return (
      <>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          required
        />
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          inputProps={{ minLength: 6 }}
          required
        />
        {authError ? <Alert severity="error">{authError}</Alert> : null}
      </>
    )
  }

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={closeDialog} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Sign In
        </Button>
      </>
    )
  }

  return (
    <>
      <CoolButton color="red" onClick={openSignInForm}>
        Sign In
      </CoolButton>

      {isSignInOpened && (
        <Dialog
          title="Please, Sign In"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialogInState={closeSignInForm}
        />
      )}
    </>
  )
}

SignIn.propTypes = {
  isSignInOpened: PropTypes.bool.isRequired,
  openSignInForm: PropTypes.func.isRequired,
  closeSignInForm: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignInOpened: state.auth.isSignInOpened,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSignInForm: () => dispatch(openSignInFormAction()),
    signIn: (creds) => dispatch(signInAction(creds)),
    closeSignInForm: () => dispatch(closeSignInFormAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
