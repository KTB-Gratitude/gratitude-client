import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// routing
// import router from 'routes';

// defaultTheme
// import themes from 'themes';

// project imports
// import NavigationScroll from 'layout/NavigationScroll';
import Login from '/src/views/auth/Login'

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <Login />
  )
};

export default App;
