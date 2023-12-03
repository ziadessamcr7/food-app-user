import React, { useEffect, useState } from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'
import axios from 'axios'
import NoData from '../../../SharedModule/Component/NoData/NoData'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import NoDataImg from '../../../assets/imgs/freepik--Character--inject-70.png'
import { toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'


export default function CategoriesList() {

    const [loading, setLoading] = useState(false)

    const [categoryList, setCategoryList] = useState(null)

    const [categoryId, setCategoryId] = useState(0)
    const [modaleState, setModalState] = useState('close')

    const [pagesArray, setPagesArray] = useState([])

    const [searchString, setSearchString] = useState('')

    const showAddCategoryModal = () => {
        setModalState('modal-add')
        setValue('name', '')
    }
    const showDeleteCategoryModal = (id) => {
        setCategoryId(id)
        setModalState('modal-del')
    }
    const showUpdateCategoryModal = (category) => {
        setCategoryId(category.id)
        setValue('name', category.name)
        setModalState('modal-update')
    }

    const handleClose = () => setModalState('close');


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    const submitForm = (data) => {
        setLoading(true)

        axios.post('https://upskilling-egypt.com:443/api/v1/Category/', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
        }).then((response) => {
            console.log(response)
            setTimeout(() => {
                handleClose()
            }, 4000);
            getCategoriesList()
            setLoading(false)
            document.querySelector('#name').value = 'hambozo'
            toast.success('Category Added Successfully', {
                autoClose: 3000
            })


        }).catch((error) => {
            console.log(error)
            setLoading(false)
            toast.error(error)
        })
    }

    const getCategoriesList = (pageNum, searchName) => {
        axios.get('https://upskilling-egypt.com:443/api/v1/Category/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            params: {
                pageSize: 5,
                pageNumber: pageNum,
                name: searchName
            }
        }).then((response) => {
            setCategoryList(response.data.data)
            setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        }).catch((error) => {
            console.log(error);
        })
    }

    const searchByName = (e) => {

        console.log(e.target.value);
        setSearchString(e.target.value)
        getCategoriesList(1, e.target.value)
    }


    useEffect(() => {
        getCategoriesList(1)
    }, [])

    const deleteCategory = () => {
        setLoading(true)
        axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            console.log(response)
            handleClose()
            getCategoriesList()
            setLoading(false)
            toast.success('Category Deleted Successfully', {
                autoClose: 3000
            })
        }).catch((error) => {
            console.log(error)
            setLoading(false)
            toast.error(error)
        })

    }

    const updateCategory = (data) => {
        setLoading(true)
        console.log('bizo', data)
        axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
        }).then((response) => {
            console.log(response)
            handleClose()
            getCategoriesList()
            setLoading(false)
            toast.success('Category Updated Successfully', {
                autoClose: 3000
            })
        }).catch((error) => {
            console.log(error)
            setLoading(false)
            toast.error(error)
        })
    }




    return (
        <section>

            <Modal show={modaleState == 'modal-add'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>  {/*moadl of addin catgeory*/}
                </Modal.Header>
                <Modal.Body>
                    <h4>Add Category</h4>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <input type="text"
                            className='form-control'
                            name=""
                            id="name" {...register('name', {
                                required: true
                            })} />
                        {errors.name && errors.name.type == "required"
                            && <span className='text-danger'>field is required</span>}

                        <button className='btn btn-success mt-4 ms-auto d-block'>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Add Category'}
                        </button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={modaleState == 'modal-del'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>  {/*moadl of addin catgeory*/}
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <img src={NoDataImg} alt="no-data" />
                        <h4>Delet This Item?</h4>
                        <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                        <button onClick={deleteCategory} className='btn btn-outline-danger d-block ms-auto px-5'>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Delete'}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={modaleState == 'modal-update'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Update Category</h4>
                    <form onSubmit={handleSubmit(updateCategory)}>
                        <input type="text"
                            className='form-control'
                            name=""
                            id="name" {...register('name', {
                                required: true
                            })} />
                        {errors.name && errors.name.type == "required"
                            && <span className='text-danger'>field is required</span>}

                        <button className='btn btn-success mt-4 ms-auto d-block'>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Update Category'}
                        </button>
                    </form>
                </Modal.Body>
            </Modal>



            <Header>
                <div className='header-container rounded-4 text-white mt-4'>
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <div className='p-3'>
                                <h1>Welcome Categoriesss!</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officia! </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div>
                                <img src={Mypic} className='w-100' alt="header-pic" />
                            </div>
                        </div>
                    </div>
                </div>
            </Header>

            <div className='categories-list mt-3'>
                <div className="row justify-content-between align-items-center">
                    <div className="col-sm-7">
                        <h3>Categories Table Details</h3>
                        <p>You can check all details</p>
                    </div>
                    <div className="col-sm-5 text-end">
                        <button onClick={showAddCategoryModal} className='btn btn-success ps-4'>Add New Category</button>
                    </div>

                    <input onChange={searchByName} type="text" className='form-control w-50 mb-2' placeholder='search by name' />

                    {categoryList?.length == 0 ? <NoData /> : <> <div className='table-responsive' ><table class="table text-center table-striped ">
                        <thead className='table-head'>
                            <tr className='' >
                                <th className='t-h py-3 rounded-start-4' scope="col">#</th>
                                <th className='t-h py-3' scope="col">NAME</th>
                                <th className='t-h py-3 rounded-end-4' scope="col">ACTION</th>
                            </tr>
                        </thead>
                        {categoryList ? <> {
                            <tbody className=''>
                                {categoryList?.map((category, idx) => {
                                    return <tr key={idx}>
                                        <td scope="row"> {idx + 1} </td>
                                        <td> {category.name} </td>
                                        <td>
                                            <i title='delete' onClick={() => { showDeleteCategoryModal(category.id) }}
                                                className='fa fa-trash text-danger' style={{ cursor: 'pointer' }} ></i>
                                            <i title='edit' onClick={() => { showUpdateCategoryModal(category) }}
                                                className='fa fa-edit ms-4 text-warning' style={{ cursor: 'pointer' }} ></i>
                                        </td>
                                    </tr>
                                }
                                )}
                            </tbody>
                        } </> : <h2
                            className='d-flex justify-content-center align-items-center'>
                            <Oval
                                height={60}
                                width={60}
                                color="#fff"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={5}
                                strokeWidthSecondary={5}

                            /></h2>}
                    </table>
                    </div>
                        <nav aria-label="...">
                            <ul class="pagination pagination-sm">
                                {console.log(pagesArray)}
                                {pagesArray?.map((pageNo, idx) => {
                                    return <li onClick={() => { getCategoriesList(pageNo, searchString) }} key={idx} class="page-item " aria-current="page">
                                        <span className="page-link active" style={{ cursor: "pointer" }}> {pageNo} </span>
                                    </li>
                                })}
                            </ul>
                        </nav></>}

                </div>
            </div>

        </section>
    )
}
