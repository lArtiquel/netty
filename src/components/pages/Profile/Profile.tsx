import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import UserInfoForm from './UserInfoForm'
import UserCredentialsForm from './UserCredsForm'
import Modal from '../../Modal'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { ProfileActions, selectProfile } from '../../../store/slice/ProfileSlice'

export default function Profile() {

  const modal = useAppSelector(state => selectProfile(state))
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <UserInfoForm />
        <Divider />
        <UserCredentialsForm />
        <Divider />
        {modal.isOpen && (
          <Modal
            title={modal.title}
            message={modal.message}
            closeModal={() => dispatch(ProfileActions.closeModal())}
          />
        )}
      </Box>
    </Container>
  )
}
