import React, { ReactNode } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../store/hooks/hooks'
import { HOME_PAGE_PATH } from '../config/AppConfig'

type Props = {
  children: ReactNode
} & RouteProps

/**
 * A wrapper for <Route> that redirects to the home screen
 * if user is not yet authenticated
 */
export const PrivateRoute = ({ children, ...rest }: Props) => {
  const authState = useAppSelector((state) => state.firebase.auth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.isLoaded && !authState.isEmpty ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: HOME_PAGE_PATH,
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
