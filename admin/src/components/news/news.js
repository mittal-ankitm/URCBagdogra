import React,{useState,useEffect,useContext} from 'react'
import {usercontext} from '../../App'
import {serverurl} from '../../config'
import {Link} from 'react-router-dom'

const News= ()=>{

   const [data,setdata]=useState([])
   const [feeddata,setfeed]=useState("")
   const [msg,setmsg]=useState("")
   const {state,dispatch}=useContext(usercontext)

   const getfeeds=()=>{
    fetch(serverurl+'/feeds/',{
        method:"get",
        query:JSON.stringify({})
     }).then(res=>res.json())
     .then(result=>{
        setdata(result)
     })
   }

    useEffect(()=>{
        getfeeds();
    },[])
    
    const deletenews=(id)=>{
        fetch(`${serverurl}/feeds/${id}`,{
            method:"delete",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("token")
            }
         }).then(res=>res.json())
         .then(result=>{
             console.log(result)
             let d=data.filter(item=>{return item._id!=id})
             setdata(d)
         }).catch(err=>{
            console.log(err)
         })
    }

    const addnews=()=>{
        fetch(`${serverurl}/feeds/`,{
            method:"post",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
               feeds:feeddata
            })
         }).then(res=>res.json())
         .then(result=>{
             console.log(result)
             let d=data;
             d.push(result)
             setdata(d)
             setfeed("")

         }).catch(err=>{
            console.log(err)
         })
    }


return(

   <div className='main'>
       <div class='headt'> add and delete news  </div>

       <div>{msg}</div>
<div className='list'>
    {
        data?
        data.map(item=>{
            return(
            <div className='product2'>
                <div>{item.feeds}</div>
                <div><button onClick={()=>deletenews(item._id)}>delete</button></div>
            </div>
            )
        }):
        <div>
           { /*<Loading />*/}
        </div>
    }</div>
    <div>
    <div><textarea value={feeddata} onChange={(e)=>setfeed(e.target.value)} /></div>
    <div><button onClick={()=>addnews()}>submit</button></div>
    </div>
   </div>

)

}

export default News