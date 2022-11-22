import { combineReducers } from 'redux'
import { firebaseReducer, FirebaseReducer, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer, getFirestore } from 'redux-firestore'
import firebase from '../config/FirebaseConfig'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import chatReducer from './slice/ChatSlice'
import profileReducer from './slice/ProfileSlice'
import authReducer from './slice/AuthSlice'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../types/UserInfo'

const typedFirebaseReducer: <UserType,
  Schema extends Record<string, Record<string | number, string | number>>>(state: any, action: any) =>
  FirebaseReducer.Reducer<UserInfo, Schema> = firebaseReducer

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  chat: chatReducer,
  firestore: firestoreReducer,
  firebase: typedFirebaseReducer
})


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: { getFirebase, getFirestore }
    },
    immutableCheck: true,
    serializableCheck: false
  })
})

export default store

// react-redux-firebase props for RRF provider
export const RRFProps = {
  firebase,
  // this allows us to use "users" collection to store user reg info in firestore
  config: {
    userProfile: USERINFO_COLLECTION_NAME,
    useFirestoreForProfile: true,
    enableClaims: true // Custom user claims are accessible via user's authentication tokens.
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type for dispatch
export type AppDispatch = typeof store.dispatch
