import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";


export default function MessageBox(props) {
  const [img, setimg]  = useState(false);
  const [url, seturl]  = useState('');
  const [content, setcontent] = useState(props.content);
  const [isSender, setIsSender] =useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);


  if(props.type === 'image' && url === '') {
    seturl({
      url:props.content
    })
  }
  const showSnap = () =>{
    setimg(true)
    setShowSaveButton(true);
    resolveAfterXSeconds(props.expirationTime)
  }
  useEffect(()=>{
    console.log("img", img)
    console.log(`url is equal to ${JSON.stringify(url)}`)
  },[url])

  const resolveAfterXSeconds=(expirationTime) => {
    console.log(`expirationTime is equal to ${expirationTime}`);
    var prom = new Promise(resolve => {
      setTimeout(() => {
        seturl({url:''});
        setcontent('Image deleted')
      }, expirationTime);
    });
  }
  const handleSave = () => {
     // create a fake link element
     fetch(url.url)
     .then((response) => response.blob())
     .then((blob) => {
       const url = window.URL.createObjectURL(new Blob([blob]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", "snapchat.jpg");
       document.body.appendChild(link);
       link.click();
     });
  };

  useEffect (() => {
    //console.log (`props.sender is equal to ${props.sender} and  ${props.currentUser}`)
    if(props.sender !== undefined && props.currentUser !== undefined) {
      setIsSender(props.sender.toString() === props.currentUser.toString())
    }
   }, [props.sender, props.currentUser]);

  return (

      <div className ={`msg_box${isSender? ' sent':''}`}>
        <div>
          <div className={`line${isSender? ' sent':''}`}></div>
          <div className = 'username'>{isSender? 'me': props.sender}</div>
          <div className = 'content'>
          {url !== '' ? (
            img === false ? (
              <button onClick={() => showSnap()}>show snap</button>
            ) : (
              <div>
                <img src={url.url} />
                {showSaveButton && (
                  <button onClick={() => handleSave()}>Save Image</button>
                )}
              </div>
            )
          ) : (
            content
          )}
          </div>
        </div>
      </div>

  )
}