import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import MessageInput from './MessageInput'
import ChatContainer from './ChatContainer'
import Modal from '../../Modal'
import UserProfilePopup from './UserProfilePopup'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { ChatActions, selectChat } from '../../../store/slice/ChatSlice'

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles({
    box: {
      display: 'flex',
      flexFlow: 'column',
      height: '100%',
      '& .chatHeader': {
        margin: '5px 20px',
        flex: '0 1 auto'
      },
      '& .chatContainer': {
        margin: '10px 5px',
        flex: '1 1 auto',
        overflow: 'auto' // that's really important prop, without it flexbox spread outside the viewport
      },
      '& .messageInput': {
        margin: '10px 0px',
        flex: '0 1 auto'
      }
    }
  }))

const Chat = () => {
  const styles = useStyles()
  const {modal} = useAppSelector(selectChat)
  const dispatch = useAppDispatch()

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

      {modal.isOpen && (
        <Modal
          title={modal.title}
          message={modal.message}
          closeModal={() => dispatch(ChatActions.closeModal())}
        />
      )}

      <UserProfilePopup />
    </div>
  )
}

export default Chat
