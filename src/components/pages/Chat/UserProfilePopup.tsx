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
import CircularProgress from '../../CircularProgress'
import Dialog from '../../Dialog'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { ChatActions } from '../../../store/slice/ChatSlice'

const useStyles = makeStyles(() => ({
  profileImageWrapper: {
    objectFit: 'contain',
    width: '200px',
    height: '200px'
  }
}))

export default function UserProfilePopup() {
  const styles = useStyles()

  const userProfile = useAppSelector(state => state.chat.userProfilePopup)
  const dispatch = useAppDispatch()

  const resolveTitle = () => {
    if (userProfile.isError)
      return 'Ups, an error occured... Please try later.'

    if (userProfile.isLoading) return 'Loading... Please, wait.'

    return `${userProfile.data.fname} ${userProfile.data.sname}`
  }

  const resolveBody = () => {
    if (userProfile.isLoading || userProfile.isError)
      return <CircularProgress />

    return (
      <>
        <Box display="flex" justifyContent="center" alignItems="center" pb={2}>
          <Avatar
            variant="rounded"
            className={styles.profileImageWrapper}
            src={`${userProfile.data.photoURL}`}
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
              defaultValue={userProfile.data.dob}
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
                userProfile.data.location
                  ? userProfile.data.location : 'Location is not specified.'
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
            userProfile.data.bio
              ? userProfile.data.bio
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
        <Button variant="contained" onClick={() => dispatch(ChatActions.closeUserProfile())} color="secondary">
          Close
        </Button>
      </>
    )
  }

  return (
    <>
      {userProfile.isOpen && (
        <Dialog
          title={resolveTitle()}
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialog={() => dispatch(ChatActions.closeUserProfile())}
        />
      )}
    </>
  )
}
