import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
export default function RegisterPage(){
    // States we will use to register user
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    // Register user handler
    async function registerUser(ev){
        ev.preventDefault()
        // Try creating user
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            })
            alert('Registration Successful. Now you can log in')
        }catch(e){
            alert('Registration Failed. Now you can log in')
        }
    }

    return(
        <div className="mt-4 grow flex justify-around items-center">
            {/* Login Box */}
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input  type="text" 
                            placeholder="John Doe" 
                            value={name}
                            onChange={ev=>setName(ev.target.value)} />
                    <input  type="email" 
                            placeholder='your@email.com' 
                            value={email}
                            onChange={ev=>setEmail(ev.target.value)}/>
                    <input  type="password" 
                            placeholder="password" 
                            value={password} 
                            onChange={ev=>setPassword(ev.target.value)}/>
                    <button className="login">Register</button>
                    <div className="text-center py-2 text-gray-500 ">Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}