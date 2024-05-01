import React, { useContext } from 'react'
import Mylogo from '../../../assets/imgs/navbar-avatar.jpg'
import { AuthContext } from '../../../Context/AuthContext';

export default function Navbar() {

    const { userData } = useContext(AuthContext)
    return (
        <div className='nav-bar position-relative'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav pe-5 me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <img src={Mylogo} alt="" className='Mylogo' />
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">{userData?.userName}</a>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>


    )
}
