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
          open: true,
          title: 'ERROR',
          message: action.error.message
        }
      }
    case ProfileConstants.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          open: false,
          type: '',
          message: ''
        }
      }
    default:
      return {
        ...state
      }
  }
}

export default profileReducer
