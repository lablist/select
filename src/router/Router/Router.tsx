import { Routes, Route } from 'react-router-dom';
import { useRoutePaths } from '../../hooks';
import { Home, Login, Browse } from '../../pages';
import { PrivateRoute } from '../PrivateRoute';
import { PublicRoute } from '../PublicRoute';

function Router() {
  const {
    ROOT_PATH,
    LOGIN_PATH,
    BROWSE_PATH
  } = useRoutePaths();

  return (
    <Routes>
      <Route
        path={ROOT_PATH}
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path={LOGIN_PATH}
        element={
          <PublicRoute redirectTo={ROOT_PATH}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={BROWSE_PATH}
        element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
            <Browse />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router;
