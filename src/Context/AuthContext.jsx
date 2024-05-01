import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'

export let AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {


    const [userData, setUserData] = useState({})



    let requestHeaders =
        { Authorization: `Bearer ${localStorage.getItem('userToken')}` }

    let baseUrl = "https://upskilling-egypt.com:3006/api/v1"


    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            saveUserData()
        }
    }, [])


    const saveUserData = () => {
        const encodedToken = localStorage.getItem('userToken')
        const decodedToken = jwtDecode(encodedToken)
        setUserData(decodedToken)
    }


    return (
        <AuthContext.Provider value={{
            userData,
            saveUserData,
            requestHeaders,
            baseUrl
        }}>
            {children}
        </AuthContext.Provider>
    )
}
