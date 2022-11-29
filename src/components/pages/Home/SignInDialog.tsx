import React, { useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
// @ts-ignore
import * as Yup from 'yup'
import Dialog from '../../Dialog'
import { UserCredential } from '../../../types/UserCredential'
import { useFirebase } from 'react-redux-firebase'

interface SignInDialogProps {
  closeCallback: () => void
}

export default function SignInDialog({ closeCallback }: SignInDialogProps) {
  const formRef = useRef<FormikProps<UserCredential>>(null)
  const [authError, setAuthError] = useState<string>('')
  const firebase = useFirebase()

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const closeDialog = () => {
    // close dialog
    closeCallback()
    // clean form fields
    if (formRef.current) {
      formRef.current.resetForm()
    }
  }

  const signInAction = async (
    credentials: UserCredential,
    actions: FormikHelpers<UserCredential>
  ) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
      // reset form fields to initial state
      actions.resetForm()
      closeCallback()
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Failed to sign in!')
    }
  }

  const resolveBody = () => {
    return (
      <Formik
        /* @ts-ignore */
        innerRef={formRef}
        initialValues={{ email: '', password: '' } as UserCredential}
        onSubmit={signInAction}
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
    <Dialog
      title="Please, Sign In"
      body={resolveBody()}
      buttons={resolveButtons()}
      closeDialog={closeDialog}
    />
  )
}
