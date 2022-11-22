import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Modal } from '../../types/Modal'
import { updateProfileImage, updateUserCredentials, updateUserInfo } from '../async-actions/ProfileActions'

const initialState : Modal = {
  isOpen: false,
  title: '',
  message: ''
}

export const ProfileSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    closeModal: state => {
      state.isOpen = false
      state.title = ''
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isOpen = true
      state.title = 'SUCCESS'
      state.message = 'User info successfully updated!'
    })
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.isOpen = true
      state.title = 'ERROR'
      state.message = action.error.message || 'Failed to update user info'
    })
    builder.addCase(updateUserCredentials.fulfilled, (state, action) => {
      state.isOpen = true
      state.title = 'SUCCESS'
      state.message = 'User credentials were successfully updated!'
    })
    builder.addCase(updateUserCredentials.rejected, (state, action) => {
      state.isOpen = true
      state.title = 'ERROR'
      state.message = action.error.message || 'Failed to update user credentials!'
    })
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.isOpen = true
      state.title = 'SUCCESS'
      state.message = 'Profile image was successfully updated!'
    })
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.isOpen = true
      state.title = 'ERROR'
      state.message = action.error.message || 'Failed to update user profile image!'
    })
  }
})

export const ProfileActions = ProfileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile

export default ProfileSlice.reducer
