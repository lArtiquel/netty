import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../types/UserInfo'
import { UserCredentialsChangeForm } from '../../components/pages/Profile/UserCredsForm'

export const updateUserInfo = createAsyncThunk<void, UserInfo>(
  'profile/modifyUserInfo',
  async (newUserInfo) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()

    const user = firebase.auth().currentUser
    if (user) {
        await user.updateProfile({
          displayName: `${newUserInfo.fname} ${newUserInfo.sname}`
        })
        // updating userInfo in firestore
        await firestore
          .collection(USERINFO_COLLECTION_NAME)
          .doc(`${user.uid}`)
          .update({
            fname: newUserInfo.fname,
            sname: newUserInfo.sname,
            dob: newUserInfo.dob,
            location: newUserInfo.location,
            bio: newUserInfo.bio
          })
      } else {
        throw new Error('User is not signed in!')
      }
  })

export const updateUserCredentials = createAsyncThunk<void, UserCredentialsChangeForm>(
  'profile/updateUserCredentials',
  async (userCredentialsForm) => {
    const firebase = getFirebase()

    const user = firebase.auth().currentUser
    if (user) {
      if (userCredentialsForm.email !== user.email) {
        throw new Error('Email does not match!')
      }

      if (userCredentialsForm.password !== userCredentialsForm.cpassword) {
        throw new Error('Passwords do not match!')
      }

      await user.updatePassword(userCredentialsForm.password)
    } else {
      throw new Error('User is not signed in!')
    }
})

export const updateProfileImage = createAsyncThunk<void, File>(
  'profile/updateProfileImage',
  async (file) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()
    const storage = firebase.storage()
    const extension = file.name.split('.').pop()
    const filename = `hero.${extension}`

    const user = firebase.auth().currentUser
    if (user) {
        const response = await storage
          .ref(`profilePics/${user.uid}/${filename}`)
          .put(file)

        const photoUrl = await response.ref.getDownloadURL()

        await user.updateProfile({
          photoURL: photoUrl
        })

        await firestore
          .collection(USERINFO_COLLECTION_NAME)
          .doc(user.uid)
          .update({
            photoURL: photoUrl
          })
      } else {
        throw new Error('User is not signed in!')
      }
  })
