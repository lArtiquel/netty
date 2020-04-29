import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { modifyUserCredsAction } from '../../../store/actions/profileActions'

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  profileIcon: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%',
    margin: '10px 10px 20px 10px'
  }
}))

const UserCredentialsForm = ({ email, modifyUserCreds }) => {
  const styles = useStyles()
  const [userCreds, setUserCreds] = useState({
    email,
    password: '',
    cpassword: ''
  })

  const onChange = (e) => {
    setUserCreds({
      ...userCreds,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    modifyUserCreds(userCreds)
  }

  return (
    <Box my={3}>
      <Paper variant="outlined">
        <form onSubmit={handleSubmit}>
          <img
            src={`${process.env.PUBLIC_URL}img/netty.png`}
            alt="Here should be a profile pic"
            className={styles.profileIcon}
          />
          <Box my={2} mx={3}>
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              onChange={onChange}
              value={userCreds.email}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              inputProps={{ minLength: 6 }}
              onChange={onChange}
              value={userCreds.password}
            />
            <TextField
              margin="dense"
              name="cpassword"
              label="Confirm Password"
              type="password"
              fullWidth
              required
              inputProps={{ minLength: 6 }}
              onChange={onChange}
              value={userCreds.cpassword}
            />
            <Box display="flex" justifyContent="center" mt={1}>
              <Button type="submit" variant="contained" color="secondary">
                Modify creds
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

UserCredentialsForm.propTypes = {
  email: PropTypes.string,
  modifyUserCreds: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    email: state.firebase.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modifyUserCreds: (newUserCreds) =>
      dispatch(modifyUserCredsAction(newUserCreds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCredentialsForm)
