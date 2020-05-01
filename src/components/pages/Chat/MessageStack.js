import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Message from './Message'

const useStyles = makeStyles((theme) => ({
  ...theme.spreddable,
  messageStackWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'auto', // message stack has it's own scroll bar
    padding: '16px',
    '& li': {
      'list-style-type': 'none'
    }
  }
}))

const MessageStack = ({ anchorID }) => {
  const styles = useStyles()
  return (
    <div className={styles.messageStackWrapper}>
      {[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10].map((x, index) => {
        return (
          <div id={index === 0 ? anchorID : undefined}>
            <Message />
          </div>
        )
      })}
    </div>
  )
}

MessageStack.propTypes = {
  anchorID: PropTypes.string.isRequired
}

export default MessageStack
