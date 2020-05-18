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
        (snapshot) => {
          const changes = snapshot.docChanges()
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
                        messages.push({
                          ...change.doc.data(),
                          id: change.doc.id,
                          photoURL: doc.data().photoURL,
                          fname: doc.data().fname,
                          sname: doc.data().sname
                        })
                        if (i === changes.length - 1) {
                          dispatch({
                            type: ChatConstants.SUBSCRIBED_MESSAGES_ADDED,
                            messages
                          })
                        }
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
    dispatch({
      type: ChatConstants.STORE_SUBSCRIPTION_HANDLE,
      payload: subscriptionHandle
    })
  }
}

export const loadMoreMessagesAction = () => {
  return (dispatch, getState, { getFirestore }) => {
    // first of all set `isBatchMsgsLoading` flag
    dispatch({ type: ChatConstants.TRIGGER_BATCH_LOADING_FLAG })
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
      .then((doc) => {
        return firestore
          .collection('chats')
          .doc('Netty-global')
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .startAfter(doc)
          .limit(ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
          .get()
      })
      .then((collection) => {
        for (
          let i = 0, promiseResolver = Promise.resolve();
          i < collection.docs.length;
          i++
        ) {
          const doc = collection.docs[i]
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
                    if (i === collection.docs.length - 1) {
                      console.log('newMessages:', newMessages)
                      dispatch({
                        type: ChatConstants.LOAD_MORE_SUCCESSED,
                        newMessages
                      })
                    }
                    // don't forget to resolve promise here
                    resolve()
                  })
              })
          )
        }
      })
      .catch((error) => {
        dispatch({ type: ChatConstants.LOAD_MORE_FAILED })
      })
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
