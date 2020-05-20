/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance
} from 'redux-firestore'
import rootReducer from './reducers/rootReducer'
import firebase, { firebaseConfig } from '../config/FirebaseConfig'

// this allows us to use "users" collection to store user reg info in firestore
const rrfConfig = {
  userProfile: 'userInfo',
  useFirestoreForProfile: true,
  enableClaims: true // Custom user claims are accessible via user's authentication tokens.
}

const initialStoreState = {}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose
const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebase, firebaseConfig)
)
const store = createStore(rootReducer, initialStoreState, enhancer)

// react-redux-firebase props for RRF provider
export const RRFProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default store
