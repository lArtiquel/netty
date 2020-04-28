import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const browserHistory = require('history').createBrowserHistory

export const UserIsAuthenticated = connectedRouterRedirect({
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
  // This not allows us to redirect back
  allowRedirectBack: false,
  // Default redirect path for non authed users to /home
  redirectPath: '/home',
  // If selector is true, wrapper will not redirect
  // So if auth object has isEmpty flag
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  // Dispatches new redux actions
  redirectAction: (newLoc) => {
    browserHistory.replace(newLoc)
  }
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  // Redirecting authed user to the /messages by default
  redirectPath: '/messages',
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: (newLoc) => {
    browserHistory.replace(newLoc)
  }
})
