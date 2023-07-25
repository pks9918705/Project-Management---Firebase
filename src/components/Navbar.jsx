import './Navbar.css'
import { Link } from 'react-router-dom'
// styles and images

import React from 'react'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt="dojo temple" />
                <span>The Dojo</span>
            </li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
       
            <li>
                <button className='btn'>LogOut</button>
            </li>
           
        </ul>
      
    </div>
  )
}


