import React, { ReactNode } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useFirebase, useFirestore } from 'react-redux-firebase'
import { useAppSelector } from '../store/hooks/hooks'
import { HOME_PAGE_PATH } from '../config/AppConfig'

type Props = {
  children: ReactNode
} & RouteProps

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }: Props) => {
  const authState = useAppSelector(state => state.firebase.auth)
  const auth = useFirebase().auth()
  const firestore = useFirestore()

  // todo chek if we need to sync some props to firestore
  // auth.onAuthStateChanged(async (authUser) => {
  //   if (!authUser) return
  //
  //   const { uid, displayName, email, emailVerified, phoneNumber, photoURL } = authUser
  //
  //   const userData = {
  //     displayName,
  //     email,
  //     emailVerified,
  //     phoneNumber,
  //     photoURL,
  //   }
  //
  //   try {
  //     await firestore
  //       .collection(USERINFO_COLLECTION_NAME)
  //       .doc(uid as string)
  //       .set(userData, { merge: true })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // })

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
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
