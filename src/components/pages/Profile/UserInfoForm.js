import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const INITIAL_STATE = {
  fname: '',
  sname: '',
  dob: '',
  location: '',
  bio: '',
};

export default function UserInfoForm() {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const styles = useStyles();

  return (
    <Box my={3}>
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
          <Box display='flex' justifyContent='center' mt={1}>
            <Button variant='contained' color='secondary'>
              Apply Changes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
