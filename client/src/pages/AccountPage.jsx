import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"

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

    // Active Links
    function linkClasses(type=null){
        let classes ='py-2 px-6'
        // If type and subpage are the same, that means that subpage is being selected
        if(type === subpage){
            classes += ' bg-cherry rounded-full text-white'
        }
        return classes
    }

    // 
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <div>
            {/* Semantic html */}
           <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
           </nav>
           {/* If subpage is profile */}
           {
            subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )
           }
        </div>
    )
}