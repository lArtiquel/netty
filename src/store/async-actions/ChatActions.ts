import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'
import { CHAT_COLLECTION_NAME, ChatMessage, NETTY_GLOBAL_CHAT_NAME } from '../../types/ChatCollection'
import Firebase from 'firebase'

/**
 * Action that sends a message in Netty Global chat.
 */
export const sendMessage = createAsyncThunk<void, string>(
  'chat/sendMessage',
  async (newMessage) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()

    await firestore
      .collection(CHAT_COLLECTION_NAME)
      .doc(NETTY_GLOBAL_CHAT_NAME)
      .collection('messages')
      .doc()
      .set({
        userId: firebase.auth().currentUser?.uid,
        body: newMessage,
        createdAt: Firebase.firestore.FieldValue.serverTimestamp()
      } as ChatMessage)
  })
