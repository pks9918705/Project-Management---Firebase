import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddICon from '../assets/add_icon.svg'

import React from 'react'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-content">
            <div className="user">
                {/* avatar and username here  */}
                <p>Hey user</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink to='/'>
                            <img src={DashboardIcon} alt="dashboard icon " />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={AddICon} alt="Add icon " />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
      
    </div>
  )
}
