import { ProfileConstants } from '../../constants/actionConstants'

export const modifyUserInfoAction = (newUserInfo) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const { uid } = getState().firebase.auth

    // updating name in firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        user.updateProfile({
          displayName: `${newUserInfo.fname} ${newUserInfo.sname}`
        })
      }
    })

    // updating userInfo in firestore
    firestore
      .collection('userInfo')
      .doc(`${uid}`)
      .update({
        fname: newUserInfo.fname,
        sname: newUserInfo.sname,
        dob: newUserInfo.dob,
        location: newUserInfo.location,
        bio: newUserInfo.bio
      })
      .then(() => {
        dispatch({ type: ProfileConstants.MODIFY_USERINFO_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: ProfileConstants.MODIFY_USERINFO_ERROR, error })
      })
  }
}

export const closeModalAction = () => {
  return (dispatch) => dispatch({ type: ProfileConstants.CLOSE_MODAL })
}

export const modifyUserCredsAction = (newUserCreds) => {
  if (newUserCreds.password !== newUserCreds.cpassword) {
    return (dispatch) => {
      dispatch({ type: ProfileConstants.PASSWORDS_ARE_NOT_EQUAL })
    }
  }

  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .updateEmail(newUserCreds.email)
          .then(() => user.updatePassword(newUserCreds.password))
          .then(() => {
            dispatch({ type: ProfileConstants.MODIFY_USERCREDS_SUCCESS })
          })
          .catch((error) => {
            dispatch({ type: ProfileConstants.MODIFY_USERCREDS_ERROR, error })
          })
      }
    })
  }
}

export const changeProfileImageAction = (file) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    const firebase = getFirebase()
    const firestore = getFirestore()
    const storage = firebase.storage()
    const extension = file.name.split('.').pop()
    const filename = `hero.${extension}`

    storage
      .ref(`profilePics/${state.firebase.auth.uid}/${filename}`)
      .put(file)
      .then((response) => {
        response.ref.getDownloadURL().then((link) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // update photoURL field in firebase authentication and firestore:userInfo/${userId}
              user
                .updateProfile({
                  photoURL: link
                })
                .then(() =>
                  firestore.collection('userInfo').doc(user.uid).update({
                    photoURL: link
                  })
                )
                .then(() => {
                  dispatch({
                    type: ProfileConstants.CHANGE_PROFILE_IMAGE_SUCCESS
                  })
                })
                .catch((error) =>
                  dispatch({
                    type: ProfileConstants.CHANGE_PROFILE_IMAGE_ERROR,
                    error
                  })
                )
            }
          })
        })
      })
      .catch((error) =>
        dispatch({ type: ProfileConstants.CHANGE_PROFILE_IMAGE_ERROR, error })
      )
  }
}
