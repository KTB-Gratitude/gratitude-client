// project import
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"
import Layout from "../views/dairy/Layout.jsx";

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/register',
            element:<Register />
          },
        {
            path: '/create',
            element:<Layout />
          },
    ]
}

export default MainRoutes;