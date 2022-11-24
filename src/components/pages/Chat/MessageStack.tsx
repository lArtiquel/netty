import React, { MutableRefObject, useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from '../../InfiniteScroll'
import CircularProgress from '../../CircularProgress'
import Message from './Message'
import { useFirestore } from 'react-redux-firebase'
import { CHAT_COLLECTION_NAME, ChatMessage, NETTY_GLOBAL_CHAT_NAME } from '../../../types/ChatCollection'
import { ChatConfig } from '../../../config/AppConfig'
import UIMessage from '../../../types/UIMessage'
import { DocumentChange, DocumentSnapshot } from '@firebase/firestore-types'
import UserInfo, { USERINFO_COLLECTION_NAME } from '../../../types/UserInfo'
import { QueryDocumentSnapshot, DocumentData } from '@firebase/firestore-types'

const useStyles = makeStyles(() => createStyles({
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
  const firestore = useFirestore()

  const universalMessageFetchingQuery = firestore
    .collection(CHAT_COLLECTION_NAME)
    .doc(NETTY_GLOBAL_CHAT_NAME)
    .collection('messages')
    .orderBy('createdAt', 'desc')

  const [messages, setMessages] = useState<UIMessage[]>([])
  const [isFirstBatchLoading, setFirstBatchLoading] = useState<boolean>(true)
  const [isBatchMsgsLoading, setBatchMsgsLoading] = useState<boolean>(false)
  const [hasMoreMsgs, setHasMoreMsgs] = useState<boolean>(false)

  /**
   * Fetch additional params to transform ChatMessage entity => UIMessage.
   * Push result to message array.
   *
   * @param msgDoc current message doc
   * @param newMessages array of UIMessages
   */
  async function fetchAdditionalUIMessageParamsAndPushToMessageArray(msgDoc: QueryDocumentSnapshot<DocumentData>, newMessages: UIMessage[]) {
    const msg = msgDoc.data() as ChatMessage
    const userInfoDoc = await firestore
      .collection(USERINFO_COLLECTION_NAME)
      .doc(msg.userId)
      .get() as DocumentSnapshot<UserInfo>
    const userInfo = userInfoDoc.data()
    newMessages.push({
      ...msg,
      id: msgDoc.id,
      fname: userInfo?.fname || 'Somebody',
      sname: userInfo?.sname || 'Unknown',
      photoURL: userInfo?.photoURL || ''
    })
  }

  /**
   * Trigger to load more messages
   */
  const loadMoreMessages = async () => {
    try {
      setBatchMsgsLoading(true)

      const queryWithOffset = isFirstBatchLoading ?
        universalMessageFetchingQuery :
        universalMessageFetchingQuery
          .startAfter(await firestore
            .collection(CHAT_COLLECTION_NAME)
            .doc(NETTY_GLOBAL_CHAT_NAME)
            .collection('messages')
            .doc(messages[messages.length - 1].id)
            .get() as DocumentSnapshot<ChatMessage>)

      const newMessages: UIMessage[] = []

      const docMsgsCollection = await queryWithOffset
        .limit(ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
        .get()

      // loop thru docMsgs, get userInfo and push in array(note: loop executes sequentially)
      for (const msgDoc of docMsgsCollection.docs) {
        await fetchAdditionalUIMessageParamsAndPushToMessageArray(msgDoc, newMessages)
      }

      setMessages(messages.concat(newMessages))
      setHasMoreMsgs(newMessages.length === ChatConfig.LOAD_MORE_MESSAGES_BATCH_SIZE)
      setFirstBatchLoading(false)
    } catch (error) {
      // todo open error dialog
      // state.modal.isOpen = true
      // state.modal.title = 'Connection error'
      // state.modal.message = 'You can not reach the top without connection. Check internet connection and come back later.'
    } finally {
      setBatchMsgsLoading(false)
    }
  }

  useEffect(() => {
    // load first batch of messages
    (async () => await loadMoreMessages())()
    // subscribe to new messages
    const subscriptionHandle = universalMessageFetchingQuery
      .limit(1)
      .onSnapshot(
        async (snapshot) => {
          const newMessages: UIMessage[] = []
          const changes = snapshot.docChanges() as Array<DocumentChange<ChatMessage>>

          for (const change of changes) {
            if (change.type === 'added') {
              await fetchAdditionalUIMessageParamsAndPushToMessageArray(change.doc, newMessages)
            }
          }

          setMessages(m => newMessages.concat(m))
        },
        (error) => console.log(error.message)
      )
    return () => subscriptionHandle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const endMessage = (
    <div style={{ textAlign: 'center' }}>
      <p>Yay! You have seen them all!</p>
    </div>
  )

  return (
    <>
      {isFirstBatchLoading ? (
        <div className={styles.messageStackWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <InfiniteScroll
          hasMore={hasMoreMsgs}
          loadMore={loadMoreMessages}
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
