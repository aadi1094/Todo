import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const API = import.meta.env.VITE_API_URL
const Todoform = () => {
    const[todoData,setTodoData]=useState({
        title:"",
        time:""
    })
    const navigate = useNavigate()

    const[add,setAdd]=useState(false)

    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name == 'time'){
            setTodoData(
                {
                    ...todoData,
                    [e.target.name]:e.target.value.replace("T", " ")
                }
            )
        }
        else{
            setTodoData(
                {
                    ...todoData,
                    [e.target.name]:e.target.value
                }
            )
        }
    }

    const onAdd=()=>{
        setAdd(!add)
    }

    const addTodo=async()=>{
        try {
            const token=localStorage.getItem("token")
            await axios.post(`${API}/todo/add`,todoData,{
                headers:{
                    token
                }
            }
            )
            alert("Todo created")
            navigate("/dashboard")

        } catch (error) {
           console.log(error) 
        }
    }
  return (
    <div>
        <button className=' absolute bottom-8 md:bottom-16 right-8 md:right-16 w-12 h-12 bg-pink-400 rounded-full text-2xl 'onClick={onAdd}>+</button>
        {
            add && <div className='flex flex-col gap-4 mt-4'>
            <input name='title'onChange={onChange} placeholder='Enter title' className='p-2 rounded-lg placeholder:text-gray-700 font-serif text-2xl'/>
            <input name='time'type='datetime-local' onChange={onChange} placeholder='Enter time' className='p-2 rounded-lg placeholder:text-gray-700'/>
            <div className='flex justify-end'>
                <button className='bg-green-400 rounded-xl text-xl w-1/6 p-2' onClick={addTodo}>Add</button>
            </div>

        </div>


        }

        
    </div>
  )
}

export default Todoform