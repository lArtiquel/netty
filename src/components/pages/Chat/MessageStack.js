import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import InfiniteScroll from '../../InfiniteScroll'
import CircularProgress from '../../CircularProgress'
import Message from './Message'
import {
  subscribeToLastMessagesAction,
  cancelSubscriptionAction,
  loadMoreMessagesAction
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
  subscribeToLastMessages,
  cancelSubscription,
  canILoadMore,
  allMessagesLoaded,
  loadMoreMessages
}) => {
  const styles = useStyles()

  useEffect(() => {
    subscribeToLastMessages()
    return () => cancelSubscription()
  }, [])

  return (
    <InfiniteScroll
      hasMore={canILoadMore && !allMessagesLoaded}
      loadMore={() => loadMoreMessages()}
      loader={<CircularProgress />}
      endMessage={
        <div style={{ textAlign: 'center' }}>
          <p>Yay! You have seen them all!</p>
        </div>
      }
      reverse
      threshold={1}
      materialStyle={styles.messageStackWrapper}
    >
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
    </InfiniteScroll>
  )
}

MessageStack.propTypes = {
  anchorID: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  subscribeToLastMessages: PropTypes.func.isRequired,
  cancelSubscription: PropTypes.func.isRequired,
  canILoadMore: PropTypes.bool.isRequired,
  allMessagesLoaded: PropTypes.bool.isRequired,
  loadMoreMessages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
    canILoadMore: state.chat.canILoadMore,
    allMessagesLoaded: state.chat.allMessagesLoaded
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    subscribeToLastMessages: () => dispatch(subscribeToLastMessagesAction()),
    cancelSubscription: () => dispatch(cancelSubscriptionAction()),
    loadMoreMessages: () => dispatch(loadMoreMessagesAction())
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
