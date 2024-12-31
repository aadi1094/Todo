
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'

function App() {
  const [isToken, setIsToken] = useState(true)
 
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/> 
        <Route path='/signup' element={<Signup />}/> 

        <Route path="/dashboard" element={isToken ? <Dashboard/>:<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
