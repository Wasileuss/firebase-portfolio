import { useContext } from 'react'
import AuthContext from '../components/auth/authContext.js'

export function useAuth() {
  return useContext(AuthContext)
}
