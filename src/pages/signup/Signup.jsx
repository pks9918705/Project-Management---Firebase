import { useState } from "react";

// styles
import "./Signup.css";

import React from "react";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const {signup,isPending,error} =useSignup()

  const handleFileChange = (e) => {
    setThumbnail(null);
    console.log("File changed")
    let selected = e.target.files[0];
    console.log("Selected",selected);

    if (!selected) {
      setThumbnailError("Please select a File");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Please select Image File only");
      return;
    }
    if(selected>10000){
      setThumbnailError("Image size should not exceed 10000");
      return;
    }
    setThumbnailError(null)
    setThumbnail(selected);
    console.log("thumbnail updated successfully")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password, displayName, thumbnail );
    console.log("Submit is clicked successfully")
    signup(email, password, displayName, thumbnail)
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className='error'> {thumbnailError}</div>}
      </label>
      
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
