import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SignInDialog from './SignInDialog'
import SignUpDialog from './SignUpDialog'
import CoolButton, { Color } from '../../CoolButton'

const HomePage = () => {
  const [isSignInOpen, setSignInDialogOpen] = useState<boolean>(false)
  const [isSignUpOpen, setSignUpDialogOpen] = useState<boolean>(false)

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
        <CoolButton color={Color.RED} onClick={() => setSignInDialogOpen(true)}>
          Sign In
        </CoolButton>
        {isSignInOpen && (
          <SignInDialog closeCallback={() => setSignInDialogOpen(false)} />
        )}
      </Box>

      <Box py={2}>
        <Typography color="secondary" variant="h5" gutterBottom>
          Or
        </Typography>
      </Box>

      <Box py={2}>
        <CoolButton
          color={Color.BLUE}
          onClick={() => setSignUpDialogOpen(true)}
        >
          Sign Up
        </CoolButton>
        {isSignUpOpen && (
          <SignUpDialog closeCallback={() => setSignUpDialogOpen(false)} />
        )}
      </Box>
    </Box>
  )
}

export default HomePage
