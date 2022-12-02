import React from 'react'
import { Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { muiTheme } from './muiTheme'
import PageTemplate from './components/pages/PageTemplate'
import HomePage from './components/pages/Home/HomePage'
import Profile from './components/pages/Profile/Profile'
import Chat from './components/pages/Chat/Chat'
import { HOME_PAGE_PATH, MESSAGES_PATH, PROFILE_PATH } from './config/AppConfig'
import { PrivateRoute } from './components/PrivateRoute'
import { NotSignedOnlyRoute } from './components/NotSignedOnlyRoute'
import { VerifiedUser } from './components/VerifiedUser'

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Switch>
        <NotSignedOnlyRoute exact path="/">
          <HomePage />
        </NotSignedOnlyRoute>
        <NotSignedOnlyRoute exact path={HOME_PAGE_PATH}>
          <HomePage />
        </NotSignedOnlyRoute>
        <PrivateRoute exact path={PROFILE_PATH}>
          <VerifiedUser>
            <PageTemplate page="Profile">
              <Profile />
            </PageTemplate>
          </VerifiedUser>
        </PrivateRoute>
        <PrivateRoute exact path={MESSAGES_PATH}>
          <VerifiedUser>
            <PageTemplate page="Messages">
              <Chat />
            </PageTemplate>
          </VerifiedUser>
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  )
}

export default App
