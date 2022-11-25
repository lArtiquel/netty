import React, { useEffect, useState } from 'react'
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
import { useFirestore } from 'react-redux-firebase'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../../types/UserInfo'
import { DocumentSnapshot } from '@firebase/firestore-types'

const useStyles = makeStyles(() => ({
  profileImageWrapper: {
    objectFit: 'contain',
    width: '200px',
    height: '200px'
  }
}))

export interface IUserProfilePopupState {
  isLoading: boolean
  isError: boolean
  data: UserInfo
}

export interface UserProfilePopupProps {
  userId: string
  closeCallback: () => void
}

export default function UserProfilePopup(props: UserProfilePopupProps) {
  const styles = useStyles()

  const firestore = useFirestore()

  const [userProfile, setUserProfile] = useState<IUserProfilePopupState>(
    {
      isLoading: false,
      isError: false,
      data: {
        fname: '',
        sname: '',
        photoURL: '',
        dob: '',
        location: '',
        bio: ''
      }
    })

  /**
   * Load user data by id for displaying in profile popup.
   */
  useEffect(() => {
    (async () => {
      try {
        setUserProfile({
          ...userProfile,
          isLoading: true
        })

        const userDoc = await firestore
          .collection(USERINFO_COLLECTION_NAME)
          .doc(props.userId)
          .get() as DocumentSnapshot<UserInfo>

        if (userDoc.exists) {
          setUserProfile({
            ...userProfile,
            isLoading: false,
            data: userDoc.data() as UserInfo
          })
        } else {
          setUserProfile({
            ...userProfile,
            isLoading: false,
            isError: true
          })
        }
      } catch (e) {
        setUserProfile({
          ...userProfile,
          isLoading: false,
          isError: true
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resolveTitle = () => {
    if (userProfile.isError)
      return 'Ups, an error occurred... Please try again later.'

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
          minRows={5}
        />
      </>
    )
  }

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={props.closeCallback} color="secondary">
          Close
        </Button>
      </>
    )
  }

  return (
      <Dialog
        title={resolveTitle()}
        body={resolveBody()}
        buttons={resolveButtons()}
        closeDialog={props.closeCallback}
      />
  )
}
