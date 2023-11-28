import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Modal from 'react-bootstrap/Modal';
import ChangePassword from '../../../AuthModule/Components/ChangePassword/ChangePassword';

export default function SideBar() {


    const [isCollapsed, setIsCollapsed] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);    // to open and close modal
    const handleShow = () => setShow(true);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed)   // sidebarCollapsing
    }

    const nav = useNavigate()

    function logout() {
        if (localStorage.getItem('adminToken') !== null) {
            localStorage.removeItem('adminToken')

            nav('/food-app-login')
        }
    }

    return (
        <div>
            <Sidebar collapsed={isCollapsed} backgroundColor='#1F263E' className='text-white side-bar'>
                <Menu >

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body> <ChangePassword handleClose={handleClose} /> </Modal.Body>
                    </Modal>

                    <MenuItem onClick={handleToggle}
                        icon={<i className="fa fa-bars d-block"></i>}></MenuItem>
                    <MenuItem icon={<i className="fa fa-home"></i>}
                        component={<Link to="/dashboard" />}> Home
                    </MenuItem>
                    <MenuItem icon={<i className="fa fa-users"></i>}
                        component={<Link to="/dashboard/users" />}> Users
                    </MenuItem>
                    <MenuItem icon={<i class="fa-solid fa-kitchen-set"></i>}
                        component={<Link to="/dashboard/recipes" />}>Recipes
                    </MenuItem>
                    <MenuItem icon={<i class="fa-solid fa-table-list"></i>}
                        component={<Link to="/dashboard/categories" />}>Categories
                    </MenuItem>
                    <MenuItem icon={<i class="fa-solid fa-unlock"></i>}
                        onClick={handleShow}>Change Password
                    </MenuItem>
                    <MenuItem icon={<i class="fa-solid fa-right-from-bracket"></i>} onClick={logout} >Logout</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}
