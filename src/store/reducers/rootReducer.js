import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
