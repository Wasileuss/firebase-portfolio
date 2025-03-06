import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Layout from '../pages/Layout'
import Home from '../components/client/About'
import ErrorPage from '../pages/404'
import Admin from '../components/admin/Admin'
import Projects from '../components/client/Projects'
import Courses from '../components/client/Courses'
import Login from '../components/auth/Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Contact from '../components/client/Contact.jsx'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="courses" element={<Courses />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<ProtectedRoute />}>
          <Route index element={<Admin />} />
        </Route>
      </Route>
      ,
      <Route path="/login" element={<Login />} />,
      <Route path="*" element={<ErrorPage />} />,
    </>,
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
)

export default Router
