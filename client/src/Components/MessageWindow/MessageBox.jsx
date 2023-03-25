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
    resolveAfter2Seconds()
  }
  useEffect(()=>{
    console.log("img", img)
    console.log(`url is equal to ${JSON.stringify(url)}`)
  },[url])

  const resolveAfter2Seconds=() => {
    var prom = new Promise(resolve => {
      setTimeout(() => {
        seturl({url:''});
        setcontent('Image deleted')
      }, 2000);
    });
  }


  const download = async() =>{
    const a = document.createElement("a");
    a.href = await toDataURL(url.url);
    a.download = "snap.png";
    document.body.appendChild(a);
    console.log(a)
    a.click();
    document.body.removeChild(a);
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

  return (

    <div className ={`msg_box${isSender? ' sent':''}`}>
      <div>
      <div className={`line${isSender? ' sent':''}`}></div>
      <div className = 'username'>{isSender? 'me': props.sender}</div>
      {/* <div className = 'content'>{props.content}</div> */}
      <div className = 'content'>{
         url!==''? (img === false ?
         <button onClick={()=>{showSnap()}} >
         show snap
       </button> : <div><button onClick={(e)=>{download()}}>download</button><img src= {url.url}/></div>) : content}
       </div>
       </div>


  )
}