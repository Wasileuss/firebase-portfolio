import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import Home from "../components/client/About.jsx"
import ErrorPage from "../pages/404"
import Admin from "../components/admin/Admin.jsx"
import Projects from "../components/client/Projects.jsx"
import Courses from "../components/client/Courses.jsx";
import AddImages from "../components/client/AddImages/AddImages.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "courses",
                element: <Courses />
            },
            {
                path: "admin",
                element: <Admin />
            },
            {
                path: "images",
                element: <AddImages />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
])

export default Router