import "./Navbar.css";
import { Link } from "react-router-dom";
// styles and images

import React from "react";
import Temple from "../assets/temple.svg";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout, isPending, error } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo temple" />
          <span>Project Management</span>
        </li>
        {!user && <>
          <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        </>}
       

        {user && (
          <li>
            {isPending && (
              <button disabled className="btn">
                Loading...
              </button>
            )}
            {!isPending && (
              <button className="btn" onClick={logout}>
                LogOut
              </button>
            )}
            {error && <div className="error">{error}</div>}
          </li>
        )}
      </ul>
    </div>
  );
}

/*
Typically, you would use the second approach (onClick={() => logout}) when you need to pass additional arguments or handle the event object in the logout function.  
*/
