import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  smallContainer: {
    margin: '20px 0 20px 0',
    textAlign: 'center',
  },
  container: {
    margin: '50px 0 0 0',
    textAlign: 'center',
  },
});

export default function Home() {
  const customStyles = useStyles();

  return (
    <div className={customStyles.container}>
      <Container>
        <Typography variant='h3' gutterBottom>
          Welcome to Netty!
        </Typography>
        <img
          className={customStyles.smallContainer}
          alt='Netty'
          src={process.env.PUBLIC_URL + '/img/netty.png'}
        />
        <Typography color='secondary' variant='h5' gutterBottom>
          Your next <br /> best <br /> social app. <br /> So,
        </Typography>
        <Button
          color='primary'
          variant='contained'
          startIcon={<Icon>VpnKeyIcon</Icon>}>
          Sign In
        </Button>
        <Typography color='secondary' variant='h5' gutterBottom>
          Or
        </Typography>
        <Button color='primary' variant='contained'>
          Sign Up
        </Button>
      </Container>
    </div>
  );
}
