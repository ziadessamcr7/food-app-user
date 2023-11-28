import React, { useRef } from 'react'
import myImg from '../../../assets/imgs/4 3.png'
import { useForm, useWatch } from 'react-hook-form'

export default function ChangePassword({ handleClose }) {


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    const formSubmit = (data) => {
        console.log(data);
    }

    const password = useRef()

    password.current = watch("password", "")



    return <div className='container'>
        <div className="row">
            <div className="">
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
                                name="oldPassword"
                                id="oldPassword"
                                className='form-control'
                                placeholder='Old Password'
                                {...register('oldPassword', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
                                })}
                            />
                        </div>
                        {errors.oldPassword && errors.oldPassword.type == 'required' &&
                            <span className='text-danger'> old password required</span>}
                        {errors.oldPassword && errors.oldPassword.type == 'pattern' &&
                            <span className='text-danger'>invalid pass</span>}

                        <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                            <div className='icon p-2'>
                                <i className="fa fa-lock bg-dange"></i>
                            </div>
                            <input type="password"
                                name="newPassword"
                                id="newPassword"
                                className='form-control'
                                placeholder='New Password'
                                {...register('newPassword', {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
                                })}
                            />
                        </div>
                        {errors.newPassword && errors.newPassword.type == 'required' &&
                            <span className='text-danger'>new password required</span>}
                        {errors.newPassword && errors.newPassword.type == 'pattern' &&
                            <span className='text-danger'>invalid password</span>}


                        <div className='bg-ino box d-flex align-items-center mt-4 p1 rounded-2'>
                            <div className='icon p-2'>
                                <i className="fa fa-lock bg-dange"></i>
                            </div>

                            <input type="password"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                className='form-control'
                                placeholder='Confirm New Password'
                                {...register('confirmNewPassword', {
                                    required: true,
                                })}
                            />
                        </div>
                        {errors.confirmNewPassword && errors.confirmNewPassword.type == 'required' &&
                            <span className='text-danger'>new password required</span>}



                        <button className='btn btn-success w-100 fw-bold fs-5 mt-4'>Change Password</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
}





