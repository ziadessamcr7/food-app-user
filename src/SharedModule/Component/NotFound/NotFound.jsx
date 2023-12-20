import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return <section className='container-fluid not-found'>
        <div className='row align-items-center vh-100 '>

            <div className="col-md-5" style={{ paddingLeft: '240px' }}>
                <h2>  Opps.. <br />  <span className='text-success'>Page not Found</span> </h2>
                <p className='fs-6'>This Page doesn’t exist or was removed!
                    We suggest you  back to home.</p>
                <Link to={'/home'} className='btn btn-success' >
                    <i className='fa fa-arrow-left me-1'></i> Back to home  </Link >
            </div>

        </div>
    </section>
}
