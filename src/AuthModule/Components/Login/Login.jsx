import React, { useContext, useState } from 'react'

import myImg from '../../../assets/imgs/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'


export default function Login({ }) {

    const { baseUrl, saveUserData } = useContext(AuthContext)
    const { getToastValues } = useContext(ToastContext)


    const nav = useNavigate()

    const [loading, setloading] = useState(false)

    function navToForgetPass() {
        nav('forget-pass')
    }


    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm()

    if (localStorage.getItem('userToken') !== null) {
        setTimeout(() => {
            nav('/home')
        }, 100);
    }

    const onSubmit = (data) => {
        console.log(data)

        setloading(true)

        axios.post(`${baseUrl}/Users/Login`, data)
            .then(function (response) {
                { () => getToastValues('success', 'login success') }

                nav('/home')
                console.log(response);

                localStorage.setItem('userToken', response.data.token)
                setloading(false)

                saveUserData()  // 3ashan a5aly el esm yzhar fl navbar w el header
            })
            .catch(function (error) {
                console.log('errorrr', error.response.data.message);
                toast.error(error.response.data.message)
                setloading(false)
            })
    }

    // toast('email: ziadessamcr7@gmail.com password: Zizo123!', {
    //     autoClose: false
    // })


    return (

        <div className="auth-container container-fluid">

            <div className="row overlay login justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className='bg-white p-5 rounded-3'>
                        <div className='text-center'>
                            <img src={myImg} alt="logo" className='w-50' />
                        </div>
                        <h3>Log In</h3>
                        <p className='text-muted'>Welcome Back! please enter your details</p>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                                <div className='icon p-2'>
                                    <i className="fa fa-mobile"></i>
                                </div>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your e-mail'
                                    value="ziad.elsharkawy27@gmail.com"
                                    className='form-control mx-auto'
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                    })} />
                            </div>
                            {errors.email && errors.email.type === 'required' &&
                                (<span className='text-danger'>Email is required</span>)}
                            {errors.email && errors.email.type === 'pattern' && (<span className='text-danger'>Enter a valid email</span>)
                            }

                            <div className='bg-ino box d-flex align-items-center mt-4 rounded-2' >
                                <div className='icon p-2'>
                                    <i className="fa fa-lock bg-dange"></i>
                                </div>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder='Password'
                                    value="Zizo123!"
                                    className='form-control mx-auto'
                                    {...register('password', {
                                        required: true,
                                    })} />
                            </div>

                            {errors.password && errors.password.type === 'required' &&
                                <span className='text-danger'>Password is required</span>}
                            <div className='d-flex justify-content-between w-100'>
                                <Link to={'/register'} className="fw-medium text-dark">Register Now?</Link>
                                <Link to={'/forget-pass'} className='text-success' style={{ cursor: 'pointer' }} >Forgot Password?</Link>
                            </div>
                            <button className='btn btn-success d-flex justify-content-center w-100 mt-4 fw-bolder'>
                                {loading === true ? <Oval
                                    height={30}
                                    width={30}
                                    color="#fff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#4fa94d"
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}

                                /> : 'Login'}


                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>


    )
}
