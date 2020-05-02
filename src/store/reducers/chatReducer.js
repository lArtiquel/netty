import { ChatConstants } from '../../constants/actionConstants'

const initState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  }
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
    default:
      return {
        ...state
      }
  }
}

export default chatReducer
