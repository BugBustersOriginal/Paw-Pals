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
    // if(props.sender !== null) {
    //   setIsSender(props.sender.toString() === props.currentUser.toString())
    // }
    console.log (`props.sender is equal to ${props.sender}`)
   })

  const [isSender, setIsSender] =useState(false)


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
      </div>
  )
}