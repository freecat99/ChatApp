import React, { useEffect, useState } from 'react'
import { useAuthState } from '../States/useAuthState';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {authUser} = useAuthState(); 
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name:'',
    profilepic:'',
    userId:''
  })
  const navigate = useNavigate();


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
        userId:result._id,
      })

    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

  const handleLogout = async() =>{
    try {
      const url = 'http://localhost:1601/auth/logout';
      const options = {
        method:'POST',
        credentials:'include'
      }
      const response = await fetch(url, options);
      const result = await response.json();
      toast.success(result.message, {position:'bottom-right'});

      setTimeout(()=>{
        window.location.reload();

      },2000)

    } catch (error) {
      console.log(error);
    }
  }
  
  const handleProfile = () => {
    navigate(`/profile/${userInfo.userId}`);
  }

  useEffect(()=>{
    
  getUser();
  },[])

  return (
    <>
    {(!isLoading)? 
      <div className="navbar">
        <div>
          <img src="./chatterLogo.png" alt="" />
          <p>Chatter</p>
        </div>
        <div>
          {authUser && (
            <button onClick={handleProfile} className='fragment'>
              <img src={userInfo.profilepic || '/defaultprofilepic.png'} alt="profilepic" className='profilepic'/>
              <span>{`${userInfo.name}`}</span>
            </button>
          )}
          <button onClick={handleLogout}>{authUser?'Logout':'Login'}</button>
        </div>
      </div>
      :
      <span className="loading loading-dots loading-lg"></span>

    }
    
    <Toaster 
        toastOptions={{
          style:{
            backgroundColor:'#1d232a',
            border: '1px solid rgba(255, 255, 255, 0.125)',
            color:'white'
          }
        }}
    />
    </>
  )
}

export default Navbar
