import React from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'
import { Oval } from 'react-loader-spinner'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

import NoDataImg from '../../../assets/imgs/freepik--Character--inject-70.png'
import NoData from '../../../SharedModule/Component/NoData/NoData'


export default function UsersList() {


    const [usersList, setUsersList] = useState(null)

    const [pagesArray, setPagesArray] = useState([])

    const [searchString, setSearchString] = useState('')



    const getAllUsers = (pageNum, name, mail) => {
        axios.get(`https://upskilling-egypt.com:443/api/v1/Users/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            params: {
                pageSize: 5,
                pageNumber: pageNum,
                userName: name,
                email: mail

            }
        }).then((response) => {
            console.log(response.data.data)
            setUsersList(response.data.data)
            setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        }).catch((error) => {
            console.log(error)
        })

    }

    const searchByName = (e) => {
        console.log(e.target.value)
        getAllUsers(1, e.target.value)
        setSearchString(e.target.value)
    }

    const searchByMail = (e) => {
        getAllUsers(1, '', e.target.value)
    }
    useEffect(() => {
        getAllUsers(1)
    }, [])



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

                <h4 className='mt-3'>Users Table Details</h4>
                <div>You can check all details</div>
            </Header>


            <div className="row my-3">
                <div className="col-md-6">
                    <input onChange={searchByName} type="text" className='form-control' placeholder='search by name' />
                </div>
                <div className="col-md-6">
                    <input type="email" className='form-control' onChange={searchByMail} placeholder='search by email' />
                </div>
            </div>





            {usersList?.length == 0 ? <NoData /> : <> <div className='table-responsive'> <table class="table align-middle text-center table-striped">
                <thead>
                    <tr className=''>
                        <th className='t-h py-3 rounded-start-4 ' scope="col">#</th>
                        <th className='t-h py-3' scope="col">Name</th>
                        <th className='t-h py-3' scope="col">Image</th>
                        <th className='t-h py-3' scope="col">Phone</th>
                        <th className='t-h py-3' scope="col">Email</th>
                        <th className='t-h py-3 rounded-end-4' scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody >
                    {usersList ? <>  {usersList?.map((user, idx) => {
                        return <tr key={idx} >
                            <th scope="row"> {user.id} </th>
                            <td> {user.userName} </td>
                            {user.imagePath ? <td>
                                {<img src={`https://upskilling-egypt.com:443/` + user.imagePath} className='recipe-img' alt="" />}
                            </td> : <td> <img src={NoDataImg} className='noUser-img' alt="" /> </td>}
                            <td> {user.phoneNumber} </td>
                            <td> {user.email} </td>
                            <td>
                                <i title='delete'
                                    className='fa fa-trash text-danger'
                                    style={{ cursor: 'pointer' }} >
                                </i>
                            </td>
                        </tr>

                    })} </> : <h2
                        className='d-flex justify-content-center align-items-center'>
                        <Oval
                            height={60}
                            width={60}
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={5}
                            strokeWidthSecondary={5}

                        /></h2>}
                </tbody>
            </table>
            </div>
                <nav aria-label="...">
                    <ul class="pagination pagination-sm">
                        {console.log(pagesArray)}
                        {pagesArray?.map((pageNo, idx) => {
                            return <li onClick={() => { getAllUsers(pageNo, searchString) }} key={idx} class="page-item " aria-current="page">
                                <span className="page-link active" style={{ cursor: "pointer" }}> {pageNo} </span>
                            </li>
                        })}
                    </ul>
                </nav></>}



        </div>


    )
}
