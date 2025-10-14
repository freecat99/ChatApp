import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarNaked from '../Components/NavbarNaked';

import {toast, Toaster} from 'react-hot-toast';
import { FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa"
import { useAuthState } from '../States/useAuthState';

const Login = () => {
  const navigate = useNavigate();
  const {setAuthUser, connectSocket} = useAuthState();
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
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
    

    const url = 'http://localhost:1601/auth/login';
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
    console.log('res', result)
    if(!result.success){
      toast.error(result.message, {position:'bottom-right'});
    }else{
      toast.success('Logged in!', {position:'bottom-right'});
      setAuthUser(result.token);
      connectSocket();
      setTimeout(()=>{
        navigate('/home');
      },2000)

    }

  }

  return (
    <div>
      <NavbarNaked/>
    
    <div className='container register'>
      <legend>Welcome Back</legend>
      <form action="" onSubmit={handleSubmit}> 
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
        <button type="submit ">Login</button>
        <p>Don't have an account? <span className="togglelog linkthis" onClick={()=>{navigate('/register')}}>Register here</span></p>
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

export default Login
