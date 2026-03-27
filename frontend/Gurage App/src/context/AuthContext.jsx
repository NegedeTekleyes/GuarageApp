

import React, { useContext, useEffect, useState } from "react";
import getAuth from "../utils/auth";

const AuthContext = React.createContext()

// Create custome hook to store authcontextcd 
export const useAuth = () => {
    return useContext(AuthContext)
}

// create provider
export const AuthProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [employee, setEmployee] = useState(null)

    const value = {isLogged,isAdmin,setIsAdmin,setIsLogged,employee}

   useEffect(() => {
  const loadAuth = async () => {
    try {
      const response = await getAuth()
      console.log("AUTH RESPONSE:", response)

      if (!response) return

      if (response) {
        setIsLogged(true)
      }

      if (response.employee_role === 3) {
        setIsAdmin(true)
      }

      setEmployee(response)
    } catch (err) {
      console.log("AUTH ERROR:", err)
    }
  }

  loadAuth()
}, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}