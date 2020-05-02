import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SendOutlined from '@material-ui/icons/SendOutlined'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sendMessageAction } from '../../../store/actions/chatActions'

const INITIAL_STATE = {
  body: ''
}

const MessageInput = ({ sendAction }) => {
  const [message, setMessage] = useState(INITIAL_STATE)

  const handleInputChange = (e) => {
    setMessage({
      ...message,
      body: e.target.value
    })
  }

  const handleSend = () => {
    const msg = message.body.trim()
    if (msg) {
      sendAction(message)
      setMessage(INITIAL_STATE)
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      px={2}
      py={1}
      border={1}
      borderColor="primary.light"
      borderRadius={8}
    >
      <Box flexGrow={1} position="left" mr={3}>
        <TextField
          name="messageInput"
          type="text"
          autoFocus
          fullWidth
          margin="dense"
          multiline
          placeholder="Type something..."
          rowsMax={3}
          value={message.body}
          onChange={handleInputChange}
        />
      </Box>
      <Box position="right">
        <Button onClick={handleSend} variant="outlined">
          <SendOutlined />
        </Button>
      </Box>
    </Box>
  )
}

MessageInput.propTypes = {
  sendAction: PropTypes.func.isRequired
}

const mapActionsToProps = (dispatch) => {
  return {
    sendAction: (newMessage) => dispatch(sendMessageAction(newMessage))
  }
}

export default connect(null, mapActionsToProps)(MessageInput)
