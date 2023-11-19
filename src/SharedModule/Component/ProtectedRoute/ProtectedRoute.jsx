import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import Login from '../../../AuthModule/Components/Login/Login'

export default function ProtectedRoute({ children }) {



    if (localStorage.getItem('adminToken') === null) {
        return <Navigate to={'/login'} />

    }

    return (<>
        {children}
    </>

    )
}
