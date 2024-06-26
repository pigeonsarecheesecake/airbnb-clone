import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function LoginPage(){
    // States for login page
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    // Login page sets user information using the data retrieved from database
    // Context user
    const {setUser} = useContext(UserContext)

    // Submit handler
    const handleLoginSubmit = async (ev)=>{
        ev.preventDefault()
        try{
            // research what withCredentials:true does
            const {data} = await axios.post('/login',{email,password})
            setUser(data)
            console.log(data)
            alert('login successful')
            setRedirect(true);
        }catch(e){
            alert(e.message)
        }
    }

    // If redirect is true
    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <div className="mt-4 grow flex justify-around items-center">
            {/* Login Box */}
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input  type="email" 
                            placeholder='your@email.com' 
                            value={email} 
                            onChange={(ev)=>setEmail(ev.target.value)}></input>
                    <input  type="password" 
                            placeholder="password" 
                            value={password} 
                            onChange={(ev)=>setPassword(ev.target.value)}></input>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500 ">Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}