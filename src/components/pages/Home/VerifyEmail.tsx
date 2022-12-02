import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useFirebase } from 'react-redux-firebase'
import { useAppSelector } from '../../../store/hooks/hooks'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  buttonMargin: {
    margin: theme.spacing(1)
  }
}))

export const VerifyEmail = () => {
  const styles = useStyles()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const { email } = useAppSelector((state) => state.firebase.auth)

  const firebase = useFirebase()

  const sendEmailVerificationLink = async () => {
    try {
      setError('')
      setLoading(true)

      const user = firebase.auth().currentUser
      if (user) {
        await user.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT as string
        })
        setEmailSent(true)
      } else {
        setError('Not authenticated!')
      }
    } catch (e) {
      setEmailSent(false)
      setError('Failed to send confirmation email. Please, try again later!')
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await firebase.auth().signOut()
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Box border={1} borderColor="text.primary">
        <Typography variant="h3" align="center" gutterBottom={true}>
          Please verify your email &#128578;
        </Typography>

        <Typography variant="h4" align="center">
          To use chat, you need to verify your email -{' '}
          <u>
            <i>{email}</i>
          </u>
        </Typography>

        <Typography variant="h5" align="center">
          Check you emails (spam folder included) for a confirmation email.
        </Typography>

        <Typography variant="h5" align="center">
          Reload this page after confirming to get redirected.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            disabled={isLoading || emailSent}
            variant="contained"
            color="primary"
            onClick={sendEmailVerificationLink}
            className={styles.buttonMargin}
          >
            {isLoading
              ? 'Sending email...'
              : emailSent
              ? 'Email sent! Awaiting confirmation.'
              : 'Send confirmation email'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={signOut}
            className={styles.buttonMargin}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}
