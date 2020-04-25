import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  signInAction,
  clearAuthErrorAction
} from '../store/actions/authActions'

function SignIn({ signIn, authError, clearError }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
    clearError()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn({ email, password })
    resetForm()
  }

  const closeDialog = () => {
    setOpen(false)
    resetForm()
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Sign In
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Please, Sign In</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={closeDialog} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
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
    signIn: (creds) => dispatch(signInAction(creds)),
    clearError: () => dispatch(clearAuthErrorAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
