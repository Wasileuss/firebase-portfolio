// import { createBrowserRouter } from "react-router-dom"
// import Layout from "../pages/Layout"
// import Home from "../components/client/About.jsx"
// import ErrorPage from "../pages/404"
// import Admin from "../components/admin/Admin.jsx"
// import Projects from "../components/client/Projects.jsx"
// import Courses from "../components/client/Courses.jsx"
//
// const Router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 index: true,
//                 element: <Home />
//             },
//             {
//                 path: "projects",
//                 element: <Projects />
//             },
//             {
//                 path: "courses",
//                 element: <Courses />
//             },
//             {
//                 path: "admin",
//                 element: <Admin />
//             }
//         ]
//     },
//     {
//         path: "*",
//         element: <ErrorPage />
//     }
// ])
//
// export default Router


import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../components/client/About";
import ErrorPage from "../pages/404";
import Admin from "../components/admin/Admin";
import Projects from "../components/client/Projects";
import Courses from "../components/client/Courses";
import ProtectedRoute from "../router/ProtectedRoute.jsx";
import { AuthProvider } from "../components/admin/Auth.jsx";
import Login from "../pages/Login";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider><Layout /></AuthProvider>,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "projects", element: <Projects /> },
            { path: "courses", element: <Courses /> },
            {
                path: "admin",
                element: <ProtectedRoute />,
                children: [{ index: true, element: <Admin /> }]
            }
        ]
    },
    { path: "/login", element: <AuthProvider><Login /></AuthProvider> }, // Обгортаємо Login в AuthProvider!
    { path: "*", element: <ErrorPage /> }
]);

export default Router;
