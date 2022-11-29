import firebase from 'firebase'

export const CHAT_COLLECTION_NAME = 'chats'
export const NETTY_GLOBAL_CHAT_NAME = 'Netty-global'

export interface ChatMessage {
  userId: string
  body: string
  createdAt: firebase.firestore.Timestamp | null
}

export interface ChatMeta {
  heroImage: string
  memCount: number
  title: string
}

/**
 * Type represents chat entity collection structure.
 */
export default interface ChatCollection {
  id: {
    messages: {
      id: ChatMessage
    }
    metaInfo: {
      id: ChatMeta
    }
  }
}
