import { useState } from "react"
import axios from "axios"
export const Signup = () =>{
    const [userInfo, setUserInfo] = useState({
        "username":"",
        "password":"",
        "email":""
    })
    const handleSingUp = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/signup", userInfo, {
            withCredentials: true, // enable sending cookies
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response)=> console.log(response))
        .catch(err => console.log(err))
    }
    const handleChange = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div>
            <h1>Sign in</h1>
            <form onSubmit={handleSingUp}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter your Username" id="username" 
                    name="username" onChange={handleChange} value={userInfo.username}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter your Email" id="email"
                    name="email" onChange={handleChange} value={userInfo.email}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your Password" 
                    name="password" onChange={handleChange} value={userInfo.password}/>
                </div>
                <span>Already have an account? <a href="/login">Log in</a></span>
                <br/>
                <button type="submit" onSubmit={handleSingUp}>Sign up</button>
            </form>
        </div>
    )
}