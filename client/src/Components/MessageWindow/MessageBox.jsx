import React, {useState, useEffect} from 'react';
import {socket} from '../../socket.js';
import "../../../../client/chat.css";


export default function MessageBox(props) {
  const [img, setimg]  = useState(false);
  const [url, seturl]  = useState('');
  const[content, setcontent] = useState(props.content);
  const [isSender, setIsSender] =useState(false);
  var str =''

  if(props.type === 'image' && url === '') {
    seturl({
      url:props.content
    })
  }
  const showSnap = () =>{
    setimg(true)
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

  useEffect (() => {
    console.log (`props.sender is equal to ${props.sender} and  ${props.currentUser}`)
    if(props.sender !== undefined && props.currentUser !== undefined) {
      setIsSender(props.sender.toString() === props.currentUser.toString())
    }

   })

  return (

      <div className ={`msg_box${isSender? ' sent':''}`}>
        <div>
          <div className={`line${isSender? ' sent':''}`}></div>
          <div className = 'username'>{isSender? 'me': props.sender}</div>
          <div className = 'content'> {
            url!==''? (img === false ?
            <button onClick={()=>{showSnap()}} >
              show snap
            </button> : <img src= {url.url}/>) : content
          }
          </div>
        </div>
      </div>

  )
}