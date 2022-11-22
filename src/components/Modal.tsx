import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

interface CustomModalProps  {
  title: ReactNode
  message: ReactNode,
  closeModal: () => void
}

const CustomModal = ({ title, message, closeModal } : CustomModalProps) => {
  const classes = useStyles()

  const handleClose = () => {
    closeModal()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            <p id="transition-modal-description">{message}</p>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default CustomModal
