import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import CircularProgress from '@material-ui/core/CircularProgress'

const browserHistory = require('history').createBrowserHistory

export const UserIsAuthenticated = connectedRouterRedirect({
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
  // Render this component when the authenticatingSelector returns true
  AuthenticatingComponent: CircularProgress,
  // This not allows us to redirect back
  allowRedirectBack: false,
  // Default redirect path for non authed users to /home
  redirectPath: '/home',
  // Display LoadingSpinner while auth object isn't loaded
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  // If selector is true, wrapper will not redirect
  // So if auth object has isEmpty flag
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  // Dispatches new redux actions
  redirectAction: (newLoc) => {
    console.log(browserHistory)
    browserHistory.replace(newLoc)
  }
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: CircularProgress,
  allowRedirectBack: false,
  // Redirecting authed user to the /messages by default
  redirectPath: '/messages',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: (newLoc) => {
    console.log(browserHistory)
    browserHistory.replace(newLoc)
  }
})
