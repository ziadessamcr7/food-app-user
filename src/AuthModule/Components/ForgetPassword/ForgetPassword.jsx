import React, { useState } from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'


export default function ForgetPassword() {

    const nav = useNavigate()
    const [loading, setloading] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        setloading(true)

        axios.post('https://upskilling-egypt.com:443/api/v1/Users/Reset/Request', data)
            .then(function (response) {
                toast(response.data.message)
                console.log(response);

                nav('/reset-pass')



            })
            .catch(function (error) {
                console.log(error.response.data.message);
                toast(error.response.data.message)
            })


    }

    return (
        <div className="auth-container container-fluid">
            <div className="row overlay vh-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className='bg-white p-5 rounded-3'>
                        <div className='text-center'>
                            <img src={myImg} alt="logo" className='w-50' />
                        </div>
                        <h2 className='pt-5'>Request Reset Password</h2>
                        <p className='text-muted'>Please Enter Your E-mail and Check Your Inbox</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                                <div className='icon p-2'>
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your e-mail'
                                    className='form-control mx-auto'
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                    })} />
                            </div>

                            {errors.email && errors.email.type === 'required' &&
                                <span className='text-danger'>Email is required</span>}
                            {errors.email && errors.email.type === 'pattern' &&
                                <span className='text-danger'>Enter a valid email</span>}

                            <button className='btn btn-success d-flex justify-content-center w-100 mt-4 fw-bolder'>
                                {loading === true ? <Oval
                                    height={27}
                                    width={27}
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
