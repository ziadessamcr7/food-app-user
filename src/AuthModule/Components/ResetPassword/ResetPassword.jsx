import React, { useContext, useState } from 'react'

import myImg from '../../../assets/imgs/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'

import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext'

export default function ResetPassword() {

    const [loading, setLoading] = useState(false)

    const { baseUrl } = useContext(AuthContext)


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch

    } = useForm()

    const nav = useNavigate()

    const password = watch("password")


    const onSubmit = (data) => {
        setLoading(true)
        axios.post(`${baseUrl}/Users/Reset`, data)
            .then(function (response) {
                toast.success(response.data.message)
                setTimeout(() => {
                    nav('/food-app-user')
                }, 4000);
                setLoading(false)



            })
            .catch(function (error) {
                toast(error.response.data.message)
                setLoading(false)
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
                                id='otp'
                                placeholder='OTP'
                                className='form-control mx-auto mt-3'

                                {...register('seed', {
                                    required: true,
                                })} />
                            {errors.seed && <span className='text-danger' >OTP is required</span>}

                            <input type="password"
                                placeholder='New Password'
                                className='form-control mx-auto mt-3'
                                {...register('password', {
                                    required: "password required",
                                    pattern: /^[A-Za-z\d@$!%*#?&]{6,15}$/
                                })} />
                            {errors.password &&
                                <span className='text-danger'> {errors.password.message} </span>}
                            {errors.password && errors.password.type == 'pattern' &&
                                <span className='text-danger'> enter a vlaid password </span>}

                            <input type="password"
                                placeholder='Confirm New Password'
                                className='form-control mx-auto mt-3'
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: (value) =>
                                        value === password || "The passwords do not match"
                                })} />
                            {errors.confirmPassword && <span className='text-danger'> {errors.confirmPassword.message} </span>}

                            <button className='btn btn-success w-100 mt-4 fw-bolder'>
                                {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : 'Reset Password'}

                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    </>
}
