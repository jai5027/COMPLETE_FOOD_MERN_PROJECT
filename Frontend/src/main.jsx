import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/global.css'

import Home from './pages/Home.jsx'
import LoginUser from './pages/LoginUser.jsx'
import RegisterUser from './pages/RegisterUser.jsx'
import LoginPartner from './pages/LoginPartner.jsx'
import RegisterPartner from './pages/RegisterPartner.jsx'
import Reels from './general/Reels.jsx'
import CreateFood from './food-partner/CreateFood.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <LoginUser />
      },
      {
        path: 'register',
        element: <RegisterUser />
      },
      {
        path: 'partner/login',
        element: <LoginPartner />
      },
      {
        path: 'partner/register',
        element: <RegisterPartner />
      },
      {
        path: '/reels',
        element: <Reels />
      },
      {
        path: '/food/create',
        element: <CreateFood />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
