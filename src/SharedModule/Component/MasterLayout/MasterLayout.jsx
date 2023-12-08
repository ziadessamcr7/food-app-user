import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Header from '../Header/Header';

export default function MasterLayout({ adminData }) {
    return (
        <div className='container-fluid'>
            <div className="d-flex ">
                <div className="bg-kohly">
                    <SideBar />
                </div>
                <div className="w-100">
                    <div>
                        <div className=' content-container ps-3 position-relative'>
                            <Navbar adminData={adminData} />
                            <div className="fake-nav">

                            </div>

                            <Outlet />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
