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

export const subscribeToLastAction = (limit) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()

    const subscriptionHandle = firestore
      .collection('chats')
      .doc('Netty-global')
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot(
        (snapshot) => {
          snapshot
            .docChanges()
            .reverse()
            .forEach((change) => {
              if (change.type === 'added') {
                console.log('Added message: ', {
                  ...change.doc.data(),
                  id: change.doc.id
                })
                dispatch({
                  type: ChatConstants.SUBSCRIBED_MESSAGE_ADDED,
                  message: { ...change.doc.data(), id: change.doc.id }
                })
              }
              // !With those functions we will have realtime updates of removed and edited messages on all client sides
              // !But for example, when message goes out the query limit, it will be removed, new message added and then modified, so it looks kinda sick
              if (change.type === 'modified') {
                console.log('Modified message: ', {
                  ...change.doc.data(),
                  id: change.doc.id
                })
                dispatch({
                  type: ChatConstants.SUBSCRIBED_MESSAGE_MODIFIED,
                  message: { ...change.doc.data(), id: change.doc.id }
                })
              }
              if (change.type === 'removed') {
                console.log('Removed message: ', change.doc.id)
                dispatch({
                  type: ChatConstants.SUBSCRIBED_MESSAGE_REMOVED,
                  message: { id: change.doc.id }
                })
              }
            })
        },
        (error) => console.log(error.message)
      )
    // store subscription handle in state
    console.log('Subscribed to last `limit` messages!')
    dispatch({
      type: ChatConstants.STORE_SUBSCRIPTION_HANDLER,
      payload: subscriptionHandle
    })
  }
}

export const cancelSubscriptionAction = () => {
  return (dispatch, getState) => {
    console.log('Subscription canceled!')
    const { subscriptionHandle } = getState().chat
    subscriptionHandle() // this function removes subscription listener
    dispatch({ type: ChatConstants.CANCEL_SUBSCRIPTION })
  }
}

export const closeModalAction = () => {
  return (dispatch) => dispatch({ type: ChatConstants.CLOSE_MODAL })
}
