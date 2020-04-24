import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import MessageInput from './MessageInput'
import ChatContainer from './ChatContainer'

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    '& .chatHeader': {
      margin: '15px 20px 10px 20px',
      flex: '0 1 auto'
    },
    '& .chatContainer': {
      margin: '10px 20px 10px 20px',
      flex: '1 1 auto',
      overflow: 'auto'
    },
    '& .messageInput': {
      margin: '10px 20px 10px 20px',
      flex: '0 1 auto'
    }
  }
}))

export default function Chat() {
  const styles = useStyles()

  return (
    <div className={styles.box}>
      <div className="chatHeader">
        <Typography variant="h6" align="center">
          Welcome to Global Netty Chat!
        </Typography>
      </div>
      <Divider />
      <div className="chatContainer">
        <ChatContainer />
      </div>
      <Divider />
      <div className="messageInput">
        <MessageInput />
      </div>
    </div>
  )
}
