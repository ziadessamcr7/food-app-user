import React, { useContext } from 'react'
import Header from '../../../SharedModule/Component/Header/Header'
import headerPic from '../../../assets/imgs/eating vegan food-rafiki (1).png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'


export default function Home() {
    const { userData } = useContext(AuthContext)
    return (
        <section className='home vh-100 overflow-hidden'>
            <Header >
                <div className='header-container rounded-4 text-white' style={{ marginTop: '70px' }}>
                    <div className="row align-items-center">
                        <div className="col-sm-9">
                            <div className='p-3'>
                                <h1>Welcome <span className='fw-lighter'>{userData?.userName}</span> </h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                                    <br></br> necessitatibus. Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Rem, officia!
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div>
                                <img src={headerPic} className='w-100' alt="header-pic" />
                            </div>
                        </div>
                    </div>


                </div>
            </Header>

            <div className='bg-success-subtle p-3 rounded-3 mt-3'>
                <div className='row align-items-center '>
                    <div className='col-md-7'>
                        <h3>Show the recipes!</h3>
                        <p>Lorem ipsum dolor sit amet consectetur Impedit, tempora! Laboriosam, qui dolorum exercitationem obcaecati rem omnis hic vero recusandae.</p>
                    </div>
                    <div className='col-md-5 text-end'>
                        <Link to={'recipes'} className='btn btn-success px-4'>
                            Recipes <i className='fa fa-arrow-right ms-2'></i>
                        </Link>
                    </div>
                </div>
            </div>


            {/* <div className='rounded-4 bg-success-subtle mt-3'>
                <div className="row align-items-center p-3">
                    <div className='col-lg-9'>
                        <h3>Fill The <span className='text-success'>Recipes</span> !</h3>
                        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                    </div>
                    <div className='col-lg-3 text-end'>
                        <Link to={'/home/recipes'} className='btn btn-success px-5'>Fill Recipes <i className='fa fa-arrow-right ms-2'></i> </Link>
                    </div>
                </div>
            </div> */}

        </section>

    )
}
