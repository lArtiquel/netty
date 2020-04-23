import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function UserCredentialsForm() {
  return (
    <Box my={3}>
      <Paper variant="outlined">
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
      </Paper>
    </Box>
  )
}
