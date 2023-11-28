import React, { useEffect, useState } from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NoDataImg from '../../../assets/imgs/freepik--Character--inject-70.png'
import { Oval } from 'react-loader-spinner';




export default function RecipesList() {

    const [loading, setLoading] = useState(false)

    const [recipeList, setRecipeList] = useState(null)

    const [categoryList, setCategoryList] = useState(null)

    const [tagList, setTagList] = useState(null)

    const [recipeId, setRecipeId] = useState(0)


    const [modalState, setModalState] = useState('close');

    const ShowAddRecipeModal = () => {
        setModalState('modal-add');
        setValue('name', '')
        setValue('price', '')
        setValue('description', '')
    }
    const ShowDeleteRecipeModal = (id) => {
        setRecipeId(id)
        setModalState('modal-del');
    }
    const handleClose = () => setModalState('close');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm()

    const submitFrom = (data) => {

        setLoading(true)

        axios.post('https://upskilling-egypt.com:443/api/v1/Recipe/', { ...data, recipeImage: data.recipeImage[0] }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                "content-type": "multipart/form-data"
            }
        }).then((response) => {
            console.log(response)
            getRecipesList()
            handleClose()
            toast.success(response.data.message, {
                autoClose: 2500
            })
            setLoading(false)

        }).catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }

    const getCategoriesList = () => {
        axios.get('https://upskilling-egypt.com:443/api/v1/Category/?pageSize=20&pageNumber=1', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            console.log(response)
            setCategoryList(response?.data?.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const getAllTags = () => {
        axios.get('https://upskilling-egypt.com:443/api/v1/tag/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            console.log(response.data)
            setTagList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getRecipesList = () => {
        axios.get('https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=20&pageNumber=1', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            console.log(response)
            setRecipeList(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteRecipe = () => {
        setLoading(true)

        axios.delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        }).then((response) => {
            toast.success('Deleted Successfully', {
                autoClose: 2500
            })
            getRecipesList()
            handleClose()
            setLoading(false)

        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })


    }


    useEffect(() => {
        getRecipesList()
    }, [])

    // function handleImage(e) {
    //     console.log(e.target.files[0])
    // }


    return (
        <section>

            <Modal show={modalState == 'modal-del'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <img src={NoDataImg} alt="no-data" />
                        <h4>Delete this item?</h4>
                        <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                        <button onClick={deleteRecipe}
                            className='btn btn-outline-danger px-4 ms-auto d-block '>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Delete'}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={modalState == 'modal-add'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Add New Recipe</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className='from-group' onSubmit={handleSubmit(submitFrom)} >
                        <input type="text"
                            className='form-control'
                            placeholder='Recipe Name' {...register('name', {
                                required: true
                            })} />
                        {errors.name && errors.name.type == 'required'
                            && <span className='text-danger'>field required</span>}

                        <input type="text"
                            className='form-control mt-2'
                            placeholder='Price' {...register('price', {
                                required: true
                            })} />
                        {errors.price && errors.price.type == 'required'
                            && <span className='text-danger'>field required</span>}

                        <select name="" id="" className='form-select mt-2' {...register('tagId', {
                            required: true,
                            pattern: /^[0-9]{1,4}$/
                        })} >
                            <option selected disabled>tagId</option>
                            {tagList?.map((tag) => {
                                return <option value={tag.id} > {tag.id} {tag.name} </option>
                            })}
                        </select>
                        {errors.tagId && errors.tagId.type == 'required'
                            && <span className='text-danger'>field required</span>}
                        {errors.tagId && errors.tagId.type == 'pattern'
                            && <span className='text-danger'>enter an id</span>}


                        <select name="" id="" className='form-select mt-2' {...register('categoriesIds', {
                            required: true,
                            pattern: /^[0-9]{1,4}$/
                        })}>
                            <option selected disabled>categoriesIds</option>
                            {categoryList?.map((category) => {
                                return <option value={category.id} > {category.id} {category.name}   </option>
                            })}

                        </select>
                        {errors.categoriesIds && errors.categoriesIds.type == 'required'
                            && <span className='text-danger'>field required</span>}
                        {errors.categoriesIds && errors.categoriesIds.type == 'pattern'
                            && <span className='text-danger'>enter an id</span>}

                        <input type="file" className='form-control mt-2' {...register('recipeImage', {
                            required: true
                        })} />
                        {errors.recipeImage && errors.recipeImage.type == 'required'
                            && <span className='text-danger'>field required</span>}


                        <textarea name=""
                            id=""
                            placeholder='Description'
                            cols="60" rows="5"
                            className='d-block mt-3' {...register('description', {
                                required: true
                            })} >
                        </textarea>
                        {errors.description && errors.description.type == 'required'
                            && <span className='text-danger'>field required</span>}


                        <button className='btn btn-success mt-4 w-100 fw-bold'>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Add Recipe'}
                        </button>

                    </form>

                </Modal.Body>
            </Modal>


            <Header>
                <div className='header-container rounded-4 text-white mt-4'>
                    <div className="row align-items-center">
                        <div className="col-md-10">
                            <div className='p-3'>
                                <h1>Welcome Recipesss!</h1>
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

            <div className='d-flex justify-content-between my-4'>
                <div>
                    <h3>Recipe Table Details</h3>
                    <p>You can check all details</p>
                </div>
                <div>
                    <button onClick={() => { ShowAddRecipeModal(), getCategoriesList(), getAllTags() }} className='btn btn-success px-4'>Add New Item</button>
                </div>
            </div>

            <table class="table align-middle text-center">
                <thead>
                    <tr className=''>
                        <th className='t-h py-3 rounded-start-4 ' scope="col">#</th>
                        <th className='t-h py-3' scope="col">Name</th>
                        <th className='t-h py-3' scope="col">Image</th>
                        <th className='t-h py-3' scope="col">Price</th>
                        <th className='t-h py-3' scope="col">Description</th>
                        <th className='t-h py-3' scope="col">Category</th>
                        <th className='t-h py-3' scope="col">Tag</th>
                        <th className='t-h py-3 rounded-end-4' scope="col">Actions</th>
                    </tr>
                </thead>

                {recipeList ? <>  {recipeList?.map((recipe, idx) => {
                    return <tbody>
                        {console.log(recipe)}

                        <tr>
                            <th scope="row"> {idx + 1} </th>
                            <td >{recipe.name}</td>
                            <td> <img src={'https://upskilling-egypt.com:443/' + recipe.imagePath} className='recipe-img' alt="" /> </td>
                            <td>{recipe.price} L.E </td>
                            <td>{recipe.description}</td>
                            <td>{recipe.category[0]?.name} </td>
                            <td>{recipe.tag.name}</td>
                            <td>
                                <i title='delete' onClick={() => { ShowDeleteRecipeModal(recipe.id) }}
                                    className='fa fa-trash text-danger'
                                    style={{ cursor: 'pointer' }} >
                                </i>
                                <i title='edit' className='fa fa-edit ms-3 text-warning'
                                    style={{ cursor: 'pointer' }} >
                                </i>
                            </td>
                        </tr>
                    </tbody>
                })} </> : <h2
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

        </section>
    )
}
