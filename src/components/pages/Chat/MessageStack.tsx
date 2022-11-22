import React, { MutableRefObject, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from '../../InfiniteScroll'
import CircularProgress from '../../CircularProgress'
import Message from './Message'
import { loadMoreMessages, subscribeToLastMessages } from '../../../store/async-actions/ChatActions'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { ChatActions } from '../../../store/slice/ChatSlice'

const useStyles = makeStyles((theme) => createStyles({
  messageStackWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'auto', // message stack has it's own scroll bar
    padding: '16px'
  }
}))

interface MessageStackProps {
  anchor: MutableRefObject<HTMLDivElement | null>
}

export default function MessageStack({ anchor }: MessageStackProps) {
  const styles = useStyles()

  const messages = useAppSelector(state => state.chat.messages)
  const hasMoreMsgs = useAppSelector(state => state.chat.hasMoreMsgs)
  const isFirstMsgsLoading = useAppSelector(state => state.chat.isFirstMsgsLoading)
  const isBatchMsgsLoading = useAppSelector(state => state.chat.isBatchMsgsLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(subscribeToLastMessages())
    return () => { dispatch(ChatActions.cancelSubscription()) }
  }, [dispatch])

  const endMessage = (
    <div style={{ textAlign: 'center' }}>
      <p>Yay! You have seen them all!</p>
    </div>
  )

  return (
    <>
      {isFirstMsgsLoading ? (
        <div className={styles.messageStackWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <InfiniteScroll
          hasMore={hasMoreMsgs}
          loadMore={() => dispatch(loadMoreMessages())}
          isLoading={isBatchMsgsLoading}
          loader={<CircularProgress />}
          endMessage={endMessage}
          threshold={0.85}
          materialStyle={styles.messageStackWrapper}
        >
          {messages.length &&
            messages.map((message, index) => (
              <div key={message.id} ref={!index ? anchor : undefined}>
                <Message message={message} />
              </div>
            ))}
        </InfiniteScroll>
      )}
    </>
  )
}
