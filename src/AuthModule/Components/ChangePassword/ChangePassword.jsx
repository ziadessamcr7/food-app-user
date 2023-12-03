import React, { useRef, useState } from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { useForm, useWatch } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ChangePassword({ handleClose }) {

    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ mode: 'onTouched' })

    const password = watch("newPassword")


    const formSubmit = (data) => {
        setLoading(true)
        axios.put('https://upskilling-egypt.com:443/api/v1/Users/ChangePassword', data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            console.log(response)
            toast.success(response.data.message, {
                autoClose: 2000
            })
            handleClose()
            setLoading(false)

        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, {
                autoClose: 2000
            })
            setLoading(false)
        })
    }




    return <div className="">
        <div>
            <div className='text-center'>
                <img src={myImg} className='w-50' alt="logo" />
            </div>
            <h3>Change Your Password</h3>
            <p className='text-muted mb-4'>Enter Your Details Below</p>

            <form onSubmit={handleSubmit(formSubmit)}>
                <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2' >
                    <div className='icon p-2'>
                        <i className="fa fa-lock bg-dange"></i>
                    </div>
                    <input type="password"
                        id="oldPassword"
                        className='form-control'
                        placeholder='Old Password'
                        {...register('oldPassword', {
                            required: 'must enter password',
                            minLength: {
                                value: 8,
                                message: 'enetr 8 chars'
                            }
                        })}
                    />
                </div>
                {/* {errors.oldPassword && errors.oldPassword.type == 'required' &&
                    <span className='text-danger'> old password required</span>}
                {errors.oldPassword && errors.oldPassword.type == 'pattern' &&
                    <span className='text-danger'>invalid pass</span>} */}
                {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}


                <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                    <div className='icon p-2'>
                        <i className="fa fa-lock bg-dange"></i>
                    </div>
                    <input type="password"
                        id="newPassword"
                        className='form-control'
                        placeholder='New Password'
                        // {...register('newPassword', {
                        //     required: true,
                        //     pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
                        // })}
                        {...register('newPassword', {
                            required: 'must enter new password',
                            minLength: {
                                value: 8,
                                message: 'enetr 8 chars'
                            }
                        })}
                    />
                </div>
                {/* {errors.newPassword && errors.newPassword.type == 'required' &&
                    <span className='text-danger'>new password required</span>}
                {errors.newPassword && errors.newPassword.type == 'pattern' &&
                    <span className='text-danger'>invalid password</span>} */}
                {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}



                <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                    <div className='icon p-2'>
                        <i className="fa fa-lock bg-dange"></i>
                    </div>

                    <input type="password"
                        id="confirmNewPassword"
                        className='form-control'
                        placeholder='Confirm New Password'
                        // {...register('confirmNewPassword', {
                        //     required: true,
                        // })}
                        {...register('confirmNewPassword', {
                            required: 'must confirm new password',
                            validate: (value) =>
                                value === password || "The passwords do not match"
                        })}
                    />
                </div>
                {/* {errors.confirmNewPassword && errors.confirmNewPassword.type == 'required' &&
                    <span className='text-danger'>new password required</span>} */}
                {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}







                <button className='btn btn-success w-100 fw-bold  mt-4'>
                    {loading ? <i className='fa-spin fa-spinner fa-solid'></i> : 'Change Password'}
                </button>
            </form>
        </div>
    </div>

}





