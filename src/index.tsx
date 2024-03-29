import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import store, { RRFProps } from './store/store'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import CircularProgress from './components/CircularProgress'
import { useAppSelector } from './store/hooks/hooks'

interface IAuthIsLoaded {
  children: JSX.Element
}

// This function: prevents from flickering while firebase auth module loading
function AuthIsLoaded({ children }: IAuthIsLoaded): JSX.Element {
  const auth = useAppSelector((state) => state.firebase.auth)
  if (!isLoaded(auth)) {
    return <CircularProgress />
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
