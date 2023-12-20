import React, { createContext } from 'react'
import { toast } from 'react-toastify'

export let ToastContext = createContext(null)

export default function ToastContextProvider({ children }) {

    const getToastValues = (type, message) => {
        return toast[type](message, {
            autoClose: 2500
        })
    }

    return (

        <ToastContext.Provider value={getToastValues}>
            {children}
        </ToastContext.Provider>
    )
}
