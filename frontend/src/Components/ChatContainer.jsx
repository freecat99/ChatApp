import React, { useEffect } from 'react'
import { FaTimes } from "react-icons/fa";
import { useChatState } from '../States/useChatState'
import { useAuthState } from '../States/useAuthState';
import MssgInput from './MssgInput';

const ChatContainer = () => {
  
  const {authUser} = useAuthState(); 
  const {mssgs, setMssgLoad, isMssgsLoading, selectedUser, setSelectedUser} = useChatState();


  const getMssgs = async() =>{
        try {
          setMssgLoad(true, []);
  
          const url = `http://localhost:1601/mssg/${selectedUser._id}`;
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
      }
    },[selectedUser._id]);
  

  if (isMssgsLoading) {
  return (
    <div className="chatContainer">
      <div className="flex-col">
        <div className="chatContainerHeader">
          <div>
            <img
              src={selectedUser?.profilepic || '/defaultprofilepic.png'}
              alt=""
            />
            <span>{selectedUser?.name}</span>
          </div>
          <div>
            <button
              className="cancel"
              onClick={() => setSelectedUser(null)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="flex h-[60vh] items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
          &nbsp;Loading chats...
        </div>
      </div>
    </div>
  );
}

  return (
    <div className='chatContainer'>
      <div className="chatContainerHeader">
        <div>
          <img src={selectedUser.profilepic || '/defaultprofilepic.png'} alt="" />
          <span>{selectedUser.name}</span>
        </div>
        <div>
          <button className='cancel' onClick={()=>{setSelectedUser(null)}}><FaTimes /></button>
        </div>
      </div>
      <div className="chatContainerChats">
      </div>
      <div className="chatContainerInput">
        <MssgInput />
      </div>
    </div>
  )
}

export default ChatContainer
