import { googleAuthProvider } from '../../../config/FirebaseConfig'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../../types/UserInfo'
import { getFirebase } from 'react-redux-firebase'

/**
 * Google profile attributes requested by OAuth2
 */
interface GoogleProfile {
  id: string
  email: string
  verified_email: boolean
  given_name: string
  family_name: string
  name: string // concatenated name
  picture: string
  granted_scopes: string
}

/**
 * SignIn with Google OAuth2.
 * In case of a new account, take some attributes into user profile from OAUth2 scope
 * see available params - {@link GoogleProfile}
 */
export const continueWithGoogle = async () => {
  const firebase = getFirebase()
  const firestore = firebase.firestore()
  const googleLogin = await firebase.auth().signInWithPopup(googleAuthProvider)
  if (googleLogin.additionalUserInfo?.isNewUser) {
    const gProfile = googleLogin.additionalUserInfo.profile as GoogleProfile
    await firestore
      .collection(USERINFO_COLLECTION_NAME)
      .doc(firebase.auth().currentUser?.uid)
      .set({
        fname: gProfile.given_name,
        sname: gProfile.family_name
      } as UserInfo)
  }
}
