import React from 'react'

import myImg from '../../../assets/imgs/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import axios from 'axios'

export default function ResetPassword() {


    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm()

    const nav = useNavigate()


    const onSubmit = (data) => {
        console.log(data)

        axios.post('http://upskilling-egypt.com:3002/api/v1/Users/Reset', data)
            .then(function (response) {
                toast(response.data.message)
                console.log(response);
                setTimeout(() => {
                    nav('/login')
                }, 5500);



            })
            .catch(function (error) {
                console.log(error.response.data.message);
                toast(error.response.data.message)
            })

    }

    return <>


        <div className="auth-container container-fluid">
            <div className="row overlay vh-100 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className='bg-white p-5 rounded-3'>
                        <div className='text-center'>
                            <img src={myImg} alt="logo" className='w-50' />
                        </div>
                        <h3>Reset Password</h3>
                        <p className='text-muted'>Please Check Your Inbox And Enter Your OTP</p>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <input type="email"
                                name="email"
                                id="email"
                                placeholder='E-mail'
                                className='form-control mx-auto'
                                {...register('email', {
                                    required: true,
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                })} />
                            {errors.email && errors.email.type === 'required' &&
                                <span className='text-danger'>Email is required</span>}
                            {errors.email && errors.email.type === 'pattern' &&
                                <span className='text-danger'>Enter a valid email</span>}

                            <input type="text"
                                name='otp'
                                id='otp'
                                placeholder='OTP'
                                className='form-control mx-auto mt-4'

                                {...register('seed', {
                                    required: true,
                                })} />

                            <input type="password"
                                name="password"
                                id="password"
                                placeholder='New Password'
                                className='form-control mx-auto my-4'
                                {...register('password', {
                                    required: true,
                                })} />
                            {errors.password && errors.password.type === 'required' &&
                                <span className='text-danger'>Password is required</span>}

                            <input type="password"
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm New Password'
                                className='form-control mx-auto'
                                {...register('confirmPassword', {
                                    required: true,
                                })} />

                            <button className='btn btn-success w-100 mt-4 fw-bolder'>Reset Password</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    </>
}
