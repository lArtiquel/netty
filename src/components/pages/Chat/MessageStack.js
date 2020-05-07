import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Message from './Message'
import {
  subscribeToMessagesAction,
  cancelSubscriptionAction
} from '../../../store/actions/chatActions'

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  messageStackWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'auto', // message stack has it's own scroll bar
    padding: '16px'
  }
}))

const MessageStack = ({
  anchorID,
  messages,
  subscribeToMessages,
  cancelSubscription
}) => {
  const styles = useStyles()

  useEffect(() => {
    subscribeToMessages()
    return () => cancelSubscription()
  }, [])

  return (
    <div className={styles.messageStackWrapper}>
      {messages.length ? (
        messages.map((message, index) => (
          <div key={message.id} id={!index ? anchorID : undefined}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: '#e0e0e0'
          }}
        >
          <h4>No loaded messages for now...</h4>
        </div>
      )}
    </div>
  )
}

MessageStack.propTypes = {
  anchorID: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  subscribeToMessages: PropTypes.func.isRequired,
  cancelSubscription: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    subscribeToMessages: () => dispatch(subscribeToMessagesAction()),
    cancelSubscription: () => dispatch(cancelSubscriptionAction())
  }
}

export default compose(connect(mapStateToProps, mapActionsToProps))(
  MessageStack
)

// !Message subscription thru firestoreConnect HOC
// import { firestoreConnect } from 'react-redux-firebase'
// firestoreConnect(() => [
//   {
//     collection: 'chats',
//     doc: 'Netty-global',
//     subcollections: [
//       { collection: 'messages', limit: 3, orderBy: ['createdAt', 'desc'] }
//     ],
//     storeAs: 'messages'
//   }
// ])
