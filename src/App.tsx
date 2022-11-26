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
          <PageTemplate page="Profile">
            <Profile />
          </PageTemplate>
        </PrivateRoute>
        <PrivateRoute exact path={MESSAGES_PATH}>
          <PageTemplate page="Messages">
            <Chat />
          </PageTemplate>
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  )
}

export default App
