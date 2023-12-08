import React from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import Login from '../../../AuthModule/Components/Login/Login'


export default function ProtectedRoute({ children }) {


    if (localStorage.getItem('adminToken') === null) {
        return <Navigate to={'/food-app-admin'} />
    } else {
        return children
    }





    // return (<>
    //     {children}
    // </>

    // )
}
