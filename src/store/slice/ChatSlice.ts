import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UserInfo from '../../types/UserInfo'
import { RootState } from '../store'
import { ChatConfig } from '../../config/AppConfig'
import UIMessage from '../../types/UIMessage'
import { openUserProfilePopup, sendMessage, subscribeToLastMessages } from '../async-actions/ChatActions'
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
  messages: UIMessage[],
  subscriptionHandle: () => void, // every time component mounts - it should store subscription handle
  isFirstMsgsLoading: boolean, // subscribe to last messages, store them in the state and determine hasMoreMsgs flag value
  hasMoreMsgs: boolean, // so hasMoreMsgs value is undefined for now
  isBatchMsgsLoading: boolean // after subscription msgs loaded we can use that flag to determine when new batch loading and show it in UI
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
  },
  messages: [],
  subscriptionHandle: () => {},
  isFirstMsgsLoading: true,
  hasMoreMsgs: false,
  isBatchMsgsLoading: false
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
    subscribedMessagesAdded: (state, action: PayloadAction<UIMessage[]>) => {
      // First batch of subscribed messages contains all `MESSAGES_SUBSCRIPTION_THRESHOLD` msgs
      // so, if action.messages.length < MESSAGES_SUBSCRIPTION_THRESHOLD then it's all of them
      if (state.isFirstMsgsLoading) {
        state.isFirstMsgsLoading = false
        state.hasMoreMsgs = action.payload.length >= ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD;
      }
      state.messages = action.payload.concat(state.messages)
    },
    triggerBatchLoadingFlag: state => {
      state.isBatchMsgsLoading = true
    },
    loadedMoreMessages: (state, action: PayloadAction<UIMessage[]>) => {
      // if new messages batch size less than `LOAD_MORE_MESSAGES_BATCH_SIZE` => all loaded
      if (action.payload.length < ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE) {
        return {
          ...state,
          hasMoreMsgs: false,
          isBatchMsgsLoading: false,
          messages: [...state.messages, ...action.payload]
        }
      } else {
        return {
          ...state,
          isBatchMsgsLoading: false,
          messages: [...state.messages, ...action.payload]
        }
      }
    },
    loadMoreFailed: state => {
      // if failed - stop loading new batches of messages and show modal
      state.hasMoreMsgs = true
      state.isBatchMsgsLoading = true
      state.modal.isOpen = true
      state.modal.title = 'Connection error'
      state.modal.message = 'You can not reach the top without connection. Check internet connection and come back later.'
    },
    cancelSubscription: (state) => {
      const { subscriptionHandle } = state
      subscriptionHandle() // unsubscribe
      return initialState
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
    builder.addCase(subscribeToLastMessages.fulfilled, (state, action: PayloadAction<() => void>) => {
      state.subscriptionHandle = action.payload
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
