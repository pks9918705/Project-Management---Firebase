import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddICon from "../assets/add_icon.svg";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Sidebar.css";

export default function Sidebar() {
  const { user, authIsReady } = useAuthContext();

  // User display name or fallback to an empty string
  const userName = user ? user.displayName : "";

  // Short-circuit rendering for authIsReady check
  return authIsReady && (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
            {/* avatar  */}
             {user? <><p>Hey user</p>
          <small>{userName}</small></>:<p>Login / Signup</p>}
          
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon " />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddICon} alt="Add icon " />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
