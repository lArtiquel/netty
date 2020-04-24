import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthConstants } from '../../constants/actionConstants'

export const signInAction = (credentials) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: AuthConstants.signInSuccess })
      })
      .catch((err) => {
        dispatch({ type: AuthConstants.signInError, err })
      })
  }
}

export const signOutAction = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: AuthConstants.signOutSuccess })
      })
  }
}

export const signUpAction = () => {}
