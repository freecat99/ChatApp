import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useAuthState } from './States/useAuthState';
import NotFound from './Pages/NotFound';

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthState();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("here", { authUser });

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-white">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile/:id"
          element={authUser ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
