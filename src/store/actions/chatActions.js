import { ChatConstants } from '../../constants/actionConstants'
import { ChatConfig } from '../../config/AppConfig'

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
        error: { message: 'Sorry, log in first!' }
      })
  }
}

export const subscribeToMessagesAction = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()

    const subscriptionHandle = firestore
      .collection('chats')
      .doc('Netty-global')
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD)
      .onSnapshot(
        (snapshot) => {
          const changes = snapshot.docChanges().reverse()
          // create an initial immediately resolving promise, and then chain new promises as the previous ones resolve
          // this needed because foreach is sync operation in JS and we won't get needed execution result order if we'll just run async operations inside of it
          for (
            let i = 0, promiseResolver = Promise.resolve();
            i < changes.length;
            i++
          ) {
            const change = changes[i]
            if (change.type === 'added') {
              promiseResolver = promiseResolver.then(
                () =>
                  new Promise((resolve) => {
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
                        // don't forget to resolve promise here
                        resolve()
                      })
                  })
              )
            }
          }
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

export const loadMoreAction = (howMany) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const storedMessages = getState().chat.messages
    const lastMessageId = storedMessages[storedMessages.length - 1].id
    const newMessages = []

    firestore
      .collection('chats')
      .doc('Netty-global')
      .collection('messages')
      .doc(lastMessageId)
      .get()
      .then((doc) =>
        firestore
          .collection('chats')
          .doc('Netty-global')
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .startAfter(doc)
          .limit(howMany)
          .get()
      )
      .then((docs) => {
        for (
          let i = 0, promiseResolver = Promise.resolve();
          i < docs.length;
          i++
        ) {
          const { doc } = docs[i]
          promiseResolver = promiseResolver.then(
            () =>
              new Promise((resolve) => {
                firestore
                  .collection('userInfo')
                  .doc(doc.data().userId)
                  .get()
                  .then((userDoc) => {
                    newMessages.push({
                      ...doc.data(),
                      id: doc.id,
                      photoURL: userDoc.data().photoURL,
                      fname: userDoc.data().fname,
                      sname: userDoc.data().sname
                    })
                    // don't forget to resolve promise here
                    resolve()
                  })
              })
          )
        }
        dispatch({ type: ChatConstants.LOAD_MORE_SUCCESSED, newMessages })
      })
      .catch((error) => {
        console.log('Load more error message:', error.message)
        dispatch({ type: ChatConstants.LOAD_MORE_FAILED })
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
