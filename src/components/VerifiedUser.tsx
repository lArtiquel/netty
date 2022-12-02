import React, { ReactNode } from 'react'
import { useAppSelector } from '../store/hooks/hooks'
import { VerifyEmail } from './pages/Home/VerifyEmail'

type Props = {
  children: ReactNode
}

/**
 * A wrapper for components that needs to have a verified email to be used
 */
export const VerifiedUser = ({ children }: Props) => {
  const emailVerified = useAppSelector(
    (state) => state.firebase.auth.emailVerified
  )

  return <>{emailVerified ? children : <VerifyEmail />}</>
}
