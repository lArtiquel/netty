import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import { updateProfileImage, updateUserInfo } from '../../../store/async-actions/ProfileActions'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { DEFAULT_USER_PROFILE_PICTURE } from '../../../config/AppConfig'
import UserInfo from '../../../types/UserInfo'

const useStyles = makeStyles((theme) => ({
  profileImageWrapper: {
    display: 'flex',
    position: 'relative',
    margin: '10px 10px 20px 10px',
    '& img': {
      objectFit: 'contain',
      width: '200px',
      height: '200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '50%'
    },
    '& .iconButton': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
  }
}))

export default function UserInfoForm() {
  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const profile = useAppSelector((state => state.firebase.profile))
  const [userInfo, setUserInfo] = useState(profile)
  const styles = useStyles()
  const dispatch = useAppDispatch()

  // todo: fix uncontrolled input warning
  useEffect(() => {
    if (profile.isLoaded) {
      setUserInfo({
        ...profile
      })
    }
  }, [profile])

  const applyChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(updateUserInfo(userInfo))
  }

  const onChange = (e: { target: { name: string; value: string } }) => [
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  ]

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.item(0)
    if (selectedImage) {
      // dispatch an action to upload image on firestore storage
      dispatch(updateProfileImage(selectedImage))
    } else {
      console.log('No file selected!')
    }
  }

  const handleEditPicture = () => {
    const fileInput = profileImageInputRef.current
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
      <Box my={3}>
        <Paper variant="outlined">
          <Box my={2} mx={3}>
            {profile.isLoaded ? (
              <form onSubmit={applyChanges}>
                <div className={styles.profileImageWrapper}>
                  <img src={profile.photoURL ?
                    profile.photoURL :
                    DEFAULT_USER_PROFILE_PICTURE} alt="Profile pic" />
                  <input
                    type="file"
                    hidden={true}
                    ref={profileImageInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <Tooltip title="Change profile picture" placement="top">
                    <IconButton
                      onClick={handleEditPicture}
                      className="iconButton"
                    >
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </div>
                <TextField
                  autoFocus
                  margin="dense"
                  name="fname"
                  label="First Name"
                  type="text"
                  fullWidth
                  required
                  onChange={onChange}
                  value={userInfo.fname}
                />
                <TextField
                  margin="dense"
                  name="sname"
                  label="Second Name"
                  type="text"
                  fullWidth
                  required
                  onChange={onChange}
                  value={userInfo.sname}
                />
                <TextField
                  margin="dense"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  onChange={onChange}
                  value={userInfo.dob}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  margin="dense"
                  name="location"
                  label="Location"
                  type="text"
                  fullWidth
                  onChange={onChange}
                  value={userInfo.location}
                />
                <TextField
                  margin="dense"
                  name="bio"
                  label="Biography"
                  type="text"
                  multiline
                  minRows="4"
                  fullWidth
                  onChange={onChange}
                  value={userInfo.bio}
                />
                <Box display="flex" justifyContent="center" mt={1}>
                  <Button type="submit" variant="contained" color="secondary">
                    Apply Changes
                  </Button>
                </Box>
              </form>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Paper>
      </Box>
  )
}
