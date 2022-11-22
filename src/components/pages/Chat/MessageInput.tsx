import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SendOutlined from '@material-ui/icons/SendOutlined'
import Button from '@material-ui/core/Button'
import { sendMessage } from '../../../store/async-actions/ChatActions'
import { useAppDispatch } from '../../../store/hooks/hooks'

const INITIAL_STATE = '';

export default function MessageInput() {
  const [message, setMessage] = useState(INITIAL_STATE)

  const dispatch = useAppDispatch()

  const handleInputChange = (e: { target: { value: string } }) => {
    setMessage(e.target.value)
  }

  const handleSend = () => {
    dispatch(sendMessage(message))
    setMessage(INITIAL_STATE)
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
          maxRows={3}
          value={message}
          onChange={handleInputChange}
        />
      </Box>
      <Box position="right">
        <Button
          disabled={!message.trim().length}
          onClick={handleSend}
          variant="outlined"
        >
          <SendOutlined />
        </Button>
      </Box>
    </Box>
  )
}
