// project import
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"

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
    ]
}

export default MainRoutes;