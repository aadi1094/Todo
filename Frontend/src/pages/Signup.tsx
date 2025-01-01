import React, { useState } from 'react'
import SignInBg from "../assets/signupBg.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

const Signup = () => {
    const [formdata, setFormdata] = useState({
        email:"",
        password:"",
        username:""
    })

    const navigate=useNavigate()

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=async ()=>{

        try {
            const res=await axios.post(`${API}/user/signup`,formdata);
            const data=res.data
            localStorage.setItem('token', data.token)
            navigate("/dashboard")
            
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div className='min-h-screen relative'>

        <img src={SignInBg} className='absolute inset-0 w-full h-full z-0' />

      <div className='absolute inset-0 z-96 flex justify-center items-center w-full h-screen'>
        <div className='bg-white/10 backdrop-blur-lg w-4/5 md:w-1/4 h-fit p-4'>
            <div className='flex justify-center mb-2'>
                <h1 className='flex justify-center items-start text text-2xl font-serif text-black '>Signup</h1>
            </div>
            <div className='flex justify-center items-center flex-col gap-5 p-4'>
                <input placeholder='Username'onChange={onChange} name="username" className='placeholder-gray-900 p-3 w-4/5 rounded-full  border-white border-2 bg-transparent'/>
                <input placeholder='Email'onChange={onChange} name="email" className='placeholder-gray-900 p-3 w-4/5 rounded-full  border-white border-2 bg-transparent'/>
                <input type='password' placeholder='Password'onChange={onChange} name="password" className='placeholder-gray-900 p-3 w-4/5 rounded-full  border-white border-2 bg-transparent'/>
                
            </div>

            <div className='flex justify-center'>
                <button onClick={onSubmit} className='w-24 bg-purple-600 rounded-lg h-10 '>Signup</button>
            </div>
            <div className='flex justify-center pt-2'>
                <p className='pt-1 text-white'>Already have account?  </p>
                <a href='/'><button  className='text underline px-2 text-white ' >Login</button></a>
            </div>

        </div>
      </div>

    </div>
  )
}

export default Signup