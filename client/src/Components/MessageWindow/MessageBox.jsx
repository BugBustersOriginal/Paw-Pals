import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";
import axios from 'axios';

const MESSAGE_SERVER_IMG_VIEWED = 'http://localhost:1234/imgViewed';
const MESSAGE_SERVER_IMG_DLED = 'http://localhost:1234/imgDled'

export default function MessageBox(props) {
  const [img, setimg]  = useState(false);
  const [url, seturl]  = useState('');
  const [type, settype] = useState(props.type)
  const [content, setcontent] = useState(props.content);
  const [isSender, setIsSender] =useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  console.log("propos", props)
  if(props.type === 'image' && url === '') {
    seturl((props.content))
    if(props.view === true){
      setcontent('snap expired')
    }
  } else{
    console.log("url", url)
  }
  const showSnap = () =>{
    setimg(true)
    setShowSaveButton(true);
    resolveAfterXSeconds(props.expirationTime)
  }
  useEffect(()=>{
    // console.log("img", img)
    // console.log(`url is equal to`, url)
  },[url])

  const resolveAfterXSeconds=(expirationTime) => {
    //console.log(`expirationTime is equal to ${expirationTime}`);
    var prom = new Promise(resolve => {
      setTimeout(() => {
        seturl('');
        settype('expired')
        setcontent('Snap deleted')
        axios.post(MESSAGE_SERVER_IMG_VIEWED, {msgID : props.msgId, convID: props.convId })
      }, expirationTime);
    });
  }


  const download = async() =>{
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "snap.png";
    document.body.appendChild(a);
    console.log(a)
    a.click();
    document.body.removeChild(a);
    console.log("sender", props.sender)
    console.log("downloader: ", props.currentUser);
    axios.post(MESSAGE_SERVER_IMG_DLED, {sender: props.sender, downloader: props.currentUser})
  }

  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }


  useEffect (() => {
    //console.log (`props.sender is equal to ${props.sender} and  ${props.currentUser}`)
    if(props.sender !== undefined && props.currentUser !== undefined) {
      setIsSender(props.sender.toString() === props.currentUser.toString())
    }
   }, [props.sender, props.currentUser]);

   if(type === "image"){
    return (

      <div className ={`msg_box${isSender? ' sent':''}`}>
        <div>
        <div className={`line${isSender? ' sent':''}`}></div>
        <div className = 'username'>{isSender? 'me': props.sender}</div>
        <div className = 'content'>{
          ( props.view === false? ( (isSender ? <img src= {url}/> :  (img === false ?
           <button onClick={()=>{showSnap()}} >
           show snap
         </button> : <div> <button onClick={(e)=>{download()}}>download</button> <img className='img' src= {url}/> </div>))) : content)}
         </div>
         </div>

        </div>

    )
   } else {
    return (

      <div className ={`msg_box${isSender? ' sent':''}`}>
        <div>
        <div className={`line${isSender? ' sent':''}`}></div>
        <div className = 'username'>{isSender? 'me': props.sender}</div>
        <div className = 'content'>{content}
         </div>
         </div>

        </div>

    )
   }

}