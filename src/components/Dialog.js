import React from 'react'
import MUIDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

// that's just Dialog's skeleton
const Dialog = ({ title, body, buttons, closeDialogInState }) => {
  const theme = useTheme()
  // for devices with screen size less than 'sm' show fullscreen dialog
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    closeDialogInState()
  }

  return (
    <MUIDialog
      open
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" disableTypography>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </MUIDialog>
  )
}

Dialog.propTypes = {
  title: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  buttons: PropTypes.node.isRequired,
  closeDialogInState: PropTypes.func.isRequired
}

export default Dialog
