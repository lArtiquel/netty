import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import chatReducer from './chatReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  chat: chatReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
