import React, { ReactNode } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../store/hooks/hooks'
import { MESSAGES_PATH } from '../config/AppConfig'

type Props = {
  children: ReactNode
} & RouteProps

// A wrapper for <Route> that redirects to the main screen if authenticated
export const NotSignedOnlyRoute = ({ children, ...rest }: Props) => {
  const authState = useAppSelector((state) => state.firebase.auth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.isEmpty ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: MESSAGES_PATH, // redirect to /messages path
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
