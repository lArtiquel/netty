import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '../../CircularProgress'
import Dialog from '../../Dialog'
import { closeUserProfilePopupAction } from '../../../store/actions/chatActions'

const useStyles = makeStyles(() => ({
  profileImageWrapper: {
    objectFit: 'contain',
    width: '200px',
    height: '200px'
  }
}))

const UserProfilePopup = ({ userProfilePopup, closePopup }) => {
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

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={closePopup} color="secondary">
          Close
        </Button>
      </>
    )
  }

  return (
    <>
      {userProfilePopup.isOpen && (
        <Dialog
          title={resolveTitle()}
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialogInState={closePopup}
        />
      )}
    </>
  )
}

UserProfilePopup.propTypes = {
  userProfilePopup: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    userProfilePopup: state.chat.userProfilePopup
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    closePopup: () => dispatch(closeUserProfilePopupAction())
  }
}

export default connect(mapStateToProps, mapActionsToProps)(UserProfilePopup)
