import React, { useContext, useEffect, useState } from 'react'
import Mypic from '../../../src/assets/imgs/Group 48102127.svg'
import Header from '../../SharedModule/Component/Header/Header'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import NoDataImg from '../../../src/assets/imgs/freepik--Character--inject-70.png'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Hearts } from 'react-loader-spinner'
import NoData from '../../SharedModule/Component/NoData/NoData'
import { Link } from 'react-router-dom'


export default function Favorites() {

    const [loading, setLoading] = useState(false)  //loader
    const [favList, setFavList] = useState(null)
    const { requestHeaders, baseUrl } = useContext(AuthContext)

    const [itemId, setItemId] = useState();
    const [modalState, setModalState] = useState('close');

    const handleClose = () => setModalState('close');


    const getAllFavs = () => {
        axios.get(`${baseUrl}/userRecipe/`, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response.data.data);
            setFavList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteFavRecipe = () => {
        setLoading(true)
        axios.delete(`${baseUrl}/userRecipe/${itemId}`, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response);
            setLoading(false)
            getAllFavs()
            handleClose()
            toast.success('item removed successfully', {
                autoClose: 2000
            })

        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    const ShowDelteModal = (id) => {

        setModalState('modal-del');
        setItemId(id)


    }



    useEffect(() => {
        getAllFavs()
    }, [])


    return (



        <section className='mt-5' >

            <Modal show={modalState == 'modal-del'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove from favorites</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>

                        <img src={NoDataImg} alt="no-data" />
                        <h6>Are you sure u want to delete this item? click remove</h6>


                        <button onClick={deleteFavRecipe}
                            className='btn btn-danger d-block ms-auto mt-3'  >
                            {loading ? <i className='fa-solid fa-spin fa-spinner px-4'></i>
                                : <span className='fw-bold'>Remove</span>}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <Header>
                <div className='header-container rounded-4 text-white' style={{ marginTop: '70px' }}>
                    <div className="row align-items-center">
                        <div className="col-sm-10">
                            <div className='p-3'>
                                <h1>Favorites Items</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, necessitatibus. Lorem ipsum <br /> dolor sit amet  consectetur adipisicing  elit. Rem, officia! </p>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div>
                                <img src={Mypic} className='w-100' alt="header-pic" />
                            </div>
                        </div>
                    </div>

                </div>
            </Header>


            <div className="row mt-3 g-2">

                {favList?.length == 0 ? <div className='text-center'>
                    <NoData />
                    <Link to={'/home/recipes'} className='btn btn-success fw-bold'>Add some favs</Link>
                </div> : <>    {favList ? <>  {favList?.map((item) => {
                    return <div className="col-md-3">
                        <div className='card shadow z-0 bg-success-subtle rounded-3 p-3 position-relative'  >
                            <img src={'https://upskilling-egypt.com:443/' + item.recipe.imagePath}
                                alt="recipe-img"
                                className='w-100'
                                style={{ height: '200px' }} />
                            <h6>Name : {item.recipe.name}</h6>
                            <h6>Price : {item.recipe.price}</h6>
                            <h6>Description : {item.recipe.description}</h6>


                            <div onClick={() => { ShowDelteModal(item.id) }} className='text-end'>

                                <i className='fa fa-trash-can text-danger '
                                    style={{ cursor: 'pointer' }} >
                                </i>
                            </div>


                        </div>
                    </div>
                })}</> : <Hearts
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center a align-items-center pt-5 mt-5"
                    visible={true}
                />} </>}




            </div>
        </section>
    )
}
