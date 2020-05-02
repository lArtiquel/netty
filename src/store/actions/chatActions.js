import { ChatConstants } from '../../constants/actionConstants'

export const sendMessageAction = (newMessage) => {
  return (dispatch, getState, { getFirestore }) => {
    const userId = getState().firebase.auth.uid
    const firestore = getFirestore()

    if (userId) {
      firestore
        .collection('chats')
        .doc(`Netty-global`)
        .collection('messages')
        .doc()
        .set({
          userId,
          body: newMessage.body,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          dispatch({ type: ChatConstants.MESSAGE_SEND_SUCCESS })
        })
        .catch((error) => {
          dispatch({ type: ChatConstants.MESSAGE_SEND_ERROR, error })
        })
    } else
      dispatch({
        type: ChatConstants.MESSAGE_SEND_ERROR,
        error: { message: 'Sorry, you are not logged in!' }
      })
  }
}

export const closeModalAction = () => {
  return (dispatch) => dispatch({ type: ChatConstants.CLOSE_MODAL })
}
