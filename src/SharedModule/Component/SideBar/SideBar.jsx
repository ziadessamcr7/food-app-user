import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {

    const nav = useNavigate()


    function logout() {
        if (localStorage.getItem('adminToken') !== null) {
            localStorage.removeItem('adminToken')

            nav('/login')
        }
    }

    return (
        <div>
            <h3>
                SideBar
            </h3>
            <button onClick={logout} className='btn btn-warning'>logout</button>

        </div>
    )
}
