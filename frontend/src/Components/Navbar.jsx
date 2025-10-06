import React from 'react'
import { useAuthState } from '../States/useAuthState';

const Navbar = () => {
  const {authUser} = useAuthState();    
  return (
    <div>
      Navbar
    </div>
  )
}

export default Navbar
