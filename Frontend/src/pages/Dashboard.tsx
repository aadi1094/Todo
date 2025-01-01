import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todoform from "../components/Todoform";
import ShowTodos from "../components/ShowTodos";

const API = import.meta.env.VITE_API_URL
const Dashboard = () => {

  const[user,setUser]=useState({
    username:"",
    email:""
  })

  const navigate=useNavigate()
  useEffect(()=>{
    const fetchdata=async()=>{
      const token=localStorage.getItem("token")
      if(!token) navigate("/")

      const result=await axios.get(`${API}/user/getuserinfo`,{
        headers:{
          token
        }
      })
      setUser({
        username:result.data.user.username,
        email:result.data.user.email
      })
    }
    fetchdata()
  },[])

  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/")
  }
  
  return (
    <div className="min-h-screen bg-[#862FEE] p-5">
      <header className="flex justify-between p-4 bg-indigo-300 rounded-2xl w-4/5 mx-auto">
        <div>
          <h1 className="text-2xl font-serif font-bold">Todos</h1>
        </div>
        <div className="flex gap-7 items-center">
          <div className="text-xl font-mono">{user.username}</div>
          <div>
            <button className="bg-purple-400 p-2 rounded-md text-purple-950" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>
        <div className="w-1/2 text-center p-2 font-mono mx-auto md:text-xl text-white">{new Date().toDateString()}</div>
      <div className="w-full md:w-1/2 mx-auto bg-[#E5ADC3] min-h-[70vh] relative p-3 rounded-lg mt-3">
        <Todoform/>
        <ShowTodos/>
      </div>
      <footer className="text-center font-bold text-white">
        &copy;Aditya Chawale❤️
      </footer>
    </div>
  );
};

export default Dashboard;
