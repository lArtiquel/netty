import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  }
}))

const Message = ({ message }) => {
  const styles = useStyles()
  // we need that 'few seconds ago' just because it takes some time to set serverTimestamp, so we are receiving null in first couple seconds
  const timestamp = message.createdAt
    ? dayjs.unix(message.createdAt.seconds).format('YYYY/MM/DD h:mm A')
    : 'few seconds ago'

  return (
    <Box my={1}>
      <Paper variant="outlined">
        <Box display="flex" flexDirection="row" px={2} py={1} boxShadow={4}>
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
                <Typography variant="subtitle2" gutterBottom>
                  {message.fname} {message.sname}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row-reverse"
                flexGrow={1}
                alignItems="center"
                color="grey.600"
              >
                <Typography variant="subtitle2" gutterBottom>
                  {/* {message.createdAt} -- careful, it's obj! */}
                  {/* 01.01.2020 3:30 PM */}
                  {timestamp}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" color="grey.300">
              {message.body}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message
