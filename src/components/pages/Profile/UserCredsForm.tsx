import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useFirebase } from 'react-redux-firebase'
import { ModalActions } from '../../../store/slice/ModalSlice'
import { useAppDispatch } from '../../../store/hooks/hooks'

const useStyles = makeStyles((theme) => ({
  profileIcon: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%',
    margin: '10px 10px 20px 10px'
  }
}))

export interface UserCredentialsChangeForm {
  email: string
  password: string
  cpassword: string
}

export default function UserCredentialsForm() {
  const styles = useStyles()

  const firebase = useFirebase()
  const dispatch = useAppDispatch()

  const [userCreds, setUserCreds] = useState({
    email: '',
    password: '',
    cpassword: ''
  })

  const onChange = (e: { target: { name: string; value: string } }) => {
    setUserCreds({
      ...userCreds,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      const user = firebase.auth().currentUser
      if (user) {
        if (userCreds.email !== user.email) {
          throw new Error('Email does not match!')
        }

        if (userCreds.password !== userCreds.cpassword) {
          throw new Error('Passwords do not match!')
        }

        await user.updatePassword(userCreds.password)

        dispatch(ModalActions.openSuccessModal('User credentials were successfully updated!'))
      } else {
        throw new Error('User is not signed in!')
      }
    } catch (e) {
      dispatch(ModalActions.openErrorModal(e))
    }

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
              label="Your Email"
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
                Update credentials
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
