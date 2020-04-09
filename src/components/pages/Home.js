import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
}));

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.largeWrapper}>
      <Container>
        <Typography variant='h3' gutterBottom>
          Welcome to Netty!
        </Typography>
        <img
          className={styles.icon}
          alt='Netty'
          src={process.env.PUBLIC_URL + '/img/netty.png'}
        />
        <Typography color='secondary' variant='h5' gutterBottom>
          Your next <br /> best <br /> social app. <br /> So,
        </Typography>
        <div className={styles.smallWrapper}>
          <SignIn />
        </div>
        <Typography color='secondary' variant='h5' gutterBottom>
          Or
        </Typography>
        <div className={styles.smallWrapper}>
          <SignUp />
        </div>
      </Container>
    </div>
  );
}
