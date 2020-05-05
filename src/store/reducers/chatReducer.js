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
