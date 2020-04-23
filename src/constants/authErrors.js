export const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

export const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`

export const SIGNIN_ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential'

export const SIGNIN_ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`
