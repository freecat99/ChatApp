import React, { useEffect } from 'react'

import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { useAuthState } from './States/useAuthState'

function App() {
  const {authUser, checkAuth} = useAuthState();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});


  return (
    <div>
        <Navbar/>

        <Routes>
          <Route path='/home' element={authUser?<Home/>:<Navigate to = '/login'/>}/>
          <Route path='/login' element={authUser?<Login/>:<Navigate to = '/register'/>}/>
          <Route path='/register' element={!authUser?<Register/>:<Navigate to = '/login'/>}/>
          <Route path='/profile' element={authUser?<Profile/>:<Navigate to = '/login'/>}/>
        </Routes>

    </div>
  )
}

export default App
