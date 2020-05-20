import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MessageInput from './MessageInput'
import ChatContainer from './ChatContainer'
import Modal from '../../Modal'
import UserProfilePopup from './UserProfilePopup'
import {
  closeModalAction,
  closeUserProfilePopupAction
} from '../../../store/actions/chatActions'

const useStyles = makeStyles((theme) => ({
  ...theme.speddable,
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

const Chat = ({
  modal,
  closeModal,
  userProfilePopup,
  closeUserProfilePopup
}) => {
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

      {modal.isOpen && (
        <Modal
          isOpen
          title={modal.title}
          message={modal.message}
          closeModalInState={closeModal}
        />
      )}

      {userProfilePopup.isOpen && (
        <UserProfilePopup
          isOpen
          userProfilePopup={userProfilePopup}
          closePopupInState={closeUserProfilePopup}
        />
      )}
    </div>
  )
}

Chat.propTypes = {
  modal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  userProfilePopup: PropTypes.object.isRequired,
  closeUserProfilePopup: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    modal: state.chat.modal,
    userProfilePopup: state.chat.userProfilePopup
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModalAction()),
    closeUserProfilePopup: () => dispatch(closeUserProfilePopupAction())
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Chat)
