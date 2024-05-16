import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../AccountNav"

export default function AccountPage(){
    const [redirect, setRedirect] = useState(null)
    const {user,ready,setUser}=useContext(UserContext)
    // Params
    let {subpage}=useParams()

    // For button styling, if subpage is null, subpage=profile
    if(!subpage){
        subpage = 'profile'
    }

    // Logout
    async function logout(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    // If user information is not ready, return loading, this is important to display loading 
    if(!ready){
        return 'Loading...'
    }

    // If user information is ready, but user does not exist (no token, user not logged in), redirect to login page
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
 
    // 
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <div>
            <AccountNav />
           {
            subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )
           }
           {/* If subpage is acoomodations */}
           {
            subpage === 'places' && (
                <PlacesPage />
            )
           }
        </div>
    )
}