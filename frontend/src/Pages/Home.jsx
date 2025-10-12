import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useAuthState } from '../States/useAuthState';
import { useChatState } from '../States/useChatState';
import Sidebar from '../Components/Sidebar';
import NoChat from '../Components/NoChat';
import ChatContainer from '../Components/ChatContainer';


const Home = () => {

  const {authUser} = useAuthState(); 
  const {setMssgLoad, setUserLoad, selectedUser} = useChatState();

  const getUsers = async() =>{
    try {
      setUserLoad(true, []);

      const url = "http://localhost:1601/mssg/users";
      const options= {
        method:'GET',
        credentials:'include'
      };
      const response = await fetch(url, options);
      const result = await response.json();

      setUserLoad(false, result);

    } catch (error) {
      console.log(error);
    }
  }
  
  const getMssgs = async() =>{
    try {
      setMssgLoad(true, []);

      const url = `http://localhost:1601/mssg/${authUser}`;
      const options= {
        method:'GET',
        credentials:'include'
      };
      const response = await fetch(url, options);
      const result = await response.json();

      setMssgLoad(false, result);

    } catch (error) {
      console.log(error);
    }
  }

useEffect(()=>{
  if(authUser){
    getMssgs();
    getUsers();
  }
},[authUser])

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
