import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';

export default function MasterLayout({ userData }) {
    return (
        <div className='container-fluid'>
            <div className="d-flex ">
                <div className="bg-darkBlue">
                    <SideBar />
                </div>
                <div className="w-100">
                    <div>
                        <div className=' content-container ps-3 position-relative'>
                            <Navbar userData={userData} />
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
