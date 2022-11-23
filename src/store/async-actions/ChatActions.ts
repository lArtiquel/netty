/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'
import { CHAT_COLLECTION_NAME, ChatMessage, NETTY_GLOBAL_CHAT_NAME } from '../../types/ChatCollection'
import Firebase from 'firebase'
import { DocumentSnapshot } from '@firebase/firestore-types'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../types/UserInfo'

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

/**
 * Load user data by id for displaying in profile popup.
 */
export const openUserProfilePopup = createAsyncThunk<UserInfo, string>(
  'chat/openUserProfilePopup',
  async (userId: string) => {
    const firestore = getFirebase().firestore()
    const userDoc = await firestore
      .collection(USERINFO_COLLECTION_NAME)
      .doc(userId)
      .get() as DocumentSnapshot<UserInfo>
    if (userDoc.exists) {
      return userDoc.data() as UserInfo
    } else {
      throw new Error('User profile is not found!')
    }
  }
)
