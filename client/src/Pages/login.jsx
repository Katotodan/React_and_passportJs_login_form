import { useContext, useState } from "react"
import {useLoaderData, Navigate} from "react-router-dom"
import axios from "axios"
export const Login = () =>{
    const [userInfo, setUserInfo] = useState({
        "username": "",
        "password": ""
    })
    const handleLogin = async (e) =>{
        e.preventDefault()
        axios.post("http://localhost:5000/login",userInfo ,{
            withCredentials: true, // enable sending cookies
            headers: {
                'Content-Type': 'application/json',
            },

        })
        .then((res) =>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        // await setCurrentUser(userInfo)
        // setNavi(true)
    }
    const handlChange = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value   
        })
    }
    return(
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter your Username" id="username" name="username" 
                    onChange={handlChange} value={userInfo.username}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" 
                    onChange={handlChange} value={userInfo.password}/>
                </div>
                <span>Don't have an account? <a href="/signup">Sign up</a></span>
                <br/>
                <button type="submit" onSubmit={handleLogin}>Log in</button>
            </form>
        </div>
    )
}