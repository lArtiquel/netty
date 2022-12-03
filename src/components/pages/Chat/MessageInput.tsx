import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SendOutlined from '@material-ui/icons/SendOutlined'
import Button from '@material-ui/core/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import {
  CHAT_COLLECTION_NAME,
  ChatMessage,
  NETTY_GLOBAL_CHAT_NAME
} from '../../../types/ChatCollection'
import Firebase from 'firebase'
import { useFirestore } from 'react-redux-firebase'
import { ModalActions } from '../../../store/slice/ModalSlice'
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SkinTonePickerLocation,
  SkinTones,
  SuggestionMode,
  Theme
} from 'emoji-picker-react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import IconButton from '@material-ui/core/IconButton'

const INITIAL_STATE = ''

export default function MessageInput() {
  const [message, setMessage] = useState<string>(INITIAL_STATE)
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false)

  const firestore = useFirestore()

  const userId = useAppSelector((state) => state.firebase.auth.uid)
  const dispatch = useAppDispatch()

  const handleInputChange = (e: { target: { value: string } }) => {
    setMessage(e.target.value)
  }

  const handleSend = async () => {
    try {
      await firestore
        .collection(CHAT_COLLECTION_NAME)
        .doc(NETTY_GLOBAL_CHAT_NAME)
        .collection('messages')
        .doc()
        .set({
          userId: userId,
          body: message,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        } as ChatMessage)
    } catch (e) {
      dispatch(ModalActions.openErrorModal(e))
    } finally {
      setMessage(INITIAL_STATE)
      setEmojiPickerOpen(false)
    }
  }

  function onEmojiClick(emojiData: EmojiClickData, event: MouseEvent) {
    setMessage((message) => message + emojiData.emoji)
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        px={2}
        py={1}
        border={1}
        borderColor="primary.light"
        borderRadius={8}
      >
        <Box mr={1}>
          <IconButton
            aria-label="Emoji"
            onClick={() => setEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
        </Box>
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
            onClick={() => setEmojiPickerOpen(false)}
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
      {isEmojiPickerOpen && (
        <Box mt={1}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            theme={Theme.DARK}
            skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
            suggestedEmojisMode={SuggestionMode.RECENT}
            defaultSkinTone={SkinTones.NEUTRAL}
            emojiStyle={EmojiStyle.GOOGLE}
            height={350}
            width="100%"
            lazyLoadEmojis={true}
          />
        </Box>
      )}
    </Box>
  )
}
