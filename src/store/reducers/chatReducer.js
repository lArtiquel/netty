import { ChatConstants } from '../../constants/actionConstants'
import { ChatConfig } from '../../config/AppConfig'

const initState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  },
  messages: [],
  subscriptionHandler: () => {},
  canILoadMore: false,
  allMessagesLoaded: false
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
      // at the beginning those flags are falsy, cuz we don't need to loadMoreMessages if messages.length < MESSAGES_SUBSCRIPTION_THRESHOLD
      if (!state.canILoadMore && !state.allMessagesLoaded)
        if (
          state.messages.length + action.messages.length >=
          ChatConfig.MESSAGES_SUBSCRIPTION_THRESHOLD
        )
          return {
            ...state,
            canILoadMore: true,
            messages: [...action.messages, ...state.messages]
          }
      return {
        ...state,
        messages: [...action.messages, ...state.messages]
      }
    }

    case ChatConstants.LOAD_MORE_SUCCESSED: {
      // if new messages batch size less than planned => all loaded
      if (action.newMessages.length < ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
        return {
          ...state,
          canILoadMore: false,
          allMessagesLoaded: true,
          messages: [...state.messages, ...action.newMessages]
        }
      return {
        ...state,
        messages: [...state.messages, ...action.newMessages]
      }
    }

    case ChatConstants.LOAD_MORE_FAILED: {
      return {
        ...state,
        canILoadMore: false,
        allMessagesLoaded: true,
        modal: {
          isOpen: true,
          title: 'Connection error',
          message:
            'You can not reach the top without connection. Try to reload page later.'
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

    default:
      return {
        ...state
      }
  }
}

export default chatReducer
