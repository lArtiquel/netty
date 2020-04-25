import { AuthConstants } from '../../constants/actionConstants'

const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthConstants.signInSuccess:
      return {
        ...state,
        authError: null
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
    default:
      return {
        ...state
      }
  }
}

export default authReducer
