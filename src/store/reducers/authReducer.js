import { AuthConstants } from '../../constants/actionConstants'

const initState = {
  isSignInOpened: false,
  isSignUpOpened: false,
  authError: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthConstants.OPEN_SIGNIN_FORM:
      return {
        ...state,
        isSignInOpened: true
      }
    case AuthConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        isSignInOpened: false,
        authError: ''
      }
    case AuthConstants.SIGNIN_ERROR:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.CLOSE_SIGNIN_FORM:
      return {
        ...state,
        isSignInOpened: false,
        authError: ''
      }
    case AuthConstants.SIGNOUT_SUCCESS:
      return {
        ...state
      }
    case AuthConstants.OPEN_SIGNUP_FORM:
      return {
        ...state,
        isSignUpOpened: true
      }
    case AuthConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isSignUpOpened: false,
        authError: ''
      }
    case AuthConstants.SIGNUP_ERROR:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.CLOSE_SIGNUP_FORM:
      return {
        ...state,
        isSignUpOpened: false,
        authError: ''
      }
    default:
      return {
        ...state
      }
  }
}

export default authReducer
