import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useAuthState } from '../States/useAuthState';
import { useChatState } from '../States/useChatState';
import Sidebar from '../Components/Sidebar';
import NoChat from '../Components/NoChat';
import ChatContainer from '../Components/ChatContainer';


const Home = () => {

  const {selectedUser} = useChatState();

  return (
    <div className='page'>
      <Navbar />
      <div className="home">
        <Sidebar />
        {(!selectedUser)?<NoChat />: <ChatContainer />}
      </div>
    </div>
  )
}

export default Home
