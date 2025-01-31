import React, { useEffect, useState } from 'react'
import { backend_url } from './App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Protected_Route = ({children}) => {

  const [authenticate,setAuthenticate]=useState(null)
  const [state2,setState2]=useState(0)
  const navigate = useNavigate()
  


  useEffect(()=> {
    const check = async ()=>{
      try {
        const response =await axios.post(backend_url+'/Api/check_authentication/',{},{withCredentials:true})
        response.status===200 && setAuthenticate(true)
      } catch (error) {
        console.log('Error fetching data:', error);
        setTimeout(()=>setAuthenticate(false),[1000]) //redirecting to login page if access token doesn't found
      }
    }
    check()
  },[])
  // console.log(authenticate)
  if (authenticate===false) {
    // <Navigate to="/login"/>;
    setTimeout(()=>navigate('/'),[2000])

    return <div className='w-full h-full bg-card text-black flex flex-row gap-3 justify-center items-center'>
      <span className='text-red-500'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </span>
      <span className='font-semibold text-sm md:text-xl'>Session expired .... Redirecting to login</span>
    </div>;
  } else if (authenticate===null) {
    return <div className='w-full h-full  bg-card text-black flex flex-row gap-3 justify-center items-center'>
      <span className='font-semibold text-lg md:text-2xl'>Loading ...</span>
    </div>
  }

  return authenticate && children 
}

export default Protected_Route;
