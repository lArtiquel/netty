import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SendOutlined from '@material-ui/icons/SendOutlined';
import Button from '@material-ui/core/Button';

export default function MessageInput() {
  return (
    <Box
      display='flex'
      alignItems='center'
      px={2}
      py={1}
      border={1}
      borderColor='primary.light'
      borderRadius={8}>
      <Box flexGrow={1} position='left' mr={3}>
        <TextField
          id='messageInput'
          type='text'
          autoFocus
          fullWidth
          margin='dense'
          multiline
          placeholder='Type something...'
          rowsMax={3}
        />
      </Box>
      <Box position='right'>
        <Button variant='outlined'>
          <SendOutlined />
        </Button>
      </Box>
    </Box>
  );
}
