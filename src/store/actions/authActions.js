// import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthConstants } from '../../constants/actionConstants'

export const signInAction = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: AuthConstants.SIGNIN_SUCCESS })
      })
      .catch((err) => {
        dispatch({ type: AuthConstants.SIGNIN_ERROR, err })
      })
  }
}

export const signOutAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: AuthConstants.SIGNOUT_SUCCESS })
      })
  }
}

export const signUpAction = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore.collection('userInfo').doc(resp.user.uid).set({
          fname: newUser.fname,
          sname: newUser.sname,
          dob: newUser.dob,
          location: newUser.location,
          bio: newUser.bio
        })
      })
      .then(() => {
        dispatch({ type: AuthConstants.SIGNUP_SUCCESS })
      })
      .catch((err) => {
        dispatch({ type: AuthConstants.SIGNUP_ERROR, err })
      })
  }
}

export const clearAuthErrorAction = () => {
  return (dispatch) => dispatch({ type: AuthConstants.CLEAR_ERROR })
}
