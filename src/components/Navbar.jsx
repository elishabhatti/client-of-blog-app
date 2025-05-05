import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-950 text-white px-8 pt-5'>
        <header className='flex justify-between'>
            <div>
                <h1 className='text-2xl'>Blog App</h1>
            </div>  
            <nav>
                <ul className='flex gap-5 justify-between'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar