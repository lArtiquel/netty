import UserInfo from './UserInfo'
import { ChatMessage } from './ChatCollection'

export default interface UIMessage extends ChatMessage {
  id: string // id of the chat message
  // some user data fields
  fname: string
  sname: string
  photoURL: string
}
