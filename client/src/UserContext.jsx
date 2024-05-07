import axios from "axios";
import { createContext, useEffect, useState } from "react"

// Creates the context with object as default value, it's an empty object because its going to be replaced by a user object
export const UserContext = createContext({});

// Provides the context
export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    // Where I stopped
    useEffect(()=>{
        if(!user){
            axios.get('/profile')
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

// This provider component is imported in app.jsx
