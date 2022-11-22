import 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFirebase } from 'react-redux-firebase'

import UserInfo from '../../types/UserInfo'
import { UserCredential } from '../../types/UserCredential'

export const signIn = createAsyncThunk<void, UserCredential>(
  'auth/signIn',
    async (credentials) => {
      const firebase = getFirebase()

      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
    })

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    const firebase = getFirebase()

    await firebase
      .auth()
      .signOut()
  })


export const signUp = createAsyncThunk<void, UserInfo & UserCredential>(
  'auth/signUp',
  async (newUser) => {
    const firebase = getFirebase()

    await firebase
      .createUser({
        email: newUser.email,
        password: newUser.password
      }, {
        ...newUser
      } as UserInfo)
  })
