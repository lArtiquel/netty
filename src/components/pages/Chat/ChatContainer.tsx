import React, { useRef } from 'react'
import Box from '@material-ui/core/Box'
import ScrollBottom from '../../ScrollBottom'
import MessageStack from './MessageStack'

export default function ChatContainer() {
  const bottomMessageAnchorRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      height={1}
      width={1}
      border={1}
      borderColor="primary.dark"
      borderRadius={8}
      overflow="auto"
    >
      <MessageStack anchor={bottomMessageAnchorRef} />
      <ScrollBottom anchor={bottomMessageAnchorRef} />
    </Box>
  )
}
