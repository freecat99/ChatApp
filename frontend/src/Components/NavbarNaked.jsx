import React from 'react'
import { useAuthState } from '../States/useAuthState';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <img src="/chatterLogo.png" alt="" />
        <p>Chatter</p>
      </div>
    </div>
  )
}

export default Navbar
