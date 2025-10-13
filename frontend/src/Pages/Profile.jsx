import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import NavbarNaked from '../Components/NavbarNaked';

import {toast, Toaster} from 'react-hot-toast';
import { FaCamera, FaPoundSign } from "react-icons/fa"

const Profile = () => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
    profilepic:'',
    date:'',
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
      const date = new Date(result.createdAt);
      const formatted = date.toLocaleDateString('en-us', {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      setUserInfo({
        name:result.name,
        profilepic:result.profilepic,
        email:result.email,
        date:formatted
      })

    } catch (error) {
      console.log(error);
    }
  }

  const deleteAccount = (e) => {
  e.preventDefault();

  toast((t) => (
    <span className='confirmDeletion'>
      Confirm delete your account?
      <button
        className="btn-active btn-error"
        onClick={async () => {
          toast.dismiss(t.id); 

          try {
            const url = 'http://localhost:1601/auth/deleteAccount';
            const options = { method: 'DELETE', credentials: 'include' };
            const response = await fetch(url, options);
            const result = await response.json();

            if (!result.success) {
              toast.error("Can't delete now, retry later!");
              return;
            }

            toast.success('Deleted your account!');
            setTimeout(() => navigate('/register'), 2000); 
          } catch (err) {
            console.log(err);
            toast.error('Something went wrong.');
          }
        }}
      >
        Delete
      </button>
      <button className="btn-active" onClick={() => toast.dismiss(t.id)}>
        Cancel
      </button>
    </span>
  ));
};


  const updateProfile = async(profilepic) => {
    try {
      const url = 'http://localhost:1601/auth/updateProfilepic';
      const options = {
        method:'PUT',
        credentials:'include',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({profilepic})
      }
      
      const response = await fetch(url, options);
      const result = await response.json();
  

      
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getUser();
  },[])
  
  const handleImageUpload = async(e) => {
    const image = e.target.files[0];
    if(!image){return;}
    
    const reader = new FileReader();
    reader.readAsDataURL(image);
    
    reader.onload = async() => {
      const base64image = reader.result;
      setUploadedImage(base64image);
      
      toast.promise(
        updateProfile(base64image),
        {
          loading: 'Saving...',
          success: <b>Profile Picture saved!</b>,
          error: <b>Could not save.</b>,
        }
      );
    }
  }

  return (
    <div>
      <NavbarNaked/>
    
    <div className='container register profile'>
      <legend>Your Profile</legend>
      <form action="" encType=''> 
        <div className='wholeimage'>
        <img src={uploadedImage || userInfo.profilepic || '/defaultprofilepic.png'} alt="profile picture" className='profilepicture'/>
        <label htmlFor="profilepic" className='profilepic-label'>
          <span><FaCamera className='submitcam' /></span>
          <input type="file" name="profilepic" id="profilepic" accept='image/*' className='hidden' onChange={handleImageUpload}/>
        </label>
        </div>

        <label htmlFor="" className='userInfo'>
          <div className='userInfoTag'>Name</div>
          <p className='userInfoValue'>{userInfo.name}</p>          
        </label>
        <label htmlFor="" className='userInfo'>
          <div className='userInfoTag'>Email address</div>
          <p className='userInfoValue'>{userInfo.email}</p>          
        </label>
        <p><strong>Member since: </strong>{userInfo.date}</p>
        <p><strong>Status: </strong><span className="status">Active</span></p>
        <p><strong>Delete Account? </strong><button className='deleteaccount' onClick={deleteAccount}>Confirm</button></p>
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
