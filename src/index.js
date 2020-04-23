import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { Provider, useSelector } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import firebase from 'firebase/app'
import firebaseConfig from './config/FirebaseConfig'
import store from './store/store'
import App from './App'
import * as serviceWorker from './serviceWorker'

// this function prevents from flickering while firebase auth module loading
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading...</div>
  return children
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// react-redux-firebase config
const RRBProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...RRBProps}>
      <AuthIsLoaded>
        <Router>
          <App />
        </Router>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
