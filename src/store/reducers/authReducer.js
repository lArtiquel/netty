import { AuthConstants } from '../../constants/actionConstants'

const initState = {
  authError: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthConstants.signInSuccess:
      return {
        ...state,
        authError: ''
      }
    case AuthConstants.signInError:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.signOutSuccess:
      return {
        ...state
      }
    case AuthConstants.signUpSuccess:
      return {
        ...state,
        authError: ''
      }
    case AuthConstants.signUpError:
      return {
        ...state,
        authError: action.err.message
      }
    case AuthConstants.clearError:
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
