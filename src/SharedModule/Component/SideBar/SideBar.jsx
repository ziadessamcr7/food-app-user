import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Modal from 'react-bootstrap/Modal';
import ChangePassword from '../../../AuthModule/Components/ChangePassword/ChangePassword';
import menuLogo from '../../../assets/imgs/3.jpg'
import chefHat from '../../../assets/imgs/3.png'

export default function SideBar() {

    const [toggled, setToggled] = React.useState(false);



    const [isCollapsed, setIsCollapsed] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);    // to open and close modal
    const handleShow = () => setShow(true);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed)   // sidebarCollapsing
    }

    const nav = useNavigate()

    function logout() {
        if (localStorage.getItem('userToken') !== null) {
            localStorage.removeItem('userToken')

            nav('/food-app-user')
        }
    }

    return (<>

        <div className='side-bar'>
            <Sidebar collapsed={isCollapsed}
                backgroundColor='rgba(31, 38, 62, 1)'
                className='text-white vh-100 pt-5 mt-3 '>
                <Menu className='' >

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body> <ChangePassword handleClose={handleClose} /> </Modal.Body>
                    </Modal>

                    <MenuItem onClick={handleToggle}
                        className='text-start' icon={<img src={chefHat} className='chef-hat' alt="" />} >
                    </MenuItem>
                    <MenuItem title='home' icon={<i class="fa-solid fa-house-user"></i>}
                        component={<Link to="/home" />}> Home
                    </MenuItem>
                    <MenuItem title='recipes' icon={<i class="fa-solid fa-kitchen-set"></i>}
                        component={<Link to="/home/recipes" />}>Recipes
                    </MenuItem>
                    <MenuItem title='favorites' icon={<i class="fa-solid fa-heart"></i>}
                        component={<Link to="/home/favorites" />}>Favorites
                    </MenuItem>
                    <MenuItem title='change passsword' icon={<i class="fa-solid fa-unlock"></i>}
                        onClick={handleShow}>Change Password
                    </MenuItem>
                    <MenuItem title='logout' icon={<i class="fa-solid fa-right-from-bracket"></i>} onClick={logout} >Logout</MenuItem>
                </Menu>
            </Sidebar>
        </div>

        <div className='hidden-sb position-fixed top-0 z-3 d-none' style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
            <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always">
                <Menu >
                    <MenuItem title='home' icon={<i class="fa-solid fa-house-user"></i>}
                        component={<Link to="/home" />}> Home
                    </MenuItem>

                    <MenuItem title='recipes' icon={<i class="fa-solid fa-kitchen-set"></i>}
                        component={<Link to="/home/recipes" />}>Recipes
                    </MenuItem>
                    <MenuItem title='favorites' icon={<i class="fa-solid fa-heart"></i>}
                        component={<Link to="/home/favorites" />}>Favorites
                    </MenuItem>
                    <MenuItem title='change passsword' icon={<i class="fa-solid fa-unlock"></i>}
                        onClick={handleShow}>Change Password
                    </MenuItem>
                    <MenuItem title='logout' icon={<i class="fa-solid fa-right-from-bracket"></i>} onClick={logout} >Logout</MenuItem>
                </Menu>
            </Sidebar>
            <main className='main-button' style={{ display: 'flex', paddingLeft: 8, paddingTop: 4, opacity: 0.9 }}>
                <div >
                    <button className="sb-button" onClick={() => setToggled(!toggled)}>
                        <img src={menuLogo} className='menu-logo' alt="" />
                    </button>
                </div>
            </main>
        </div>
    </>


    )
}
