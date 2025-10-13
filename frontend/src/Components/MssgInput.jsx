import React, { useRef, useState } from 'react'
import { FaTimes, FaImage, FaPaperPlane } from "react-icons/fa";
import { useChatState } from '../States/useChatState';
import { toast, Toaster } from 'react-hot-toast'

const MssgInput = () => {

    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const { messages, setMssg, selectedUser } = useChatState();
    const fileInputRef = useRef(null);
    
    const sendMssg = async(newMssg) => {
        try {
            const url = `http://localhost:1601/mssg/send/${selectedUser._id}`;
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMssg)
            };

            const response = await fetch(url, options);
            const result = await response.json();

            setMssg(result.data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(!file)return;
        if(!file.type.startsWith('image/')){
            toast.error('select images!');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
        };

    };
    const removeImage = () => {
        setImagePreview(null);
        if(fileInputRef.current){
            fileInputRef.current.value = '';
        }
    };
    const handleSendMssg = async(e) => {
        e.preventDefault();
        if(!text.trim() && !imagePreview){
            toast.error('write a message to send!');
            return;
        }
        try {
            await sendMssg({
                text:text.trim(),
                image:imagePreview
            });
            setText('');
            setImagePreview(null);
            if(fileInputRef.current){
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
    {imagePreview && (
        <div className="inputImageContainer">
            <img src={imagePreview} alt="preview" />
            <button onClick={removeImage} className='inputPreviewCancel'><FaTimes /></button>
        </div>
    )}
    <form onSubmit={handleSendMssg} className='inputMssgInput'>
        <div>
            <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />
            <button className='imageCancel' type='button' onClick={()=>fileInputRef.current?.click()}><FaImage /></button>
            <input type="text" placeholder='type a message...' value={text} onChange={(e)=>setText(e.target.value)} />
        </div>
        <div>
            <button type='submit' disabled={!text.trim() && !imagePreview}><FaPaperPlane /></button>
        </div>
        
    </form>
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

export default MssgInput
