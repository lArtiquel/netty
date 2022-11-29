import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import UserInfoForm from './UserInfoForm'
import UserCredentialsForm from './UserCredsForm'

export default function Profile() {
  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <UserInfoForm />
        <Divider />
        <UserCredentialsForm />
        <Divider />
      </Box>
    </Container>
  )
}
