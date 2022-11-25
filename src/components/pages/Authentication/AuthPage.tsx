import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SignIn from './SignIn'
import SignUp from './SignUp'

const AuthPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={3}
      height="100%"
    >
      <Box pb={6}>
        <Typography variant="h3" gutterBottom>
          Welcome to Netty!
        </Typography>
      </Box>

      <Box py={1}>
        <img alt="Netty" src={`${process.env.PUBLIC_URL}/img/netty.png`} />
      </Box>

      <Box py={1}>
        <Typography align="center" color="secondary" variant="h5" gutterBottom>
          Your next
          <br />
          best
          <br />
          social network.
          <br />
          So,
          <br />
          What you are waiting for?
          <br />
          Choose your pill...
        </Typography>
      </Box>

      <Box py={2}>
        <SignIn />
      </Box>

      <Box py={2}>
        <Typography color="secondary" variant="h5" gutterBottom>
          Or
        </Typography>
      </Box>

      <Box py={2}>
        <SignUp />
      </Box>
    </Box>
  )
}

export default AuthPage
