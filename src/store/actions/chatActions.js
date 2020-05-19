/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ChatConstants } from '../../constants/actionConstants'
import { ChatConfig } from '../../config/AppConfig'

export const sendMessageAction = (newMessage) => {
  return async (dispatch, getState, { getFirestore }) => {
    const userId = getState().firebase.auth.uid
    const firestore = getFirestore()

    if (userId) {
      try {
        await firestore
          .collection('chats')
          .doc(`Netty-global`)
          .collection('messages')
          .doc()
          .set({
            userId,
            body: newMessage.body,
            createdAt: firestore.FieldValue.serverTimestamp()
          })
        dispatch({ type: ChatConstants.MESSAGE_SEND_SUCCESS })
      } catch (error) {
        dispatch({ type: ChatConstants.MESSAGE_SEND_ERROR, error })
      }
    } else
      dispatch({
        type: ChatConstants.MESSAGE_SEND_ERROR,
        error: { message: 'Sorry, log in first!' }
      })
  }
}

export const subscribeToLastMessagesAction = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const messages = []

    const subscriptionHandle = firestore
      .collection('chats')
      .doc('Netty-global')
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD)
      .onSnapshot(
        async (snapshot) => {
          try {
            const changes = snapshot.docChanges()

            for (const change of changes) {
              if (change.type === 'added') {
                // making each loop cycle syncronous, so it won't mess up the message order
                const userInfoDoc = await firestore
                  .collection('userInfo')
                  .doc(change.doc.data().userId)
                  .get()
                // collect full-info messages in loaded order
                messages.push({
                  ...change.doc.data(),
                  id: change.doc.id,
                  photoURL: userInfoDoc.data().photoURL,
                  fname: userInfoDoc.data().fname,
                  sname: userInfoDoc.data().sname
                })
              }
            }
          } catch (error) {
            console.log(error)
          }
          // dispatch collected messages to state
          dispatch({
            type: ChatConstants.SUBSCRIBED_MESSAGES_ADDED,
            messages
          })
        },
        (error) => console.log(error.message)
      )
    // store subscription handle in state
    dispatch({
      type: ChatConstants.STORE_SUBSCRIPTION_HANDLE,
      payload: subscriptionHandle
    })
  }
}

export const loadMoreMessagesAction = () => {
  return async (dispatch, getState, { getFirestore }) => {
    // first of all set `isBatchMsgsLoading` flag
    dispatch({ type: ChatConstants.TRIGGER_BATCH_LOADING_FLAG })
    const firestore = getFirestore()
    const storedMessages = getState().chat.messages
    const lastMessageId = storedMessages[storedMessages.length - 1].id
    const newMessages = []

    try {
      // get last doc by id
      const lastDocMsg = await firestore
        .collection('chats')
        .doc('Netty-global')
        .collection('messages')
        .doc(lastMessageId)
        .get()
      // get batch of queried docMsgs
      const docMsgsCollection = await firestore
        .collection('chats')
        .doc('Netty-global')
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocMsg)
        .limit(ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
        .get()
      // loop thru docMsgs, get userInfo and push in array(note: loop executes sequentially)
      for (const docMsg of docMsgsCollection.docs) {
        const userInfoDoc = await firestore
          .collection('userInfo')
          .doc(docMsg.data().userId)
          .get()

        newMessages.push({
          ...docMsg.data(),
          id: docMsg.id,
          photoURL: userInfoDoc.data().photoURL,
          fname: userInfoDoc.data().fname,
          sname: userInfoDoc.data().sname
        })
      }
      // dispatch batch of msgs to state
      dispatch({
        type: ChatConstants.LOAD_MORE_SUCCESSED,
        newMessages
      })
    } catch (error) {
      dispatch({ type: ChatConstants.LOAD_MORE_FAILED })
    }
  }
}

export const cancelSubscriptionAction = () => {
  return (dispatch, getState) => {
    const { subscriptionHandle } = getState().chat
    subscriptionHandle() // this function removes subscription listener
    dispatch({ type: ChatConstants.CANCEL_SUBSCRIPTION })
  }
}

export const closeModalAction = () => {
  return (dispatch) => dispatch({ type: ChatConstants.CLOSE_MODAL })
}

export const openUserInfoModalAction = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch({ type: ChatConstants.OPEN_USER_INFO_MODAL })
    const firestore = getFirestore()

    setTimeout(() => {}, 1000)
    try {
      const userDoc = await firestore.collection('userInfo').doc(userId).get()

      dispatch({
        type: ChatConstants.USER_INFO_LOADED,
        userInfo: {
          fullname: `${userDoc.data().fname} ${userDoc.data().sname}`,
          profilePic: userDoc.data().photoURL,
          dob: userDoc.data().dob,
          location: userDoc.data().location,
          bio: userDoc.data().bio
        }
      })
    } catch (error) {
      dispatch({ type: ChatConstants.USER_INFO_LOAD_FAILED })
    }
  }
}

export const closeUserInfoModalAction = () => {
  return (dispatch) => dispatch({ type: ChatConstants.CLOSE_USER_INFO_MODAL })
}
