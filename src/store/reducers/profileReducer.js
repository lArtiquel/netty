import { ProfileConstants } from '../../constants/actionConstants'

const initState = {
  modal: {
    isOpen: false,
    title: '',
    message: ''
  }
}

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case ProfileConstants.MODIFY_USERINFO_SUCCESS:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'SUCCESS',
          message: 'User info successfully updated!'
        }
      }
    case ProfileConstants.MODIFY_USERINFO_ERROR:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'ERROR',
          message: action.error.message
        }
      }
    case ProfileConstants.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          title: '',
          message: ''
        }
      }
    case ProfileConstants.PASSWORDS_ARE_NOT_EQUAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'ERROR',
          message: 'Passwords should be equal!'
        }
      }
    case ProfileConstants.MODIFY_USERCREDS_SUCCESS:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'SUCCESS',
          message: 'Yass! User creds successfully changed!'
        }
      }
    case ProfileConstants.MODIFY_USERCREDS_ERROR:
      return {
        ...state,
        modal: {
          isOpen: true,
          title: 'ERROR',
          message: action.error.message
        }
      }
    default:
      return {
        ...state
      }
  }
}

export default profileReducer
