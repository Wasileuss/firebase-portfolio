import { auth } from './firebaseConfig.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const doSignOut = () => {
  return auth.signOut()
}
