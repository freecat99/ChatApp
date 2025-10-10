import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import NavbarNaked from '../Components/NavbarNaked';

import {toast, Toaster} from 'react-hot-toast';
import { FaUser, FaCamera , FaKey, FaEye, FaEyeSlash  } from "react-icons/fa"

const Profile = () => {
  const navigate = useNavigate();
  const id = useParams('id');
  console.log('here',id)
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    profilepic:''
  })
  const getUser = async() =>{
    try {
      const url = 'http://localhost:1601/auth/check';
      const options = {
        method:'GET',
        credentials:'include'
      }
      const response = await fetch(url, options);
      const result = await response.json();
      setUserInfo({
        name:result.name,
        profilepic:result.profilepic,
        email:result.email,
      })

    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

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
    
    <div className='container register profile'>
      <legend>Your Profile</legend>
      <form action="" onSubmit={handleSubmit} encType=''> 
        <label htmlFor="profilepic" className='profilepic'>
          <input type="file" name="profilepic" id="profilepic" />
        <button type="submit" className='submitcam'><FaCamera /></button>
        </label>
        <label htmlFor="" className='userInfo'>
          <div className='userInfoTag'>Name</div>
          <p className='userInfoValue'>{userInfo.name}</p>          
        </label>
        <label htmlFor="" className='userInfo'>
          <div className='userInfoTag'>Email address</div>
          <p className='userInfoValue'>{userInfo.email}</p>          
        </label>
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

export default Profile
