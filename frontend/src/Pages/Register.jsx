import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa"
import NavbarNaked from '../Components/NavbarNaked';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    let copyUserInfo = {...userInfo};
    copyUserInfo[name] = String(value);
    setUserInfo(copyUserInfo);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const url = 'http://localhost:1601/auth/register';
    const options = {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials:'include',
      body:JSON.stringify(userInfo)
    }

    const response = await fetch(url, options);
    const result = await response.json();
    console.log('res', result);

  }

  return (
    <div>
      <NavbarNaked/>
    
    <div className='container register'>
      <legend>Create Account</legend>
      <form action="" onSubmit={handleSubmit}> 
        <label htmlFor="name input">
          <div className="icon"><FaUser/></div>
          <input type="text" name="name" id="name" placeholder='Name' required onChange={handleChange}/>
        </label>
        <label htmlFor="email input">
          <div className="icon"><FaEnvelope /></div>
          <input type="email" name="email" id="email" placeholder='Email' required onChange={handleChange}/>
        </label>
        <label htmlFor="password input">
          <div className="icon"><FaKey /></div>
          <input type="password" name="password" id="password" placeholder='Password' required onChange={handleChange}/>
        </label>
        <button type="submit ">Register</button>
        <p>Already have an account? <span className="togglelog linkthis" onClick={()=>{navigate('/login')}}>Login here</span></p>
      </form>

    </div>
    </div>
  )
}

export default Register
