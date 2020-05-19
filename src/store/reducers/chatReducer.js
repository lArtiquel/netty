import { ChatConstants } from '../../constants/actionConstants'
import { ChatConfig } from '../../config/AppConfig'

const initState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  },
  userInfoModal: {
    // this modal is used to display userInfo when clicking on user name in chat
    isOpen: false,
    isLoading: false,
    isError: false,
    fullname: '',
    profilePic: '',
    dob: '',
    location: '',
    bio: ''
  },
  messages: [],
  subscriptionHandler: () => {}, // every time component mounts - it should store subscription handle
  isFirstMsgsLoading: true, // subscribe to last messages, store them in the state and determine hasMoreMsgs flag value
  hasMoreMsgs: false, // so hasMoreMsgs value is undefined for now
  isBatchMsgsLoading: false // after subscription msgs loaded we can use that flag to determine when new batch loading and show it in UI
}

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case ChatConstants.MESSAGE_SEND_SUCCESS:
      return {
        ...state
      }

    case ChatConstants.MESSAGE_SEND_ERROR:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'Sorry, an error occured',
          message: action.error.message
        }
      }

    case ChatConstants.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          title: '',
          message: ''
        }
      }

    case ChatConstants.SUBSCRIBED_MESSAGES_ADDED: {
      // First batch of subscribed messages contains all `MESSAGES_SUBSCRIPTION_THRESHOLD` msgs
      // so, if action.messages.length < MESSAGES_SUBSCRIPTION_THRESHOLD then it's all of them
      if (state.isFirstMsgsLoading)
        if (
          action.messages.length < ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD
        ) {
          return {
            ...state,
            isFirstMsgsLoading: false,
            hasMoreMsgs: false,
            messages: [...action.messages, ...state.messages]
          }
        } else {
          return {
            ...state,
            isFirstMsgsLoading: false,
            hasMoreMsgs: true,
            messages: [...action.messages, ...state.messages]
          }
        }
      // And this one for next subscribed messages which are came after first load
      return {
        ...state,
        messages: [...action.messages, ...state.messages]
      }
    }

    case ChatConstants.TRIGGER_BATCH_LOADING_FLAG: {
      return {
        ...state,
        isBatchMsgsLoading: true
      }
    }

    case ChatConstants.LOAD_MORE_SUCCESSED: {
      // if new messages batch size less than `LOAD_MORE_MESSAGES_BATCH_SIZE` => all loaded
      if (action.newMessages.length < ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
        return {
          ...state,
          hasMoreMsgs: false,
          isBatchMsgsLoading: false,
          messages: [...state.messages, ...action.newMessages]
        }

      return {
        ...state,
        isBatchMsgsLoading: false,
        messages: [...state.messages, ...action.newMessages]
      }
    }

    case ChatConstants.LOAD_MORE_FAILED: {
      // if failed - stop loading new batches of messages and show modal
      return {
        ...state,
        hasMoreMsgs: false,
        isBatchMsgsLoading: true,
        modal: {
          isOpen: true,
          title: 'Connection error',
          message:
            'You can not reach the top without connection. Check internet connection and come back latter.'
        }
      }
    }

    case ChatConstants.STORE_SUBSCRIPTION_HANDLE: {
      if (action.payload) {
        return {
          ...state,
          subscriptionHandle: action.payload
        }
      }
      return {
        ...state
      }
    }

    case ChatConstants.CANCEL_SUBSCRIPTION: {
      // do not keep in store any messages or any info
      // means if component which possessed that info destroyed, this state is gone too
      return {
        ...initState
      }
    }

    case ChatConstants.OPEN_USER_INFO_MODAL: {
      return {
        ...state,
        userInfoModal: {
          ...state.userInfoModal,
          isOpen: true,
          isLoading: true
        }
      }
    }

    case ChatConstants.USER_INFO_LOADED: {
      return {
        ...state,
        userInfoModal: {
          ...state.userInfoModal,
          isLoading: false,
          fullname: action.userInfo.fullname,
          profilePic: action.userInfo.profilePic,
          dob: action.userInfo.dob,
          location: action.userInfo.location,
          bio: action.userInfo.bio
        }
      }
    }

    case ChatConstants.USER_INFO_LOAD_FAILED: {
      return {
        ...state,
        userInfoModal: {
          ...state.userInfoModal,
          isLoading: false,
          isError: true
        }
      }
    }

    case ChatConstants.CLOSE_USER_INFO_MODAL: {
      return {
        ...state,
        userInfoModal: {
          ...initState.userInfoModal
        }
      }
    }

    default:
      return {
        ...state
      }
  }
}

export default chatReducer
