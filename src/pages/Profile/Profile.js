import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  profileIcon: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '50%',
    margin: '10px 10px 20px 10px',
  },
}));

export default function Profile() {
  const [
    fname,
    sname,
    dob,
    location,
    bio,
    username,
    password,
  ] = useState('Art', 'Tsv');
  const styles = useStyles();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      mx={2}
      overflow='auto'>
      <Box
        display='flex'
        flexDirection='row'
        flexGrow={1}
        maxWidth='60%'
        my={3}>
        <Paper variant='outlined'>
          <Box my={2} mx={3}>
            <img
              src={process.env.PUBLIC_URL + 'img/netty.png'}
              alt='Profile Image'
              className={styles.profileIcon}
            />
            <TextField
              autoFocus
              margin='dense'
              id='fname'
              label='First Name'
              type='text'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='sname'
              label='Second Name'
              type='text'
              fullWidth
              required
            />
            <TextField
              margin='dense'
              id='dob'
              label='Date of Birth'
              type='date'
              defaultValue='2000-05-05'
            />
            <TextField
              margin='dense'
              id='location'
              label='Location'
              type='text'
              fullWidth
            />
            <TextField
              margin='dense'
              id='bio'
              label='Biography'
              type='text'
              multiline
              rows='4'
              fullWidth
            />
            <Button variant='contained' color='primary'>
              Apply
            </Button>
          </Box>
        </Paper>
      </Box>

      <Divider />

      <Box
        display='flex'
        flexDirection='row'
        flexGrow={1}
        maxWidth='60%'
        my={3}>
        <Paper variant='outlined'>
          <Box my={2} mx={3}>
            <TextField
              margin='dense'
              id='username'
              label='Username'
              type='text'
              fullWidth
              disabled
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
            <TextField
              margin='dense'
              id='cpassword'
              label='Confirm Password'
              type='password'
              fullWidth
              required
            />
            <Button variant='contained' color='secondary' my={1}>
              Change Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
