import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const changePage = (e) => {
    console.log(e.target)
    navigate(`/${e.target.textContent.toLowerCase()}`);
  };

  return (
    <div className="flex gap-2 justify-center">
      <button className="btn" onClick={changePage}>Home</button>
      <button className="btn" onClick={changePage}>Collections</button>
      <button className="btn" onClick={changePage}>Signup</button>
      <button className="btn" onClick={changePage}>Login</button>
    </div>
  )
}