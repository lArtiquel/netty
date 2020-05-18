import React from 'react'
import MaterialUICircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  centered: {
    height: '100%',
    padding: '8px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function CircularProgress() {
  const styles = useStyles()

  return (
    <div className={styles.centered}>
      <MaterialUICircularProgress disableShrink />
    </div>
  )
}
