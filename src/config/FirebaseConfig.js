import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export const firebaseConfig = {
  apiKey: 'AIzaSyBV7ydZBOmuD8atUaq-xwhEgMQhAo1nNZU',
  authDomain: 'netty-chat.firebaseapp.com',
  databaseURL: 'https://netty-chat.firebaseio.com',
  projectId: 'netty-chat',
  storageBucket: 'netty-chat.appspot.com',
  messagingSenderId: '615778194059',
  appId: '1:615778194059:web:53c60205c0a54dafae7a8e',
  measurementId: 'G-NKGE441Y57'
}

// Initialize firebase instance
const firebase = firebaseApp.initializeApp(firebaseConfig)
// Initialize other services on firebase instance
firebase.firestore() // <- initializing firestore (needed if using firestore)
firebase.storage()
// firebase.functions() // <- needed if using custom functions

export default firebase
