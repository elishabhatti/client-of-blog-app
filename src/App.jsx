import React from 'react'
import RegisterUser from './pages/RegisterUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import LoginUser from './pages/LoginUser'
import WriteArticle from './pages/WriteArticle'
import LogoutUser from './pages/LogoutUser'
import SaveArticle from './pages/SaveArticle'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/login" element={<LoginUser/>}/>
        <Route path="/logout" element={<LogoutUser/>}/>
        <Route path="/write" element={<WriteArticle/>}/>
        <Route path="/save" element={<SaveArticle/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App