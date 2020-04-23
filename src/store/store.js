import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import rootReducer from './reducers/rootReducer'
import firebaseConfig from '../config/FirebaseConfig'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig)
  )
)

export default store
