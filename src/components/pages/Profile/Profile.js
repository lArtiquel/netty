import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserInfoForm from './UserInfoForm'
import UserCredentialsForm from './UserCredsForm'
import { closeModalAction } from '../../../store/actions/profileActions'
import Modal from '../../Modal'

const Profile = ({ modal, closeModal }) => {
  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <UserInfoForm />
        <Divider />
        <UserCredentialsForm />
        <Divider />
        {modal.isOpen && (
          <Modal
            isOpen
            title={modal.title}
            message={modal.message}
            closeModalInState={closeModal}
          />
        )}
      </Box>
    </Container>
  )
}

Profile.propTypes = {
  modal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    modal: state.profile.modal
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModalAction())
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
