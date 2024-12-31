import React, { useState } from 'react'
import SignInBg from "../assets/Signin_BG.jpg"
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
const Login = () => {
    const [formdata, setFormdata] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async () => {
        try{
            const res = await axios.post('http://localhost:6969/user/login',formdata);
            const data = res.data
            localStorage.setItem('token', data.token)
            navigate("/dashboard")
        }catch(err){
            console.log(err);
        }
    }



  return (
    <div className='min-h-screen relative'>

        <img src={SignInBg} className='absolute inset-0 w-full h-full z-0' />

      <div className='absolute inset-0 z-96 flex justify-center items-center w-full h-screen'>
        <div className='bg-white/10 backdrop-blur-lg w-96 h-96 p-4'>
            <div className='flex justify-center mb-4'>
                <h1 className='flex justify-center items-start text text-2xl font-serif text-black '>Login</h1>
            </div>
            <div className='flex justify-center items-center flex-col gap-5 p-4'>
                <input placeholder='Email'onChange={onChange} name="email" className= 'placeholder-gray-900 p-4 w-72 rounded-full  border-white border-2 bg-transparent'/>
                <input type='password' placeholder='Password'onChange={onChange} name="password" className='placeholder-gray-900 p-4 w-72 rounded-full  border-white border-2 bg-transparent'/>
                <p className='text-white'>Forgot Password?</p>
            </div>

            <div className='flex justify-center'>
                <button onClick={onSubmit} className='w-24 bg-purple-600 rounded-lg h-10 '>Login</button>
            </div>
            <div className='flex justify-center pt-2'>
                <p className='pt-1 text-white'>Don't have account?  </p>
                <a href='/signup'><button className='text underline px-2 text-white' >Signup</button></a>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Login