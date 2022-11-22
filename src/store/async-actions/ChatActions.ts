/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ChatConfig } from '../../config/AppConfig'
import UIMessage from '../../types/UIMessage'
import { AppDispatch, RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'
import { CHAT_COLLECTION_NAME, ChatMessage, NETTY_GLOBAL_CHAT_NAME } from '../../types/ChatCollection'
import Firebase from 'firebase'
import { DocumentChange, DocumentSnapshot } from '@firebase/firestore-types'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../types/UserInfo'
import { ChatActions } from '../slice/ChatSlice'

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
 * Subscribe to new messages in Netty Global chat and acquire subscription handle.
 */
export const subscribeToLastMessages = createAsyncThunk<() => void, void, {
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: Promise<void>
}>(
  'chat/subscribeToLastMessages',
  async (_, { getState, dispatch }) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()

    let isFirstBatchLoading = true

    // // todo debug
    // // store message subscription handle in the state
    // dispatch(ChatActions.storeSubscriptionHandle(subscriptionHandle))
    return firestore
      .collection(CHAT_COLLECTION_NAME)
      .doc(NETTY_GLOBAL_CHAT_NAME)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD)
      .onSnapshot(
        async (snapshot) => {
          const messages: UIMessage[] = []
          const changes = snapshot.docChanges() as Array<DocumentChange<ChatMessage>>

          for (const change of changes) {
            if (change.type === 'added') {
              // get userInfo for each message
              const userInfoDoc = await firestore
                .collection(USERINFO_COLLECTION_NAME)
                .doc(change.doc.data().userId)
                .get() as DocumentSnapshot<UserInfo>
              const userInfo = userInfoDoc.data()
              // collect full-info messages in loaded order
              messages.push({
                ...change.doc.data(),
                id: change.doc.id,
                fname: userInfo?.fname || 'Somebody',
                sname: userInfo?.sname || 'Unknown',
                photoURL: userInfo?.photoURL || ''
              })
            }
          }

          // it fixes the issue when user switches to another route while some userInfo is still loading
          // in that case after going back to chat page in message state array would have some message(s)
          if (isFirstBatchLoading) {
            const msgArrLength = getState().chat.messages.length
            if (msgArrLength) {
              dispatch(ChatActions.cancelSubscription())
            }
            isFirstBatchLoading = false
          }
          // dispatch collected messages to state
          dispatch(ChatActions.subscribedMessagesAdded(messages))
        },
        (error) => console.log(error.message)
      )
  })

/**
 * Function used to load more messages (earliest) while scrolling to the top.
 */
export const loadMoreMessages = createAsyncThunk<void, void, {
  state: RootState,
  dispatch: AppDispatch
}>(
  'chat/loadMoreMessages',
  async (_, { getState, dispatch }) => {
    dispatch(ChatActions.triggerBatchLoadingFlag())

    const firebase = getFirebase()
    const firestore = firebase.firestore()
    const storedMessages = getState().chat.messages
    const lastMessageId = storedMessages[storedMessages.length - 1].id
    const newMessages: UIMessage[] = []

    try {
      // get last doc by id
      const lastDocMsg = await firestore
        .collection(CHAT_COLLECTION_NAME)
        .doc(NETTY_GLOBAL_CHAT_NAME)
        .collection('messages')
        .doc(lastMessageId)
        .get() as DocumentSnapshot<ChatMessage>
      // get batch of queried docMsgs
      const docMsgsCollection = await firestore
        .collection(CHAT_COLLECTION_NAME)
        .doc(NETTY_GLOBAL_CHAT_NAME)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocMsg)
        .limit(ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
        .get()
      // loop thru docMsgs, get userInfo and push in array(note: loop executes sequentially)
      for (const msgDoc of docMsgsCollection.docs) {
        const msg = msgDoc.data() as ChatMessage
        const userInfoDoc = await firestore
          .collection(USERINFO_COLLECTION_NAME)
          .doc(msg.userId)
          .get() as DocumentSnapshot<UserInfo>
        const userInfo = userInfoDoc.data()
        newMessages.push({
          ...msg,
          id: msgDoc.id,
          fname: userInfo?.fname || 'Somebody',
          sname: userInfo?.sname || 'Unknown',
          photoURL: userInfo?.photoURL || ''
        })
      }
      // dispatch batch of msgs to state
      dispatch(ChatActions.loadedMoreMessages(newMessages))
    } catch (error) {
      dispatch(ChatActions.loadMoreFailed())
    }
  }
)

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
