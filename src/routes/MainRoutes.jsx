// project import
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"
import MyLibrary from "../views/library/MyLibrary";

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
            path: '/library',
            element:<MyLibrary />
        },
    ]
}

export default MainRoutes;