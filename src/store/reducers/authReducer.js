import { AuthConstants } from '../../constants/actionConstants'

const initState = {
  authError: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        authError: ''
      }
    case AuthConstants.SIGNIN_ERROR:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.SIGNOUT_SUCCESS:
      return {
        ...state
      }
    case AuthConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        authError: ''
      }
    case AuthConstants.SIGNUP_ERROR:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.CLEAR_ERROR:
      return {
        ...state,
        authError: ''
      }
    default:
      return {
        ...state
      }
  }
}

export default authReducer
