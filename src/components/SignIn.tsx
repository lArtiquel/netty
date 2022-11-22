import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import { Field, Form, Formik, FormikProps } from 'formik'
// @ts-ignore
import * as Yup from 'yup'
import { signIn } from '../store/async-actions/AuthActions'
import CoolButton, { Color } from './CoolButton'
import Dialog from './Dialog'
import { UserCredential } from '../types/UserCredential'
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks'
import { AuthActions, selectAuth } from '../store/slice/AuthSlice'

export default function SignIn() {
  const formRef = useRef<FormikProps<UserCredential>>(null)
  const {authError, isSignInOpened} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const closeDialog = () => {
    // close dialog
    dispatch(AuthActions.closeSignInForm())
    // clean form fields
    if (formRef.current) {
      formRef.current.resetForm()
    }
  }

  const resolveBody = () => {
    return (
      <Formik
        /* @ts-ignore */
        innerRef={formRef}
        initialValues={
          { email: '', password: '' } as UserCredential
        }
        onSubmit={(values, actions) => {
          // on success it'll automatically close dialog and clear error state, else it'll keep dialog opened with error
          dispatch(signIn(values))
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
            {authError && <Alert severity="error">{authError}</Alert>}
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
      <CoolButton color={Color.RED} onClick={() => dispatch(AuthActions.openSignInForm())}>
        Sign In
      </CoolButton>

      {isSignInOpened && (
        <Dialog
          title="Please, Sign In"
          body={resolveBody()}
          buttons={resolveButtons()}
          closeDialog={() => dispatch(AuthActions.closeSignInForm())}
        />
      )}
    </>
  )
}
