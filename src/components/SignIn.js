import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  openSignInFormAction,
  signInAction,
  closeSignInFormAction
} from '../store/actions/authActions'
import CoolButton from './CoolButton'
import Dialog from './Dialog'

function SignIn({
  isSignInOpened,
  openSignInForm,
  closeSignInForm,
  signIn,
  authError
}) {
  const formRef = useRef(null)

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const closeDialog = () => {
    // close dialog
    closeSignInForm()
    // clean form fields
    if (formRef.current) {
      formRef.current.resetForm()
    }
  }

  const resolveBody = () => {
    return (
      <Formik
        innerRef={formRef}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          // on success it'll automatically close dialog and clear error state, else it'll keep dialog opened with error
          signIn(values)
          // reset form fields to initial state
          actions.resetForm()
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email!')
            .max(255, 'Too long email!')
            .required('Please, enter your email!'),
          password: Yup.string()
            .min(6, 'We are not dealing with such short passwords!')
            .max(255, 'Password is too long!')
            .required('Please, enter your password!')
        })}
        validateOnChange
        validateOnBlur
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              autoFocus
              margin="dense"
              fullWidth
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? errors.email : ''}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              margin="dense"
              fullWidth
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password ? errors.password : ''
              }
            />
            {authError ? <Alert severity="error">{authError}</Alert> : null}
          </Form>
        )}
      </Formik>
    )
  }

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={closeDialog} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Sign In
        </Button>
      </>
    )
  }

  return (
    <>
      <CoolButton color="red" onClick={openSignInForm}>
        Sign In
      </CoolButton>

      {isSignInOpened && (
        <Dialog
          title="Please, Sign In"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialogInState={closeSignInForm}
        />
      )}
    </>
  )
}

SignIn.propTypes = {
  isSignInOpened: PropTypes.bool.isRequired,
  openSignInForm: PropTypes.func.isRequired,
  closeSignInForm: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignInOpened: state.auth.isSignInOpened,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSignInForm: () => dispatch(openSignInFormAction()),
    signIn: (creds) => dispatch(signInAction(creds)),
    closeSignInForm: () => dispatch(closeSignInFormAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

// import React, { useState, useRef } from 'react'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import Alert from '@material-ui/lab/Alert'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import {
//   openSignInFormAction,
//   signInAction,
//   closeSignInFormAction
// } from '../store/actions/authActions'
// import CoolButton from './CoolButton'
// import Dialog from './Dialog'

// function SignIn({
//   isSignInOpened,
//   openSignInForm,
//   closeSignInForm,
//   signIn,
//   authError
// }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const formRef = useRef(null)

//   const closeAndCleanUp = () => {
//     // close dialog
//     closeSignInForm()
//     // clean form fields
//     setEmail('')
//     setPassword('')
//   }

//   const triggerSubmit = () => {
//     formRef.current.submit()
//   }

//   const handleSubmit = (e) => {
//     // prevent default from submission
//     e.preventDefault()
//     // on success it'll automatically close dialog and clear error state, elte it'll keep dialog opened with error
//     signIn({ email, password })
//   }

//   const closeDialog = () => {
//     closeAndCleanUp()
//   }

//   const resolveBody = () => {
//     return (
//       <form onSubmit={handleSubmit} ref={formRef}>
//         <TextField
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           autoFocus
//           margin="dense"
//           id="email"
//           label="Email"
//           type="email"
//           fullWidth
//           inputProps={{ maxLength: 255 }}
//           required
//         />
//         <TextField
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           margin="dense"
//           id="password"
//           label="Password"
//           type="password"
//           fullWidth
//           inputProps={{ minLength: 6, maxLength: 255 }}
//           required
//         />

//         {authError ? <Alert severity="error">{authError}</Alert> : null}
//       </form>
//     )
//   }

//   const resolveButtons = () => {
//     return (
//       <>
//         <Button variant="contained" onClick={closeDialog} color="secondary">
//           Cancel
//         </Button>
//         <Button variant="contained" onClick={triggerSubmit} color="primary">
//           Sign In
//         </Button>
//       </>
//     )
//   }

//   return (
//     <>
//       <CoolButton color="red" onClick={openSignInForm}>
//         Sign In
//       </CoolButton>

//       {isSignInOpened && (
//         <Dialog
//           title="Please, Sign In"
//           body={resolveBody()}
//           buttons={resolveButtons()}
//           closeDialogInState={closeSignInForm}
//         />
//       )}
//     </>
//   )
// }

// SignIn.propTypes = {
//   isSignInOpened: PropTypes.bool.isRequired,
//   openSignInForm: PropTypes.func.isRequired,
//   closeSignInForm: PropTypes.func.isRequired,
//   signIn: PropTypes.func.isRequired,
//   authError: PropTypes.string.isRequired
// }

// const mapStateToProps = (state) => {
//   return {
//     isSignInOpened: state.auth.isSignInOpened,
//     authError: state.auth.authError
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     openSignInForm: () => dispatch(openSignInFormAction()),
//     signIn: (creds) => dispatch(signInAction(creds)),
//     closeSignInForm: () => dispatch(closeSignInFormAction())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
