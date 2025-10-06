import React, { useEffect } from 'react'

import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { useAuthState } from './States/useAuthState'
import NotFound from './Pages/NotFound'

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
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>

    </div>
  )
}

export default App
