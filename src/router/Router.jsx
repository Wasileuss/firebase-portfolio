import { createBrowserRouter} from 'react-router-dom'
import Layout from "../pages/Layout";
import Home from "../components/client/About";
import ErrorPage from "../pages/404";
import Admin from "../components/admin/Admin";
import Projects from "../components/client/Projects";
import Courses from "../components/client/Courses";
import { AuthProvider } from '../components/admin/Auth.jsx';
import Login from "../components/admin/Login.jsx";
import ProtectedRoute from './ProtectedRoute.jsx'

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
          <AuthProvider>
              <Layout />
          </AuthProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "projects", element: <Projects /> },
            { path: "courses", element: <Courses /> },
            {
                path: "admin",
                element: (
                  <AuthProvider>
                      <ProtectedRoute />
                  </AuthProvider>
                ),
                children: [{ index: true, element: <Admin /> }]
            }
        ]
    },
    {
        path: "/login",
        element: (
          <AuthProvider>
              <Login />
          </AuthProvider>
        )
    },
    { path: "*", element: <ErrorPage /> }
]);

export default Router;
