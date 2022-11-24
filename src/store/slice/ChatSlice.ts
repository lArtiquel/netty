import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { sendMessage } from '../async-actions/ChatActions'
import { Modal } from '../../types/Modal'

export interface IChatComponentState {
  modal: Modal
}

const initialState : IChatComponentState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
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
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.rejected, ({ modal }, action) => {
      modal.isOpen = true
      modal.title = 'Sorry, an error occurred'
      modal.message = action.error.message || ''
    })
  }
})

export const ChatActions = chatSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: RootState) => state.chat

export default chatSlice.reducer
