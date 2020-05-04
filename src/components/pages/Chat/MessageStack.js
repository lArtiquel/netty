import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Message from './Message'
import {
  subscribeToLastAction,
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
  subscribeToLast,
  cancelSubscription
}) => {
  const styles = useStyles()

  useEffect(() => {
    console.log('in use effect!')
    subscribeToLast(3)
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
          <h4>No messages for now...</h4>
        </div>
      )}
      <button>Load more</button>
    </div>
  )
}

MessageStack.propTypes = {
  anchorID: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  subscribeToLast: PropTypes.func.isRequired,
  cancelSubscription: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    subscribeToLast: (limit) => dispatch(subscribeToLastAction(limit)),
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

// !Just query
// const messagesPath = firestore
//   .collection('chats')
//   .doc('Netty-global')
//   .collection('messages')
// messagesPath
//   .orderBy('createdAt', 'desc')
//   .startAfter(getState().firestore.ordered.messages[2])
//   .limit(1) // prints last, should be a queried doc
//   .get()
//   .then((bunchOfMessages) => {
//     console.log(bunchOfMessages.docs[2].get('body'))
//     console.log(getState().firestore)
//   })
//   .catch((error) => console.log(error.message))
