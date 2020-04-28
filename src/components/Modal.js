import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import PropTypes from 'prop-types'
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

const MyModal = ({ isOpen, title, message, closeModalInState }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(isOpen)

  const handleClose = () => {
    closeModalInState()
    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            <p id="transition-modal-description">{message}</p>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Okay
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

MyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeModalInState: PropTypes.func.isRequired
}

export default MyModal
