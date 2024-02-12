import { RouterProvider } from 'react-router-dom';
import { router } from './config/router.js';

export const App = function () {
  return (
    <RouterProvider router={router} />
  );
}
