import React from 'react'
import ReactDOM from "react-dom/client"
import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'

import './scss/style.scss'
import '@fontsource/montserrat'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={Router} />)
