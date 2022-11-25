import { Modal } from '../../types/Modal'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState : Modal = {
  isOpen: false,
  title: '',
  message: ''
}

export const ModalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openSuccessModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.title = 'Congrats!'
      state.message = action.payload
    },
    openErrorModal: (state, action: PayloadAction<Error | unknown>) => {
      state.isOpen = true
      state.title = 'Sorry, an error occurred'
      state.message = (action.payload instanceof Error) ? action.payload.message : ''
    },
    closeModal: state => {
      state.isOpen = false
      state.title = ''
      state.message = ''
    }
  }
})

export const ModalActions = ModalSlice.actions

export const selectModal = (state: RootState) => state.modal

export default ModalSlice.reducer
