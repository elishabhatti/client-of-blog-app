import React from 'react'
import RegisterUser from './pages/RegisterUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import LoginUser from './pages/LoginUser'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/login" element={<LoginUser/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App