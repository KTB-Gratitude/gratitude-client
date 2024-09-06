// project import
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import MyLibrary from "../views/library/MyLibrary";
import Layout from "../views/dairy/Layout.jsx";
import DetailPage from "../views/dairy/DetailPage.jsx";

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/library',
            element: <MyLibrary />
        },
        {
            path: '/create',
            element: <Layout />
        },
        {
            path: '/detail/:id',
            element: <DetailPage />
        }
    ]
};

export default MainRoutes;
