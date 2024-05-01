import React, { useContext, useState } from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'

export default function Register() {

    const [loading, setloading] = useState(false)

    const { baseUrl } = useContext(AuthContext)
    const { getToastValues } = useContext(ToastContext)

    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch

    } = useForm()

    const password = watch('password')

    const Registerform = (data) => {

        setloading(true)

        axios.post(`${baseUrl}/Users/Register`, data)
            .then(function (response) {
                toast.success(response.data.message, {
                    autoClose: 3000
                })

                setloading(false)
                nav('/verify-user')
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
                setloading(false)
            })
    }

    return (
        <div className="auth-container container-fluid">

            <div className="row overlay login justify-content-center align-items-center">
                <div className="col-md-8">
                    <div className='bg-white p-5 rounded-3'>
                        <div className='text-center'>
                            <img src={myImg} alt="logo" className='w-50' />
                        </div>
                        <h3>Register</h3>
                        <p className='text-muted'>Welcome Back! please enter your details</p>

                        <form onSubmit={handleSubmit(Registerform)}>

                            <div className="row">

                                <div className="col-md-6">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control ps-5"
                                            type="text"
                                            placeholder="Enter your name"
                                            id="name" {...register('userName', {
                                                required: "name is required",
                                            })} />
                                        <i className='fa fa-user input-icon'></i>
                                    </div>

                                    {errors.userName && errors.userName.type === 'required' &&
                                        (<span className='text-danger d-block'>name is required</span>)}
                                    {errors.userName && errors.userName.type === 'pattern' && (<span className='text-danger d-block'>Enter a valid email</span>)
                                    }
                                </div>


                                <div className="col-md-6 ">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control ps-5"
                                            type="email"
                                            placeholder="Enter your email"
                                            id="email"
                                            {...register('email', {
                                                required: "email is required",
                                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                            })} />
                                        <i className='fa fa-envelope input-icon'></i>
                                    </div>

                                    {errors.email &&
                                        <span className='text-danger'> {errors.email.message} </span>}
                                    {errors.email && errors.email.type == 'pattern' &&
                                        <span className='text-danger'> enter a vlaid email </span>}
                                </div>

                                <div className="col-md-6">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control mt-3 ps-5"
                                            type="text"
                                            placeholder="Enter your country"
                                            id="country"
                                            {...register('country', {
                                                required: "country is required",
                                            })} />

                                        <i className='fa fa-earth input-icon'></i>

                                    </div>

                                    {errors.country &&
                                        <span className='text-danger'> {errors.country.message} </span>}

                                </div>

                                <div className="col-md-6">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control mt-3 ps-5"
                                            type="text"
                                            placeholder="Enter your phone"
                                            id="phone"
                                            {...register('phoneNumber', {
                                                required: "phoneNumber is required",
                                            })} />
                                        <i className='fa fa-mobile input-icon'></i>

                                    </div>

                                    {errors.phoneNumber &&
                                        <span className='text-danger'> {errors.phoneNumber.message} </span>}

                                </div>

                                <div className="col-md-6">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control mt-3 ps-5"
                                            type="password"
                                            placeholder="Enter your password"
                                            id="password"
                                            {...register('password', {
                                                required: "password is required",
                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                                            })} />

                                        <i className='fa fa-lock input-icon'></i>

                                    </div>

                                    {errors.password &&
                                        <span className='text-danger'> {errors.password.message} </span>}
                                    {errors.password && errors.password.type == 'pattern' &&
                                        <span className='text-danger'> Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character </span>}
                                </div>

                                <div className="col-md-6">
                                    <div className='postion position-relative bg-danger-subtle'>
                                        <input className="form-control mt-3 ps-5"
                                            type="password"
                                            placeholder="Enter your confirm password"
                                            id="confirmPassword"
                                            {...register('confirmPassword', {
                                                validate: (value) =>
                                                    value === password || "The passwords do not match"
                                            })} />

                                        <i className='fa fa-lock input-icon'></i>
                                    </div>

                                    {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

                                </div>
                            </div>





                            <div className='text-end mb-2 mt-2'>
                                <Link className='text-dark fw-bold' to={'/food-app-user'} >Login</Link>
                            </div>
                            <button className="btn btn-success w-100 rounded-5">
                                {loading ? <i className='fa-solid fa-spin fa-spinner'></i>
                                    : <span className='fw-bold'>Register</span>}</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    )
}
