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
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '../../CircularProgress'
import Dialog from '../../Dialog'

const useStyles = makeStyles(() => ({
  profileImageWrapper: {
    objectFit: 'contain',
    width: '200px',
    height: '200px'
  }
}))

const UserProfilePopup = ({ isOpen, userProfilePopup, closePopupInState }) => {
  const styles = useStyles()

  const resolveTitle = () => {
    if (userProfilePopup.isError)
      return 'Ups, an error occured... Please try later.'

    if (userProfilePopup.isLoading) return 'Loading... Please, wait.'

    return userProfilePopup.data.fullname
  }

  const resolveBody = () => {
    if (userProfilePopup.isLoading || userProfilePopup.isError)
      return <CircularProgress />

    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center" pb={2}>
          <Avatar
            variant="rounded"
            className={styles.profileImageWrapper}
            src={`${userProfilePopup.data.profilePic}`}
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
              defaultValue={userProfilePopup.data.dob}
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
                userProfilePopup.data.location
                  ? userProfilePopup.data.location
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
            userProfilePopup.data.bio
              ? userProfilePopup.data.bio
              : 'No biography for now.'
          }
          multiline
          rows={5}
        />
      </>
    )
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={resolveTitle()}
      body={resolveBody()}
      closeDialogInState={closePopupInState}
    />
  )
}

UserProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  userProfilePopup: PropTypes.object.isRequired,
  closePopupInState: PropTypes.func.isRequired
}

export default UserProfilePopup
