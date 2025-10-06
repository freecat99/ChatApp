import React from 'react'
import { useAuthState } from '../States/useAuthState';

const Navbar = () => {
  const {authUser} = useAuthState();    
  return (
    <div className="navbar">
      <div>
        <img src="./chatterLogo.png" alt="" />
        <p>Chatter</p>
      </div>
      <button><a>{authUser?'Logout':'Login'}</a></button>
    </div>
  )
}

export default Navbar
