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
                // load additional message info(photoURL, fname, sname) from firestore
                firestore
                  .collection('userInfo')
                  .doc(change.doc.data().userId)
                  .get()
                  .then((doc) => {
                    console.log('Added message: ', {
                      ...change.doc.data(),
                      id: change.doc.id,
                      photoURL: doc.data().photoURL,
                      fname: doc.data().fname,
                      sname: doc.data().sname
                    })
                    dispatch({
                      type: ChatConstants.SUBSCRIBED_MESSAGE_ADDED,
                      message: {
                        ...change.doc.data(),
                        id: change.doc.id,
                        photoURL: doc.data().photoURL,
                        fname: doc.data().fname,
                        sname: doc.data().sname
                      }
                    })
                  })
              }
            })
        },
        (error) => console.log(error.message)
      )
    // store subscription handle in state
    console.log('Subscribed to last `limit` messages!')
    dispatch({
      type: ChatConstants.STORE_SUBSCRIPTION_HANDLE,
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
