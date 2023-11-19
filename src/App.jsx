import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './AuthModule/Components/Login/Login'
import MasterLayout from './SharedModule/Component/MasterLayout/MasterLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './SharedModule/Component/NotFound/NotFound'
import Home from './HomeModule/Component/Home/Home'
import UsersList from './UsersModule/Component/UsersList/UsersList'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import RecipesList from './RecipesModule/Component/RecipesList/RecipesList'
import AuthLayout from './SharedModule/Component/AuthLayout/AuthLayout'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import ProtectedRoute from './SharedModule/Component/ProtectedRoute/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // const [adminData, setAdminData] = useState(null)

  // useEffect(() => {
  //   saveAdminData()
  // }, [])


  // const saveAdminData = () => {
  //   const encodedToken = localStorage.getItem('adminToken')
  //   const decodedToken = jwtDecode(encodedToken)
  //   setAdminData(decodedToken)
  // }

  const route = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'forget-pass', element: <ForgetPassword /> },
        { path: 'reset-pass', element: <ResetPassword /> },

      ]

    },
    {
      path: 'dashboard',
      element: <ProtectedRoute > <MasterLayout /> </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'users', element: <UsersList /> },
        { path: 'categories', element: <CategoriesList /> },
        { path: 'recipes', element: <RecipesList /> }
      ]

    }
  ])

  return (
    <>
      <ToastContainer />


      <RouterProvider router={route}>
      </RouterProvider>
    </>
  )
}

export default App
