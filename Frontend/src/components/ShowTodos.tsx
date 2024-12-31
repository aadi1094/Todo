import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShowTodos = () => {
    const[showTodo,setShowTodo]=useState<any[]>([
        {
            title:"kk",
            time:"10pm"
        }
    ])

    const fetch=async()=>{
        try {
            const token=localStorage.getItem("token")
            const result=await axios.get("http://localhost:6969/todo/getAllTodo",{
                headers:{
                    token
                }
            }) 
            setShowTodo(result.data.addTodo) 
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
      fetch()  
    },[])

  return (
    <div>
        {
            showTodo.map((todo)=>{
                return <div className='flex justify-between p-4 border-b'>
                    <h1 className=' text-xl font-serif'>{todo.title}</h1>
                    <h3 className=' text-xl font-serif'>{todo.time}</h3>
                </div>
            })
        }
    </div>
  )
}

export default ShowTodos