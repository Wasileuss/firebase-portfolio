import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../../firebaseConfig.js"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Додаємо стан завантаження

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false) // Завантаження завершено
    })

    return () => unsubscribe()
  }, [])

  const login = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Помилка входу:", error)
    }
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
        window.location.href = "/"
      })
      .catch((error) => console.error("Помилка виходу:", error))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
