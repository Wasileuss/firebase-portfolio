import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'

import './scss/style.scss'
import '@fontsource/montserrat'
import AuthProvider from './components/auth/Auth.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <RouterProvider future={{ v7_startTransition: true }} router={Router} />,
  </AuthProvider>,
)
