import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Header from '../Header/Header';

export default function MasterLayout() {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3">
                    <div className='bg-danger'>
                        <SideBar />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className='bg-info'>
                        <Navbar />
                        <Header />
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}
