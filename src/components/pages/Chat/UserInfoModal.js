import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import CircularProgress from '../../CircularProgress'
import Dialog from '../../Dialog'

const useStyles = makeStyles(() => ({
  profileImageWrapper: {
    objectFit: 'contain',
    width: '200px',
    height: '200px'
  }
}))

const UserInfoModal = ({ userInfoModal, closeDialogInState }) => {
  const styles = useStyles()

  const resolveTitle = () => {
    if (userInfoModal.isError)
      return 'Ups, an error occured... Please try later.'

    if (userInfoModal.isLoading) return 'Loading... Please, wait.'

    return userInfoModal.fullname
  }

  const resolveBody = () => {
    if (userInfoModal.isLoading || userInfoModal.isError)
      return <CircularProgress />

    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center" pb={2}>
          <img
            className={styles.profileImageWrapper}
            src={`${userInfoModal.profilePic}`}
            alt="Profile pic here"
          />
        </Box>
        <Divider />
        <Box display="flex" flexDirection="row" py={2}>
          <Box mr={1}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventOutlinedIcon />
                  </InputAdornment>
                ),
                readOnly: true
              }}
              defaultValue={userInfoModal.dob}
            />
          </Box>
          <Box ml={1}>
            <TextField
              label="Location"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon />
                  </InputAdornment>
                ),
                readOnly: true
              }}
              defaultValue={
                userInfoModal.location
                  ? userInfoModal.location
                  : 'Location is not specified.'
              }
            />
          </Box>
        </Box>
        <TextField
          fullWidth
          label="Biography"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FingerprintOutlinedIcon />
              </InputAdornment>
            ),
            readOnly: true
          }}
          defaultValue={
            userInfoModal.bio ? userInfoModal.bio : 'No biography for now.'
          }
          multiline
          rows={5}
        />
      </>
    )
  }

  return (
    <Dialog
      title={resolveTitle()}
      body={resolveBody()}
      closeDialogInState={closeDialogInState}
    />
  )
}

UserInfoModal.propTypes = {
  userInfoModal: PropTypes.object.isRequired,
  closeDialogInState: PropTypes.func.isRequired
}

export default UserInfoModal
