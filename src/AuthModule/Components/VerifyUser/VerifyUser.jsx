import React, { useContext, useState } from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../Context/AuthContext'
import { ToastContext } from '../../../Context/ToastContext'


export default function VerifyUser() {


    const { getToastValues } = useContext(ToastContext)

    const nav = useNavigate()
    const [loading, setloading] = useState(false)

    const { baseUrl } = useContext(AuthContext)



    const {
        register,
        handleSubmit,
        formState: { errors }

    } = useForm()

    const SubmitVerify = (data) => {

        setloading(true)

        axios.put(`${baseUrl}/Users/verify`, data)
            .then(function (response) {
                toast.success(response.data.message)

                nav('/food-app-user')

            })
            .catch(function (error) {
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
                        <h2 className='pt-5'>Verify Account</h2>
                        <p className='text-muted'>Please Enter Your E-mail and Check Your Inbox</p>

                        <form onSubmit={handleSubmit(SubmitVerify)}>
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

                            <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                                <div className='icon p-2'>
                                    <i className="fa fa-lock"></i>
                                </div>
                                <input type="text"


                                    placeholder='Enter your code'
                                    className='form-control mx-auto'
                                    {...register('code', {
                                        required: true,
                                    })} />
                            </div>

                            {errors.code && errors.code.type === 'required' &&
                                <span className='text-danger'>Code is required</span>}


                            <button className='btn btn-success d-flex justify-content-center w-100 mt-4 fw-bolder'>
                                {loading === true ? <i className='fa-solid fa-spin fa-spinner py-1'></i>
                                    : 'Send'}


                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
