import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

const ShowTodos = () => {
    const[showTodo,setShowTodo]=useState<any[]>([
        
    ])
    const navigate = useNavigate()


    const fetch=async()=>{
        try {
            const token=localStorage.getItem("token")
            const result=await axios.get(`${API}/todo/getAllTodo`,{
                headers:{
                    token
                }
            }) 
            setShowTodo(result.data.addTodo) 
            
        } catch (error) {
            console.log(error)
        }
    }

    const onCheckChanged=async(id:string)=>{
        try {
            const token=localStorage.getItem("token")
            await axios.post(`${API}/todo/completeTodo/${id}`,{},{
                headers:{
                    token
                }
            })
            navigate("/dashboard")
        } catch (error) {
           console.error(error) 
        }
    }

    const onDelete=async(id:string)=>{
        try {
            const token=localStorage.getItem("token")
            await axios.delete(`${API}/todo/deleteTodo/${id}`,{
                headers:{
                    token
                }
            })
            navigate("/dashboard")
        } catch (error) {
           console.error(error) 
        }
    }

    useEffect(()=>{
      fetch()  
    },[])

  return (
    <div>
        {
            showTodo.map((todo)=>{
                return <div className='flex justify-between p-4 border-b gap-3'>
                    <input type='checkbox' checked={todo.complete} onChange={()=>{
                        onCheckChanged(todo._id)
                    }}/>
                    <h1 className=' md:text-xl font-serif flex-1'>{todo.title}</h1>
                    <h3 className='text-xs md:text-xl font-serif'>{todo.time}</h3>
                    <button className='text-red-600 p-1 text-xs md:text-md bg-white rounded-md'onClick={()=>
                        onDelete(todo._id)
                    }>Delete</button>
                </div>
            })
        }
    </div>
  )
}

export default ShowTodos