import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa"

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className='container register'>
      <legend>Create Account</legend>
      <form action="">
        <label htmlFor="name input">
          <div className="icon"><FaUser/></div>
          <input type="text" name="name" id="name" placeholder='Name' required />
        </label>
        <label htmlFor="email input">
          <div className="icon"><FaEnvelope /></div>
          <input type="email" name="email" id="email" placeholder='Email' required />
        </label>
        <label htmlFor="password input">
          <div className="icon"><FaKey /></div>
          <input type="password" name="password" id="password" placeholder='Password' required />
        </label>
        <button type="submit ">Register</button>
        <p>Already have an account? <span className="togglelog linkthis" onClick={()=>{navigate('/login')}}>Login here</span></p>
      </form>

    </div>
  )
}

export default Register
