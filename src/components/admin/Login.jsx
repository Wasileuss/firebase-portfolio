import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../../firebaseAuth.js'
import { useAuth } from './Auth.jsx'

const Login = () => {
  const { userLoggedIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const getCustomErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Incorrect login details."
      case "auth/invalid-email":
        return "Invalid email format."
      case "auth/user-not-found":
        return "User not found."
      case "auth/wrong-password":
        return "Incorrect password."
      case "auth/email-already-in-use":
        return "This email address is already in use."
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later."
      default:
        return "An unknown error has occurred. Please try again."
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      setErrorMessage("")

      try {
        await doSignInWithEmailAndPassword(email, password)
      } catch (error) {
        setErrorMessage(getCustomErrorMessage(error.code))
      } finally {
        setIsSigningIn(false)
      }
    }
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/admin'} replace={true} />)}
      <div className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <div>
              <label className="text-sm text-gray-600 font-bold">
                Email
              </label>
              <input
                type="email"
                autoComplete='email'
                required
                value={email} onChange={(e) => { setEmail(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <input
                type="password"
                autoComplete='current-password'
                required
                value={password} onChange={(e) => { setPassword(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className='text-red-600 font-bold'>{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
