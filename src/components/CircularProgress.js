import React from 'react'
import MaterialUICircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function CircularProgress() {
  const styles = useStyles()

  return (
    <div className={styles.centered}>
      <MaterialUICircularProgress />
    </div>
  )
}
