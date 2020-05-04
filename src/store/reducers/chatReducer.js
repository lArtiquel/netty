import { ChatConstants } from '../../constants/actionConstants'

const initState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  },
  messages: [],
  subscriptionHandler: () => {}
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
    case ChatConstants.SUBSCRIBED_MESSAGE_ADDED: {
      return {
        ...state,
        // push front new message
        messages: [action.message, ...state.messages]
      }
    }
    // !Realtime updates functionality of updated and removed messages
    case ChatConstants.SUBSCRIBED_MESSAGE_MODIFIED: {
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.id !== action.message.id) {
            // This isn't the message we care about - keep it as-is
            return message
          }
          // Otherwise, this is the one we want - return an updated value
          return {
            ...action.message
          }
        })
      }
    }
    case ChatConstants.SUBSCRIBED_MESSAGE_REMOVED: {
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.message.id
        )
      }
    }
    // !End
    case ChatConstants.STORE_SUBSCRIPTION_HANDLER: {
      return {
        ...state,
        subscriptionHandle: action.payload
      }
    }
    case ChatConstants.CANCEL_SUBSCRIPTION: {
      return {
        ...state,
        messages: [],
        subscriptionHandle: () => {}
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default chatReducer
