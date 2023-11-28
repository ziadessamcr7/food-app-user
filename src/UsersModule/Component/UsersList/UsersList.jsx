import React from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'

export default function UsersList() {
    return (
        <div>
            <Header>
                <div className='header-container rounded-4 text-white mt-4'>
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <div className='p-3'>
                                <h1>Welcome Usersss!</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officia! </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                <img src={Mypic} className='w-100' alt="header-pic" />
                            </div>
                        </div>
                    </div>

                </div>

                <h2>vamoooooooooooos</h2>
                <div>UsersList</div>
            </Header>

        </div>


    )
}
