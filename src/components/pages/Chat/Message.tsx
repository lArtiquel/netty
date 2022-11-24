import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import UIMessage from '../../../types/UIMessage'
import UserProfilePopup from './UserProfilePopup'

const useStyles = makeStyles((theme) => createStyles({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  wordWrapper: {
    overflowWrap: 'anywhere' // wrap long words without spaces
  }
}))

interface MessageProps {
  message: UIMessage
}

export default function Message({ message }: MessageProps) {
  const styles = useStyles()

  const [isUserProfileOpen, setUserProfileOpenFlag] = useState<boolean>(false)

  // when new message sent to server it takes some time to set serverTimestamp
  // we are receiving null at createdAt when new message listener pops up new message
  // so i decided to display local client time until serverTimestamp retrieving from token of server side
  // and yes, we could set serverTimestamp intstead of this with next event, but we are not listening "modify" events
  const timestamp = message.createdAt
    ? dayjs.unix(message.createdAt.seconds).format('YYYY/MM/DD h:mm A')
    : dayjs(Date.now()).format('YYYY/MM/DD h:mm A')

  return (
    <>
      <Box my={1}>
        <Paper variant="outlined">
          <Box display="flex" flexDirection="row" p={1} boxShadow={6}>
            <Avatar src={message.photoURL} className={styles.avatar}>
              {message.fname[0]}
              {message.sname[0]}
            </Avatar>
            <Box display="flex" flexDirection="column" flexGrow={1} px={2}>
              <Box display="flex" flexDirection="row">
                <Box
                  display="flex"
                  flexDirection="row"
                  flexGrow={1}
                  color="#90caf9"
                >
                  <Link
                    color="inherit"
                    component="button"
                    variant="subtitle2"
                    onClick={() => setUserProfileOpenFlag(true)}
                  >
                    {message.fname} {message.sname}
                  </Link>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  flexGrow={1}
                  color="grey.600"
                  ml={1}
                >
                  <Typography align="center" variant="caption" gutterBottom>
                    {timestamp}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                color="grey.300"
                className={styles.wordWrapper}
              >
                {message.body}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      {
        isUserProfileOpen &&
        <UserProfilePopup userId={message.userId}
                          closeCallback={() => setUserProfileOpenFlag(false)}
        />
      }
    </>
  )
}
