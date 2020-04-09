import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import UserInfoForm from './UserInfoForm';
import UserCredentialsForm from './UserCredForm';

export default function Profile() {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const styles = useStyles();

  return (
    <Container maxWidth='xs'>
      <Box display='flex' flexDirection='column' justifyContent='center' mx={2}>
        <UserInfoForm />
        <Divider />
        <UserCredentialsForm />
        <Divider />
      </Box>
    </Container>
  );
}
