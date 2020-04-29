import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import { modifyUserInfoAction } from '../../../store/actions/profileActions'

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  profileImageWrapper: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '140px',
    maxHeight: '140px',
    borderRadius: '50%',
    margin: '10px 10px 20px 10px',
    position: 'relative',
    '& .iconButton': {
      position: 'absolute',
      top: '80%',
      left: '70%'
    }
  }
}))

const INITIAL_STATE = {
  fname: '',
  sname: '',
  dob: '',
  location: '',
  bio: ''
}

const UserInfoForm = ({ auth, profileInfo, modifyUserInfo }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE)
  const styles = useStyles()

  useEffect(() => {
    if (profileInfo) {
      setUserInfo(profileInfo[auth.uid])
    }
  }, [profileInfo])

  const applyChanges = (e) => {
    e.preventDefault()
    // dispatchin' an Redux action
    modifyUserInfo(userInfo)
  }

  const onChange = (e) => [
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  ]

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0]
    console.log(selectedImage)
    // const formData = new FormData()
    // formData.append('image', selectedImage, selectedImage.name)
    // dispatch an action to upload image on firestore storage
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('profileImageInput')
    fileInput.click()
  }

  return (
    <Box my={3}>
      <Paper variant="outlined">
        <Box my={2} mx={3}>
          {profileInfo ? (
            <form onSubmit={applyChanges}>
              <div className={styles.profileImageWrapper}>
                <img
                  src={`${process.env.PUBLIC_URL}img/netty.png`}
                  alt="Here should be a profile pic"
                />
                <input
                  type="file"
                  hidden="hidden"
                  id="profileImageInput"
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
                rows="4"
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

UserInfoForm.propTypes = {
  auth: PropTypes.object.isRequired,
  profileInfo: PropTypes.object,
  modifyUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profileInfo: state.firestore.data.userInfo
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    modifyUserInfo: (newUserInfo) => dispatch(modifyUserInfoAction(newUserInfo))
  }
}

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  firestoreConnect(({ auth }) => [{ collection: 'userInfo', doc: auth.uid }])
)(UserInfoForm)
