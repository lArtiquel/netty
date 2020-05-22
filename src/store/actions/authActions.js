// import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthConstants } from '../../constants/actionConstants'

export const openSignInFormAction = () => {
  return (dispatch) => dispatch({ type: AuthConstants.OPEN_SIGNIN_FORM })
}

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

export const closeSignInFormAction = () => {
  return (dispatch) => dispatch({ type: AuthConstants.CLOSE_SIGNIN_FORM })
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

export const openSignUpFormAction = () => {
  return (dispatch) => dispatch({ type: AuthConstants.OPEN_SIGNUP_FORM })
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
          bio: newUser.bio,
          photoURL: ''
        })
      })
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // user is signed in
            user.updateProfile({
              displayName: `${newUser.fname} ${newUser.sname}`,
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/netty-chat.appspot.com/o/profilePics%2Fcommon%2Fno-img.png?alt=media'
            })
            dispatch({ type: AuthConstants.SIGNUP_SUCCESS })
          }
        })
      })
      .catch((err) => {
        dispatch({ type: AuthConstants.SIGNUP_ERROR, err })
      })
  }
}

export const closeSignUpFormAction = () => {
  return (dispatch) => dispatch({ type: AuthConstants.CLOSE_SIGNUP_FORM })
}
