import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Message from './Message'

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

const MessageStack = ({ anchorID, store, messages }) => {
  const styles = useStyles()
  // const messages = useState()

  useEffect(() => {
    console.log(store)
    console.log(messages)
  }, [messages])

  return (
    <div className={styles.messageStackWrapper}>
      {messages ? (
        messages.map((message, index) => {
          return (
            <div key={message.id} id={!index ? anchorID : undefined}>
              <Message message={message} />
            </div>
          )
        })
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
    </div>
  )
}

MessageStack.propTypes = {
  anchorID: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  messages: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    store: state.firestore,
    messages: state.firestore.ordered.messages
  }
}

const mapActionsToProps = (dispatch) => {
  return {}
}

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  firestoreConnect(() => [
    {
      collection: 'chats',
      doc: 'Netty-global',
      subcollections: [
        { collection: 'messages', limit: 3, orderBy: ['createdAt', 'desc'] }
      ],
      storeAs: 'messages'
    }
  ])
)(MessageStack)
