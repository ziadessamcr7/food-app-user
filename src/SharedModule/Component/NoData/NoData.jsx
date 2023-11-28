import React from 'react'
import noData from '../../../assets/imgs/freepik--Character--inject-70.png'

export default function NoData() {
    return (
        <>
            <div className='row bg-info mt-5 '>
                <div className='text-center col-md-5  mx-auto'>
                    <img src={noData} alt="" className='w-100' />
                    <h4>No Data Found</h4>
                </div>
            </div>


        </>
    )
}
