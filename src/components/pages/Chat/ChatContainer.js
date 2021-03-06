import React from 'react'
import Box from '@material-ui/core/Box'
import ScrollBottom from '../../ScrollBottom'
import MessageStack from './MessageStack'

export default function ChatContainer() {
  const backToBottomAnchorID = 'back-to-bottom-anchor'

  return (
    <Box
      height={1}
      width={1}
      border={1}
      borderColor="primary.dark"
      borderRadius={8}
      overflow="auto"
    >
      <MessageStack anchorID={backToBottomAnchorID} />
      <ScrollBottom anchorID={backToBottomAnchorID} />
    </Box>
  )
}
