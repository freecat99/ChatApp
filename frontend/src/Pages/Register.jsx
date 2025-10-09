import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarNaked from '../Components/NavbarNaked';

import {toast, Toaster} from 'react-hot-toast';
import { FaUser, FaEnvelope, FaKey, FaEye, FaEyeSlash  } from "react-icons/fa"

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const toggleShow = () =>{
    show?setShow(false):setShow(true);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
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

    if(result.error){
      toast.error(result.error, {position:'bottom-right'});
    }else{
      toast.success('Registered!', {position:'bottom-right'})
      setTimeout(()=>{
        navigate('/login');
      }, 2000)
    }

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
          <input type={show?'text':'password'} name="password" id="password" placeholder='Password' required onChange={handleChange}/>
          <>
            <span className='eye' onClick={toggleShow}>{show?<FaEye />:<FaEyeSlash />}</span>
          </>
        </label>
        <button type="submit ">Register</button>
        <p>Already have an account? <span className="togglelog linkthis" onClick={()=>{navigate('/login')}}>Login here</span></p>
      </form>

    </div>
    <Toaster 
    toastOptions={{
      style:{
        backgroundColor:'#1d232a',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        color:'white'
      }
    }}
    />
    </div>
  )
}

export default Register
