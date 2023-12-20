import { useContext, useEffect, useState } from 'react'

import './App.css'
import Login from './AuthModule/Components/Login/Login'
import MasterLayout from './SharedModule/Component/MasterLayout/MasterLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './SharedModule/Component/NotFound/NotFound'
import Home from './HomeModule/Component/Home/Home'
import RecipesList from './RecipesModule/Component/RecipesList/RecipesList'
import AuthLayout from './SharedModule/Component/AuthLayout/AuthLayout'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import ProtectedRoute from './SharedModule/Component/ProtectedRoute/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Favorites from './RecipesModule/Component/Favorites'
import Register from './AuthModule/Components/Register/Register'
import { AuthContext } from './Context/AuthContext'
import VerifyUser from './AuthModule/Components/VerifyUser/VerifyUser'


function App() {

  let { userData, saveUserData } = useContext(AuthContext)

  const route = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Login saveUserData={saveUserData} /> },
        { path: 'food-app-user', element: <Login saveUserData={saveUserData} /> },
        { path: 'forget-pass', element: <ForgetPassword /> },
        { path: 'reset-pass', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: 'verify-user', element: <VerifyUser /> },

      ]

    },
    {
      path: 'home',
      element: <ProtectedRoute userData={userData} >
        <MasterLayout userData={userData} />
      </ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'favorites', element: <Favorites /> },
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
