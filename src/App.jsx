import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

//Page Components
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Account from './pages/Account';
import AppLayout from './ui/AppLayout';

// styles
import GlobalStyles from './styles/GlobalStyles';

// react query & tools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/cabins',
        element: <Cabins />,
      },

      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
