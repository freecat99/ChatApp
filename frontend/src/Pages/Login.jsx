import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaKey } from "react-icons/fa"

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='container register'>
      <legend>Welcome Back</legend>
      <form action="">
        <label htmlFor="email input">
          <div className="icon"><FaEnvelope /></div>
          <input type="email" name="email" id="email" placeholder='Email' required />
        </label>
        <label htmlFor="password input">
          <div className="icon"><FaKey /></div>
          <input type="password" name="password" id="password" placeholder='Password' required />
        </label>
        <button type="submit ">Login</button>
        <p>Don't have an account? <span className="togglelog linkthis" onClick={()=>{navigate('/register')}}>Register here</span></p>
      </form>

    </div>
  )
}

export default Login
