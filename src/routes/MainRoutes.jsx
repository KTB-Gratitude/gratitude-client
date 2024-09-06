// project import
import Login from "../views/auth/Login"
import Register from "../views/auth/Register"
<<<<<<< HEAD
import MyLibrary from "../views/library/MyLibrary";
=======
import Layout from "../views/dairy/Layout.jsx";
>>>>>>> feature/create-dairy

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
<<<<<<< HEAD
        },
        {
            path: '/library',
            element:<MyLibrary />
        },
=======
          },
        {
            path: '/create',
            element:<Layout />
          },
>>>>>>> feature/create-dairy
    ]
}

export default MainRoutes;