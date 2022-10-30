import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { muiTheme } from './muiTheme'
import PageTemplate from './components/pages/PageTemplate'
import Home from './components/pages/Home'
import Profile from './components/pages/Profile/Profile'
import Chat from './components/pages/Chat/Chat'

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <PageTemplate page="Profile">
            <Profile />
          </PageTemplate>
        </Route>
        <Route exact path="/messages">
          <PageTemplate page="Messages">
            <Chat />
          </PageTemplate>
        </Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App
