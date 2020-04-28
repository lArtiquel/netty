import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import store, { RRFProps } from './store/store'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

// This function: prevents from flickering while firebase auth module loading
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth)
  if (!isLoaded(auth)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...RRFProps}>
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
