import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// routing
// import router from 'routes';

// defaultTheme
// import themes from 'themes';

// project imports
import router from './routes';

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <RouterProvider router={router} />
  )
};

export default App;
