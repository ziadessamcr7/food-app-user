import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Header from '../Header/Header';

export default function MasterLayout({ adminData }) {
    return (
        <div className='container-fluid'>
            <div className="d-flex bg-dangr">
                <div className="bg-kohly">
                    <SideBar />
                </div>
                <div className="w-100">
                    <div className=''>
                        <Navbar adminData={adminData} />
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}
