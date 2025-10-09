import React from 'react'
import { useAuthState } from '../States/useAuthState';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {authUser} = useAuthState(); 
  const navigate = useNavigate(); 
  
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
  
  return (
    <>
    <div className="navbar">
      <div>
        <img src="./chatterLogo.png" alt="" />
        <p>Chatter</p>
      </div>
      <button onClick={handleLogout}><a>{authUser?'Logout':'Login'}</a></button>
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
    </>
  )
}

export default Navbar
