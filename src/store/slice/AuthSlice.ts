import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { signIn, signUp } from '../async-actions/AuthActions'

interface AuthState {
  isSignInOpened: boolean
  isSignUpOpened: boolean
  authError: string
}

const initialState: AuthState = {
  isSignInOpened: false,
  isSignUpOpened: false,
  authError: ''
}

export const AuthSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openSignInForm: state => {
      state.isSignInOpened = true
    },
    closeSignInForm: state => {
      state.isSignInOpened = false
      state.authError = ''
    },
    openSignUpForm: state => {
      state.isSignUpOpened = true
    },
    closeSignUpForm: state => {
      state.isSignUpOpened = false
      state.authError = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isSignInOpened = false
      state.authError = ''
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.authError = action.error.message || 'Failed to sign in!'
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isSignInOpened = false
      state.authError = ''
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.authError = action.error.message || 'Failed to sign up!'
    })
  }
})

export const AuthActions = AuthSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

export default AuthSlice.reducer
