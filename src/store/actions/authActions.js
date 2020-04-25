// import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthConstants } from '../../constants/actionConstants'

export const signInAction = (credentials) => {
  return (dispatch, getState, db) => {
    console.log(db.getFirebase())
    console.log(db.getFirestore())
    db.getFirebase()
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
  return (dispatch, getState, db) => {
    db.getFirebase()
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: AuthConstants.signOutSuccess })
      })
  }
}

// export const signUpAction = (newUser) => {
//   return (dispatch, getState, firestore) => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(newUser.email, newUser.password)
//       .then((resp) => {
//         // this needs to be looked at as it isnt creating a users collection data #lesson 28
//         return db
//           .collection('users')
//           .doc(resp.user.uid)
//           .set({
//             firstName: newUser.firstName,
//             lastName: newUser.lastName,
//             initials: newUser.firstName[0] + newUser.lastName[0]
//           })
//       })
//       .then(() => {
//         dispatch({ type: 'SIGNUP_SUCCESS' })
//       })
//       .catch((err) => {
//         dispatch({ type: 'SIGNUP_ERROR', err })
//       })
//   }
// }
