import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

export default function UserCredentialsForm() {
  const styles = useStyles()

  return (
    <Box my={3}>
      <Paper variant="outlined">
        <form>
          <img
            src={`${process.env.PUBLIC_URL}img/netty.png`}
            alt="Here should be a profile pic"
            className={styles.profileIcon}
          />
          <Box my={2} mx={3}>
            <TextField
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              disabled
              required
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="cpassword"
              label="Confirm Password"
              type="password"
              fullWidth
              required
            />
            <Box display="flex" justifyContent="center" mt={1}>
              <Button variant="contained" color="secondary">
                Change Password
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
