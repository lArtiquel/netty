import React, { useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  openSignUpFormAction,
  signUpAction,
  closeSignUpFormAction
} from '../store/actions/authActions'
import CoolButton from './CoolButton'
import Dialog from './Dialog'

const SignUp = ({
  isSignUpOpened,
  openSignUpForm,
  closeSignUpForm,
  signUp,
  authError
}) => {
  const formRef = useRef(null)

  const handleSubmit = () => {
    // on success it'll automatically close dialog and clear error state
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const handleClose = () => {
    // close dialog
    closeSignUpForm()
    // reset form fields to initial state
    if (formRef.current) {
      formRef.current.resetForm()
    }
  }

  const resolveBody = () => {
    return (
      <Formik
        innerRef={formRef}
        initialValues={{
          email: '',
          password: '',
          fname: '',
          sname: '',
          dob: '',
          location: '',
          bio: ''
        }}
        onSubmit={(values, actions) => {
          // on success it'll automatically close dialog and clear error state, else it'll keep dialog opened with error
          signUp(values)
          // clear `errorness` fields
          actions.setFieldValue('password', '')
          actions.setTouched({ password: false })
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email!')
            .max(255, 'Too long email!')
            .required('Please, enter your email!'),
          password: Yup.string()
            .min(6, 'Password is too short!')
            .max(255, 'Password is too long!')
            .required('Please, enter your password!'),
          fname: Yup.string().required('Please, enter your first name!'),
          sname: Yup.string().required('Please, enter your second name!')
        })}
        validateOnChange
        validateOnBlur
      >
        {({ errors, touched }) => (
          <Form>
            <Box mb={2} borderRadius={8} boxShadow={4}>
              <Box px={2} py={1}>
                <Typography align="center" gutterBottom>
                  Type your credentials
                </Typography>
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
              </Box>
            </Box>

            {authError ? <Alert severity="error">{authError}</Alert> : null}

            <Box mt={2} borderRadius={8} boxShadow={4}>
              <Box px={2} py={1}>
                <Typography align="center" gutterBottom>
                  Type your personal info
                </Typography>
                <Field
                  as={TextField}
                  name="fname"
                  label="First Name"
                  margin="dense"
                  fullWidth
                  error={errors.fname && touched.fname}
                  helperText={errors.fname && touched.fname ? errors.fname : ''}
                />
                <Field
                  as={TextField}
                  name="sname"
                  label="Second Name"
                  margin="dense"
                  fullWidth
                  error={errors.sname && touched.sname}
                  helperText={errors.sname && touched.sname ? errors.sname : ''}
                />
                <Field
                  as={TextField}
                  name="dob"
                  label="Date of birth"
                  type="date"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
                <Field
                  as={TextField}
                  name="location"
                  label="Location"
                  margin="dense"
                  fullWidth
                />
                <Field
                  as={TextField}
                  name="bio"
                  label="Tell us about yourself"
                  margin="dense"
                  fullWidth
                  multiline
                  rows="5"
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    )
  }

  const resolveButtons = () => {
    return (
      <>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Sign Up
        </Button>
      </>
    )
  }

  return (
    <>
      <CoolButton color="blue" onClick={openSignUpForm}>
        Sign Up
      </CoolButton>

      {isSignUpOpened && (
        <Dialog
          title="Please, Sign Up"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialogInState={closeSignUpForm}
        />
      )}
    </>
  )
}

SignUp.propTypes = {
  isSignUpOpened: PropTypes.bool.isRequired,
  openSignUpForm: PropTypes.func.isRequired,
  closeSignUpForm: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    isSignUpOpened: state.auth.isSignUpOpened,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSignUpForm: () => dispatch(openSignUpFormAction()),
    signUp: (newUser) => dispatch(signUpAction(newUser)),
    closeSignUpForm: () => dispatch(closeSignUpFormAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

// import React, { useState, useRef } from 'react'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import Box from '@material-ui/core/Box'
// import Typography from '@material-ui/core/Typography'
// import Alert from '@material-ui/lab/Alert'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import {
//   openSignUpFormAction,
//   signUpAction,
//   closeSignUpFormAction
// } from '../store/actions/authActions'
// import CoolButton from './CoolButton'
// import Dialog from './Dialog'

// const INITIAL_FORM_STATE = {
//   email: '',
//   password: '',
//   fname: '',
//   sname: '',
//   dob: '',
//   location: '',
//   bio: ''
// }

// const SignUp = ({
//   isSignUpOpened,
//   openSignUpForm,
//   closeSignUpForm,
//   signUp,
//   authError
// }) => {
//   const [form, setForm] = useState(INITIAL_FORM_STATE)
//   const formRef = useRef(null)

//   const closeAndCleanUp = () => {
//     // close dialog
//     closeSignUpForm()
//     // set form to init state
//     setForm(INITIAL_FORM_STATE)
//   }

//   const handleClose = () => {
//     closeAndCleanUp()
//   }

//   const triggerSubmit = () => {
//     formRef.current.submit()
//   }

//   const handleSubmit = (e) => {
//     // prevent page reloading with query params
//     e.preventDefault()
//     // on success it'll automatically close dialog and clear error state
//     signUp(form)
//   }

//   const handleFormChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })
//   }

//   const resolveBody = () => {
//     return (
//       <form onSubmit={handleSubmit} ref={formRef}>
//         <Box mb={2} borderRadius={8} boxShadow={4}>
//           <Box px={2} py={1}>
//             <Typography align="center" gutterBottom>
//               Type your credentials
//             </Typography>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="email"
//               label="Email"
//               type="email"
//               fullWidth
//               required
//               onChange={handleFormChange}
//               value={form.email}
//             />
//             <TextField
//               margin="dense"
//               name="password"
//               label="Password"
//               type="password"
//               fullWidth
//               inputProps={{ minLength: 6 }}
//               required
//               onChange={handleFormChange}
//               value={form.password}
//             />
//           </Box>
//         </Box>

//         {authError ? <Alert severity="error">{authError}</Alert> : null}

//         <Box mt={2} borderRadius={8} boxShadow={4}>
//           <Box px={2} py={1}>
//             <Typography align="center" gutterBottom>
//               Type your personal info
//             </Typography>
//             <TextField
//               margin="dense"
//               name="fname"
//               label="First Name"
//               type="text"
//               fullWidth
//               required
//               onChange={handleFormChange}
//               value={form.fname}
//             />
//             <TextField
//               margin="dense"
//               name="sname"
//               label="Second Name"
//               type="text"
//               fullWidth
//               required
//               onChange={handleFormChange}
//               value={form.sname}
//             />
//             <TextField
//               margin="dense"
//               name="dob"
//               label="Date of Birth"
//               type="date"
//               required
//               onChange={handleFormChange}
//               value={form.dob}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               margin="dense"
//               name="location"
//               label="Location"
//               type="text"
//               fullWidth
//               onChange={handleFormChange}
//               value={form.location}
//             />
//             <TextField
//               margin="dense"
//               name="bio"
//               label="Tell me about yourself"
//               type="text"
//               multiline
//               rows="4"
//               fullWidth
//               onChange={handleFormChange}
//               value={form.bio}
//             />
//           </Box>
//         </Box>
//       </form>
//     )
//   }

//   const resolveButtons = () => {
//     return (
//       <>
//         <Button variant="contained" onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button variant="contained" onClick={triggerSubmit} color="primary">
//           Sign Up
//         </Button>
//       </>
//     )
//   }

//   return (
//     <>
//       <CoolButton color="blue" onClick={openSignUpForm}>
//         Sign Up
//       </CoolButton>

//       {isSignUpOpened && (
//         <Dialog
//           title="Please, Sign Up"
//           body={resolveBody()}
//           buttons={resolveButtons()}
//           closeDialogInState={closeSignUpForm}
//         />
//       )}
//     </>
//   )
// }

// SignUp.propTypes = {
//   isSignUpOpened: PropTypes.bool.isRequired,
//   openSignUpForm: PropTypes.func.isRequired,
//   closeSignUpForm: PropTypes.func.isRequired,
//   signUp: PropTypes.func.isRequired,
//   authError: PropTypes.string.isRequired
// }

// const mapStateToProps = (state) => {
//   return {
//     isSignUpOpened: state.auth.isSignUpOpened,
//     authError: state.auth.authError
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     openSignUpForm: () => dispatch(openSignUpFormAction()),
//     signUp: (newUser) => dispatch(signUpAction(newUser)),
//     closeSignUpForm: () => dispatch(closeSignUpFormAction())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
