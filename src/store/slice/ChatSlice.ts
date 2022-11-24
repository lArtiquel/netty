import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
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
    openModalWithError: (state, action: PayloadAction<Error | unknown>) => {
      state.modal.isOpen = true
      state.modal.title = 'Sorry, an error occurred'
      state.modal.message = (action.payload instanceof Error) ? action.payload.message : ''
    },
    closeModal: state => {
      state.modal.isOpen = false
      state.modal.title = ''
      state.modal.message = ''
    }
  }
})

export const ChatActions = chatSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: RootState) => state.chat

export default chatSlice.reducer
