import React, { useEffect, useState } from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NoDataImg from '../../../assets/imgs/freepik--Character--inject-70.png'
import { Oval } from 'react-loader-spinner';
import NoData from '../../../SharedModule/Component/NoData/NoData';




export default function RecipesList() {

    const [loading, setLoading] = useState(false)  //loader

    const [recipeList, setRecipeList] = useState(null) // 3shan a3rd el recipes fl table

    const [categoryList, setCategoryList] = useState(null)  //3shan a3rd el categories fl modals 

    const [tagList, setTagList] = useState(null)   // me7tagha 3shan a3rd el taglist fl modals

    const [recipeId, setRecipeId] = useState(0)   // me7tagha fi el api bta3 el update w el delete

    const [recipeObj, setRecipeObj] = useState(null)  // me7tagha 3shan a3rd el image fl update modal

    const [pagesArray, setPagesArray] = useState([]) //3shan el pagination yzhrly kam page

    const [searchString, setSearchString] = useState('') //3shan el pagination ama ados 3ala ay page yfdl 3amel search




    const [modalState, setModalState] = useState('close');

    const ShowAddRecipeModal = () => {

        setModalState('modal-add');
        setValue('name', '')
        setValue('price', '')
        setValue('description', '')
        setValue('categoriesIds', '')
        setValue('tagId', '')
    }
    const ShowDeleteRecipeModal = (id) => {
        setRecipeId(id)
        setModalState('modal-del');
    }
    const ShowUpdateRecipeModal = (recipe) => {

        setRecipeId(recipe.id)
        setRecipeObj(recipe)
        setModalState('modal-update');
        setValue('name', recipe.name)
        setValue('price', recipe.price)
        setValue('description', recipe.description)
        setValue('tagId', recipe?.tag?.id)
        setValue('categoriesIds', recipe?.category[0]?.id)
    }
    const handleClose = () => setModalState('close');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
    })

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

    const getRecipesList = (pageNum, searchName) => {
        axios.get('https://upskilling-egypt.com:443/api/v1/Recipe/?', {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            params: {
                pageSize: 4,
                pageNumber: pageNum,
                name: searchName
            }
        }).then((response) => {
            console.log(response)
            setRecipeList(response.data.data)
            setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
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

    const updateRecipe = (data) => {
        console.log(data)
        setLoading(true)
        axios.put(`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`, { ...data, recipeImage: data.recipeImage[0] }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                "content-type": "multipart/form-data"
            }

        }).then((response) => {
            console.log(response)
            getRecipesList()
            handleClose()
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }

    const searchByName = (e) => {
        getRecipesList(1, e.target.value)
        setSearchString(e.target.value)
    }


    useEffect(() => {
        getRecipesList(1)
        getCategoriesList()
        getAllTags()
    }, [])



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
                            <option selected disabled>tag</option>
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
                            <option selected disabled>category</option>
                            {categoryList?.map((category) => {
                                return <option value={category.id} > {category.id} {category.name}   </option>
                            })}

                        </select>
                        {errors.categoriesIds && errors.categoriesIds.type == 'required'
                            && <span className='text-danger'>field required</span>}
                        {errors.categoriesIds && errors.categoriesIds.type == 'pattern'
                            && <span className='text-danger'>enter an id</span>}

                        <input type="file" className='form-control mt-2' {...register('recipeImage')} />


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

            <Modal show={modalState == 'modal-update'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Update Recipe</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className='from-group' onSubmit={handleSubmit(updateRecipe)} >
                        <label className='fw-bold ms-1' htmlFor="name">name:</label>
                        <input type="text"
                            className='form-control'
                            id='name'
                            {...register('name', {
                                required: true
                            })} />
                        {errors.name
                            && <span className='text-danger d-block'>field required</span>}

                        <label className='fw-bold ms-1 mt-2' htmlFor="price">price:</label>
                        <input type="text"
                            id='price'
                            className='form-control'
                            {...register('price', {
                                required: true
                            })} />
                        {errors.price
                            && <span className='text-danger d-block'>field required</span>}

                        <label className='fw-bold ms-1 mt-2' htmlFor="tagId">tag:</label>
                        <select id="tagId" className='form-select' {...register('tagId', {
                            required: true,
                            pattern: /^[0-9]{1,4}$/
                        })} >
                            <option selected disabled>choose tag</option>
                            {tagList?.map((tag) => {
                                return <option value={tag.id}> {tag.name} {tag.id} </option>
                            })}
                        </select>
                        {errors.tagId && errors.tagId.type == 'required'
                            && <span className='text-danger d-block'>field required</span>}
                        {errors.tagId && errors.tagId.type == 'pattern'
                            && <span className='text-danger d-block'>enter an id</span>}

                        <label className='fw-bold ms-1 mt-2' htmlFor="categoriesIds">category:</label>
                        <select id="categoriesIds" className='form-select' {...register('categoriesIds', {
                            required: true,
                            // pattern: /^[0-9]{1,4}$/,
                        })}>
                            <option selected disabled>choose category</option>
                            {categoryList?.map((category) => {
                                return <option value={category.id}> {category.name} {category.id} </option>
                            })}
                        </select>
                        {errors.categoriesIds && <span className='text-danger d-block'>field required</span>}
                        {/* {errors.categoriesIds && errors.categoriesIds.type == 'pattern'
                            && <span className='text-danger d-block'>enter an id</span>} */}

                        <label className='fw-bold ms-1 mt-2' htmlFor="recipeImage">recipeImage:</label>
                        <input type="file" className='form-control' {...register('recipeImage')} />
                        <img src={`https://upskilling-egypt.com:443/` + recipeObj?.imagePath}
                            className='recipe-img d-block m-auto' alt="no-img" />


                        <label className='fw-bold ms-1  mt-2' htmlFor="description">description:</label>
                        <textarea name=""
                            id="description"
                            cols="60" rows="5"
                            className='d-block' {...register('description', {
                                required: true
                            })} >
                        </textarea>
                        {errors.description && <span className='text-danger d-block'>field required</span>}


                        <button className='btn btn-success mt-4 w-100 fw-bold'>
                            {loading ? <i class="fa-solid fa-spin fa-spinner"></i> : 'Update Recipe'}
                        </button>

                    </form>

                </Modal.Body>
            </Modal>


            <Header>
                <div className='header-container rounded-4 text-white mt-4'>
                    <div className="row align-items-center">
                        <div className="col-sm-10">
                            <div className='p-3'>
                                <h1>Recipes Items</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officia! </p>
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

            <div className='d-flex justify-content-between my-3'>
                <div>
                    <h3>Recipe Table Details</h3>
                    <span>You can check all details</span>
                </div>
                <div>
                    <button onClick={() => { ShowAddRecipeModal() }} className='btn btn-success px-4'>Add New Item</button>
                </div>
            </div>

            <input onChange={searchByName} type="text" className='form-control mb-2' placeholder='search by name' />

            {recipeList?.length == 0 ? <NoData /> : <> <div className='table-responsive'> <table class="table table-striped align-middle text-center ">
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
                <tbody>
                    {recipeList ? <>  {recipeList?.map((recipe, idx) => {
                        return <tr>
                            <th scope="row"> {idx + 1} {recipe.id} </th>
                            <td >{recipe.name}</td>
                            {recipe.imagePath ? <td>
                                <img src={'https://upskilling-egypt.com:443/' + recipe.imagePath} className='recipe-img' alt="" /> </td>
                                : <td> <img src={NoDataImg} className='recipe-img' alt="" /> </td>}

                            <td>{recipe.price} L.E </td>
                            <td>{recipe.description}</td>
                            <td>{recipe.category[0]?.name} {recipe.category[0]?.id} </td>
                            <td>{recipe.tag.name} {recipe.tag.id}</td>
                            <td>
                                <i title='delete' onClick={() => { ShowDeleteRecipeModal(recipe.id) }}
                                    className='fa fa-trash text-danger'
                                    style={{ cursor: 'pointer' }} >
                                </i>
                                <i title='edit' onClick={() => { ShowUpdateRecipeModal(recipe) }} className='fa fa-edit ms-3 text-warning'
                                    style={{ cursor: 'pointer' }} >
                                </i>
                            </td>
                        </tr>


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
                </tbody>
            </table>
            </div>
                <nav aria-label="...">
                    <ul class="pagination pagination-sm">
                        {console.log(pagesArray)}
                        {pagesArray?.map((pageNo, idx) => {
                            return <li onClick={() => { getRecipesList(pageNo, searchString) }} key={idx} class="page-item " aria-current="page">
                                <span className="page-link active" style={{ cursor: "pointer" }}> {pageNo} </span>
                            </li>
                        })}
                    </ul>
                </nav></>}



        </section>
    )
}
