import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../../firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = React.createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [isEmailUser, setIsEmailUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, initializeUser)
  }, [])

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user })

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === 'password',
      )
      setIsEmailUser(isEmail)

      setUserLoggedIn(true)
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
    }

    setLoading(false)
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    setCurrentUser,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
