import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance
} from 'redux-firestore'
import rootReducer from './reducers/rootReducer'
import firebase from '../config/FirebaseConfig'

// this allows us to use "users" collection to store user reg info in firestore
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableClaims: true
}

const initialStoreState = {}

const store = createStore(
  rootReducer,
  initialStoreState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, rrfConfig)
  )
)

// react-redux-firebase props for RRF provider
export const RRFProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default store
