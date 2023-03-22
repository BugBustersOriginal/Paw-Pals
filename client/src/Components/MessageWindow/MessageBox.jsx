import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";


export default function MessageBox(props) {
  const [img, setimg]  = useState(false);
  const [url, seturl]  = useState('');
  const[content, setcontent] = useState(props.content)
  var str =''
  if(props.content && url === ''){
    if(props.content[0]=== '<' && props.content[1] === 'i'&& props.content[2] ==="m"){
      for(var i = 5; i<props.content.length - 6 ; i++){
        str = str + props.content[i]
      }

      seturl({
        url:str
      })

    }
  }

  const showSnap = () =>{
    setimg({
      img: true
    })
    resolveAfter2Seconds()
  }
  useEffect(()=>{
    console.log("img", img)
  })

  const resolveAfter2Seconds=() => {
    console.log("timeout")
    var prom = new Promise(resolve => {
      setTimeout(() => {
        seturl({url:''});
        setcontent({content: 'Image deleted'})
      }, 2000);
    });
  }



  const [isSender, setIsSender] =useState(false)

  useEffect (() => {
    setIsSender(props.sender.toString() === props.currentUser.toString())
    console.log(`props.sender is equal to ${props.sender} while props.currentUser is equal to ${props.currentUser} checking truth is ${props.sender === props.currentUser}`)
  })

  const [isSender, setIsSender] =useState(false)

  useEffect (() => {
    setIsSender(props.sender.toString() === props.currentUser.toString())
    console.log(`props.sender is equal to ${props.sender} while props.currentUser is equal to ${props.currentUser} checking truth is ${props.sender === props.currentUser}`)
  })

  return (
<<<<<<< HEAD
    <div className ={`msg_box${isSender? ' sent':''}`}>
      <div>
      <div className={`line${isSender? ' sent':''}`}></div>
      <div className = 'username'>{isSender? 'me': props.sender}</div>
      <div className = 'content'>{props.content}</div>
      </div>
=======
    <div className ="msg_box">
      <div className = 'username'>{props.sender}</div>
      <div className = 'content'>{
         url!==''? (img === false ?
         <button onClick={()=>{showSnap()}} >
         show snap
       </button> : <img src= {url.url}/>) : content}
      </div>


>>>>>>> main
    </div>
  )
}