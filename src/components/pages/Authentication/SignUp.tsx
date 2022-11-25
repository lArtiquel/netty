import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import { Field, Form, Formik, FormikProps } from 'formik'
// @ts-ignore
import * as Yup from 'yup'
import { signUp } from '../../../store/async-actions/AuthActions'
import CoolButton, { Color } from '../../CoolButton'
import Dialog from '../../Dialog'
import UserInfo from '../../../types/UserInfo'
import { UserCredential } from '../../../types/UserCredential'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { AuthActions, selectAuth } from '../../../store/slice/AuthSlice'


export interface NewUser extends UserInfo, UserCredential {}

const SignUp = () => {
  const formRef = useRef<FormikProps<UserCredential>>(null)
  const {authError, isSignUpOpened} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    // on success it'll automatically close dialog and clear error state
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const handleClose = () => {
    // close dialog
    dispatch(AuthActions.closeSignUpForm())
    // reset form fields to initial state
    if (formRef.current) {
      formRef.current.resetForm()
    }
  }

  const resolveBody = () => {
    return (
      <Formik
        /* @ts-ignore */
        innerRef={formRef}
        initialValues={{
          email: '',
          password: '',
          fname: '',
          sname: '',
          dob: '',
          location: '',
          bio: ''
        } as NewUser}
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
      <CoolButton color={Color.BLUE} onClick={() => dispatch(AuthActions.openSignUpForm())}>
        Sign Up
      </CoolButton>

      {isSignUpOpened && (
        <Dialog
          title="Please, Sign Up"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialog={() => dispatch(AuthActions.closeSignUpForm())}
        />
      )}
    </>
  )
}

export default SignUp
