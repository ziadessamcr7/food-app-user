import React from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function ForgetPassword() {

    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        axios.post('http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request', data)
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
                            <input type="email"
                                name="email"
                                id="email"
                                placeholder='Enter your e-mail'
                                className='form-control mx-auto mt-4'
                                {...register('email', {
                                    required: true,
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                })} />
                            {errors.email && errors.email.type === 'required' &&
                                <span className='text-danger'>Email is required</span>}
                            {errors.email && errors.email.type === 'pattern' &&
                                <span className='text-danger'>Enter a valid email</span>}

                            <button className='btn btn-success w-100 mt-4 fw-bolder'>Send</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
