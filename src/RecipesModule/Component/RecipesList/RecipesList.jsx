import React, { useContext, useEffect, useState } from 'react'
import Mypic from '../../../assets/imgs/Group 48102127.svg'
import Header from '../../../SharedModule/Component/Header/Header'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NoDataImg from '../../../assets/imgs/freepik--Character--inject-70.png'
import noImg from '../../../assets/imgs/noImg.png'
import { Oval } from 'react-loader-spinner';
import NoData from '../../../SharedModule/Component/NoData/NoData';
import ReactPaginate from 'react-paginate';
import { AuthContext } from '../../../Context/AuthContext';
import { ToastContext } from '../../../Context/ToastContext';



export default function RecipesList() {

    const [loading, setLoading] = useState(false)  //loader

    const [recipeList, setRecipeList] = useState(null) // 3shan a3rd el recipes fl table

    const [categoryList, setCategoryList] = useState(null)  //3shan a3rd el categories fl modals 

    const [tagList, setTagList] = useState(null)   // me7tagha 3shan a3rd el taglist fl modals

    const [recipeId, setRecipeId] = useState(0)   // me7tagha fi el api bta3 el update w el delete

    const [pagesArray, setPagesArray] = useState([]) //3shan el pagination yzhrly kam page

    const [searchString, setSearchString] = useState('') //3shan el pagination ama ados 3ala ay page yfdl 3amel search


    const [searchTag, setSearchTag] = useState(null)

    const [searchCat, setSearchCat] = useState(null)

    const [totalNumOfPages, setTotalNumOfPages] = useState(0)

    const { requestHeaders, baseUrl } = useContext(AuthContext)

    const { getToastValues } = useContext(ToastContext)

    const [modalState, setModalState] = useState('close');

    const [recipeDetails, setRecipeDetails] = useState()

    useEffect(() => {
        getRecipesList(1)
        getAllTags()
        getCategoriesList()
    }, [])


    const ShowViewRecipeModal = (id) => {
        setRecipeId(id)
        setModalState('modal-view');
        getRecipeDetails(id)

    }

    const handleClose = () => setModalState('close');

    const getRecipeDetails = (id) => {
        axios.get(`${baseUrl}/Recipe/${id}`, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response.data)
            setRecipeDetails(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const addToFavorite = () => {
        setLoading(true)
        axios.post(`${baseUrl}/userRecipe/`, {
            recipeId: recipeId
        }, {
            headers: requestHeaders

        })
            .then((response) => {
                console.log(response.data.recipe);
                setLoading(false)
                handleClose()
                toast.success('Added successfully to your favorites', {
                    autoClose: 2000
                })
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }


    const getAllTags = () => {
        axios.get(`${baseUrl}/tag/`, {
            headers: requestHeaders
        }).then((response) => {
            console.log(response.data)
            setTagList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCategoriesList = (pageNum, searchName) => {
        axios.get(`${baseUrl}/Category/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
            params: {
                pageSize: 100,
                pageNumber: pageNum,
                name: searchName
            }
        }).then((response) => {
            setCategoryList(response.data.data)
            // setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        }).catch((error) => {
            console.log(error);
        })
    }

    const getRecipesList = (pageNum, searchName, tagId, catId) => {
        axios.get(`${baseUrl}/Recipe/`, {
            headers: requestHeaders,
            params: {
                pageSize: 4,
                pageNumber: pageNum,
                name: searchName,
                tagId: tagId,
                categoryId: catId
            }
        }).then((response) => {
            console.log(response)
            setRecipeList(response.data.data)
            setTotalNumOfPages(response.data.totalNumberOfPages)
            // setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
        }).catch((error) => {
            console.log(error)
        })
    }




    const searchByName = (e) => {
        getRecipesList(1, e.target.value)
        setSearchString(e.target.value)

    }

    const searchByTag = (e) => {
        console.log(e.target.value)
        getRecipesList(1, null, e.target.value, searchCat)
        setSearchTag(e.target.value)

    }

    const searchByCategory = (e) => {
        console.log(e.target.value)
        getRecipesList(1, null, searchTag, e.target.value)
        setSearchCat(e.target.value)

    }

    const handlPageChange = (data) => {
        console.log(data.selected);
        let currentPage = data.selected + 1
        getRecipesList(currentPage, searchString, searchByTag, searchByCategory) // 3ashan ama ados 3ala ay page yfdal 3amel search 
    }






    return (
        <section>

            <Modal show={modalState == 'modal-view'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recipe details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {recipeDetails?.imagePath ?
                            <img src={'https://upskilling-egypt.com:3006/' + recipeDetails?.imagePath} className='w-50' alt="no-data" />
                            : <img src={NoDataImg} alt="no-data" />}

                        <h4 className='text-muted'>Name: {recipeDetails?.name} </h4>
                        <p className='text-muted'>Description: {recipeDetails?.description} </p>

                        <button
                            className='btn btn-success'
                            onClick={addToFavorite}>
                            {loading ? <i className='fa-solid fa-spin fa-spinner px-4'></i>
                                : <span className='fw-bold'>Add To Favorites</span>}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <Header>
                <div className='header-container rounded-4 text-white' style={{ marginTop: '70px' }}>
                    <div className="row align-items-center">
                        <div className="col-sm-10">
                            <div className='p-3'>
                                <h1>Recipes Items</h1>
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


            <div className="row mt-3">
                <div className="col-sm-4">
                    <input onChange={searchByName} type="text" className='form-control mb-2' placeholder='search by name' />
                </div>
                <div className="col-sm-4">
                    <select onChange={searchByTag} className='form-select'>
                        <option value='' selected>search by tag</option>
                        {tagList?.map((tag) => { return <> <option value={tag.id}> {tag.name} </option> </> })}

                    </select>
                </div>
                <div className="col-sm-4">
                    <select onChange={searchByCategory} className='form-select'>
                        <option value='' selected >search by category</option>
                        {categoryList?.map((cat) => { return <option value={cat.id}> {cat.name} </option> })}
                    </select>
                </div>
            </div>




            {recipeList?.length == 0 ? <NoData /> : <> <div className='table-responsive'> <table class="table table-striped align-middle ">
                <thead>
                    <tr className=''>

                        <th className='t-h py-3 rounded-start-4' scope="col">Name</th>
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

                            <td >{recipe.name}</td>
                            {recipe.imagePath ? <td>
                                <img src={'https://upskilling-egypt.com:3006/' + recipe.imagePath} className='recipe-img' alt="" /> </td>
                                : <td> <img src={noImg} className='recipe-img' alt="" /> </td>}

                            <td>{recipe.price} L.E </td>
                            <td>{recipe.description}</td>
                            <td>{recipe.category[0]?.name} </td>
                            <td>{recipe.tag.name} </td>
                            <td>

                                <i title='edit' className='fa fa-eye ms-3 text-success'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { ShowViewRecipeModal(recipe.id) }}>
                                </i>
                            </td>
                        </tr>


                    })} </> : <p
                        className='d-flex justify-content-center align-items-center'>
                        <Oval
                            height={60}
                            width={60}
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass="d-flex justify-content-center"
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={5}
                            strokeWidthSecondary={5}
                        /></p>}
                </tbody>
            </table>
            </div>
                <ReactPaginate
                    breakLabel={'...'}
                    pageCount={totalNumOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={4}
                    onPageChange={handlPageChange}
                    containerClassName='pagination justify-content-end'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    activeClassName='active'
                /></>}



        </section>
    )
}
