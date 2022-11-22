import React, { ReactNode } from 'react'
import MUIDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

interface DialogProps {
  title: ReactNode
  body: ReactNode
  buttons: ReactNode
  closeDialog: () => void
}

const Dialog = ({ title, body, buttons, closeDialog }: DialogProps) => {
  const theme = useTheme()
  // for devices with screen size less than 'sm' show fullscreen dialog
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    closeDialog()
  }

  return (
    <MUIDialog
      open={true}
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

export default Dialog
