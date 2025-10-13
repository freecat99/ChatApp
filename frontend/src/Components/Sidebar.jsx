import React, { useEffect } from 'react'
import { useAuthState } from '../States/useAuthState';
import { useChatState } from '../States/useChatState';

const Sidebar = () => {
  const {authUser} = useAuthState(); 
  const {users, setUserLoad, isUsersLoading, selectedUser, setSelectedUser} = useChatState();
  
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
  
  useEffect(()=>{
    if(authUser){
      getUsers();
    }
  },[authUser]);

  if(isUsersLoading) return <div>
      <div className="w-[100vw] h-full flex items-center justify-center">
        Loading users...
      </div>
  </div>
  return (
    
    <div className='sidebar'>
      <p className="chatHeader">Chats</p>
      <div className="chatContent">
        {users.map((user)=>(
          <button key={user._id}
          onClick={()=>{setSelectedUser(user)}}
          className={(selectedUser && selectedUser?._id===user._id)?'isSelect':''}
          >
            <img src={user.profilepic || '/defaultprofilepic.png'} alt="" />
            <span>{user.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
