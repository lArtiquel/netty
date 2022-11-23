import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserInfo from '../../types/UserInfo'
import { RootState } from '../store'
import { openUserProfilePopup, sendMessage } from '../async-actions/ChatActions'
import { Modal } from '../../types/Modal'

/**
 * This modal is used to display userInfo when clicking on user name in chat
 */
export interface IUserProfilePopupProps {
  isOpen: boolean,
  isLoading: boolean,
  isError: boolean,
  data: UserInfo
}

export interface IChatComponentState {
  modal: Modal,
  userProfilePopup: IUserProfilePopupProps,
}

const initialState : IChatComponentState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  },
  userProfilePopup: {
    // this modal is used to display userInfo when clicking on user name in chat
    isOpen: false,
    isLoading: false,
    isError: false,
    data: {
      fname: '',
      sname: '',
      photoURL: '',
      dob: '',
      location: '',
      bio: ''
    }
  }
}

export const chatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    closeModal: state => {
      state.modal.isOpen = false
      state.modal.title = ''
      state.modal.message = ''
    },
    closeUserProfile: state => {
      state.userProfilePopup.isOpen = false
      state.userProfilePopup.isError = false
      state.userProfilePopup.isLoading = false
    },
    closeUserProfileModalDialog: state => {
      state.userProfilePopup = initialState.userProfilePopup
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.rejected, ({ modal }, action) => {
      modal.isOpen = true
      modal.title = 'Sorry, an error occurred'
      modal.message = action.error.message || ''
    })
    builder.addCase(openUserProfilePopup.pending, (state , action) => {
      state.userProfilePopup.isOpen = true
      state.userProfilePopup.isLoading = true
    })
    builder.addCase(openUserProfilePopup.fulfilled, (state , action: PayloadAction<UserInfo>) => {
      state.userProfilePopup.isLoading = false
      state.userProfilePopup.data = action.payload
    })
    builder.addCase(openUserProfilePopup.rejected, (state , action) => {
      state.userProfilePopup.isLoading = false
      state.userProfilePopup.isError = true
    })
  }
})

export const ChatActions = chatSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: RootState) => state.chat

export default chatSlice.reducer
