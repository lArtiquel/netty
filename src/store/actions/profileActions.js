import { ProfileConstants } from '../../constants/actionConstants'

export const modifyUserInfoAction = (newUserInfo) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const { uid } = getState().firebase.auth

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
    const user = firebase.auth().currentUser

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
}
