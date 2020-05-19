import React from 'react'
import Button from '@material-ui/core/Button'
import MUIDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  textCentered: {
    textAlign: 'center'
  }
}))

const Dialog = ({ title, body, closeDialogInState }) => {
  const styles = useStyles()
  const theme = useTheme()
  // for devices with screen size less than 'sm' show fullscreen dialog
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    closeDialogInState()
  }

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" disableTypography>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          autoFocus
          onClick={handleClose}
          color="secondary"
        >
          Close
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

Dialog.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  closeDialogInState: PropTypes.func
}

export default Dialog
