import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profilepage = () => {

  const navigate =useNavigate()


  const [prof,setProf] = useState({
  username:'',
  mobile_number:'',
  email:''
  })
  console.log(prof)

  const [edit,setEdit]=useState({
    edit_mode:false,
    edit_field:'',
    new_val:''
  })

  const edit_det = (field)=>{
    setEdit({edit_mode:true,edit_field:field})
  }

  const change = (e)=>{
    const {name}=e.target;
    if (name==='input'){
      console.log('called by input')
      setEdit({...edit,new_val:e.target.value})
    }
    else {
      const field = edit.edit_field;
      const val= edit.new_val
      setProf({...prof,[field]:val})
      setEdit({
        edit_mode:false,
        edit_field:'',
        new_val:''
      })
    }
  }

  useEffect(()=>{

    const fetch_details = async()=>{
       try {
          const user_details = await axios.post('http://127.0.0.1:8000/Api/user_details/',{},
            {
              withCredentials:true
            })
          console.log('User details',user_details.data)
          const current_user_details = user_details.data
          setProf({...current_user_details})
        }
      catch (error){
        console.log(error)
      }}
      fetch_details()
  },[])

  const deleteCookie = async () => {
    try {
      const cookie_clear = await axios.post('http://127.0.0.1:8000/Api/clear_cookie/',{},
          {
            withCredentials:true
          })
      console.log('cookie clear',cookie_clear.message)
      navigate('/')
        }
    catch (error){
      console.log(error)
      };
  };

  return (
    <div className='Profile w-full h-full flex justify-center items-center rounded-xl'>
      {!edit.edit_mode?
        <div className='Profile md:w-2/5 w-5/6 md:h-3/5 h-5/6 shadow-card-hl rounded-3xl flex flex-col gap-5 p-3'>
           <div className='Image md:w-52 w-40 md:h-52 h-40 rounded-full mx-auto border-[6px] border-[#cbd5e1] overflow-hidden flex justify-center items-center'>
             <h1 className='font-semibold w-5/6 h-5/6 text-8xl place-content-center'>{prof.username.charAt(0)}</h1>
           </div>
           <div className='info-name flex flex-row shadow-card-hl rounded-xl bg-card'>
             <span className='w-1/2 h-14  text-xs md:text-lg px-3 font-bold flex items-center'>Name</span>
             <span className='w-1/2 h-14  text-xs md:text-sm px-3 flex items-center justify-end'>{prof.username}</span>
             {/* <button onClick={()=>{edit_det('name')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button> */}
           </div>
           {/* <div className='info-joined flex flex-row shadow-card-hl rounded-xl bg-card'>
             <span className='w-1/2 h-14  text-sm md:text-lg px-3 font-bold flex items-center'>Joined date</span>
             <span className='w-1/2 h-14  text-xs md:text-sm px-3 flex items-center justify-end'>{prof.joined_date}</span>
           </div>*/}
           <div className='info-pass flex flex-row shadow-card-hl rounded-xl bg-card'>
             <span className='w-1/2 h-14  text-xs md:text-lg px-3 font-bold flex items-center'>Email</span>
             <span className='w-1/2 h-14  text-xs md:text-sm px-3 flex items-center justify-end'>{prof.email}</span>
             {/* <button onClick={()=>{edit_det('password')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button> */}
           </div> 
           <div className='info-addr flex flex-row shadow-card-hl rounded-xl bg-card'>
             <span className='w-1/2 h-14  text-xs md:text-lg px-3 font-bold flex items-center'>Phone</span>
             <span className='w-1/2 h-14  text-xs md:text-sm px-3 flex items-center justify-end'>{prof.mobile_number}</span>
             {/* <button onClick={()=>{edit_det('Default_address')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button> */}
           </div>
           <button onClick={()=>{deleteCookie()}} className='w-4/5 p-2 bg-red-500 rounded-full mx-auto'>Log out</button>
        </div>:
        <div className='Edit-Profile md:w-2/5 w-5/6 h-3/5 shadow-card-hl rounded-3xl flex flex-col gap-5 p-3 border border-black justify-center items-center'>
          <h1 className='Choose-text text-base md:text-2xl font-bold'>{`Choose a ${edit.edit_field} for you`}</h1>
          <input onChange={(e)=>{change(e)}} name='input' type='text' className='w-4/5 md:h-30 p-3 border border-black rounded-full'/>
          <button onClick={(e)=>{change(e)}} name ='btn' className='price w-1/3 md:p-2 p-1 rounded-full bg-[#0284c7]/80'>Change</button>
          <span onClick={()=>{setEdit({edit_mode:false,edit_field:'',new_val:''})}} className='p-2 shadow-card-hl flex flex-col gap-3 justify-center items-center rounded-3xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-20 size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className='text-sm md:text-base'>Back to Profile</span>
          </span>
        </div>
        }
      
    </div>
  )
}

export default Profilepage