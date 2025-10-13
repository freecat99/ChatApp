import React from 'react'
import { FaTimes } from "react-icons/fa";
import { useChatState } from '../States/useChatState'

const ChatContainer = () => {
  const {selectedUser, setSelectedUser} = useChatState();
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
      <div className="chatContainerChats"></div>
      <div className="chatContainerInput"></div>
    </div>
  )
}

export default ChatContainer
