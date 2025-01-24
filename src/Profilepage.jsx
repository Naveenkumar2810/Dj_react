import React, { useState } from 'react'

const Profilepage = () => {

  const [prof,setProf] = useState({
    name:'Naveen kumar',
    joined_date:'01/01/2025',
    password_changed:'08/01/2025',
    Default_address:'No.14 street chennai bsudciwu wiehiw iwucib'}
  )

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

  return (
    <div className='Profile w-full h-full flex justify-center items-center bg-cus-white shadow-card-hl rounded-xl'>
      {!edit.edit_mode?
        <div className='Profile w-2/5 h-3/5 shadow-card-hl rounded-3xl flex flex-col gap-5 p-3'>
           <div className='Image w-52 h-52 rounded-full mx-auto border border-black overflow-hidden'>
            <img src='https://naveen28.s3.eu-north-1.amazonaws.com/b114bf08-c392-48c0-adee-cc3abdadfffd_Chicken_Briyani' className='w-full h-full'/>
           </div>
           <div className='info-name flex flex-row shadow-card-hl rounded-xl'>
             <span className='w-1/2 h-14  text-xl px-3 font-bold flex items-center'>Name</span>
             <span className='w-1/2 h-14  text-base px-3 flex items-center justify-end'>{prof.name}</span>
             <button onClick={()=>{edit_det('name')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button>
           </div>
           <div className='info-joined flex flex-row shadow-card-hl rounded-xl'>
             <span className='w-1/2 h-14  text-xl px-3 font-bold flex items-center'>Joined date</span>
             <span className='w-1/2 h-14  text-base px-3 flex items-center justify-end'>{prof.joined_date}</span>
           </div>
           <div className='info-pass flex flex-row shadow-card-hl rounded-xl'>
             <span className='w-1/2 h-14  text-xl px-3 font-bold flex items-center'>Password changed</span>
             <span className='w-1/2 h-14  text-base px-3 flex items-center justify-end'>{prof.password_changed}</span>
             <button onClick={()=>{edit_det('password')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button>
           </div>
           <div className='info-addr flex flex-row shadow-card-hl rounded-xl'>
             <span className='w-1/2 h-14  text-xl px-3 font-bold flex items-center'>Default Address</span>
             <span className='w-1/2 h-14  text-sm px-3 flex items-center justify-end'>{prof.Default_address}</span>
             <button onClick={()=>{edit_det('Default_address')}} className='w-10 h-10 Add  rounded-full text-center px-1 mt-2 flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
               </svg>
             </button>
           </div>
        </div>:
        <div className='Edit-Profile w-2/5 h-3/5 shadow-card-hl rounded-3xl flex flex-col gap-5 p-3 border border-black justify-center items-center'>
          <h1 className='Choose-text text-2xl font-bold'>{`Choose a ${edit.edit_field} for you`}</h1>
          <input onChange={(e)=>{change(e)}} name='input' type='text' className='w-4/5 h-30 p-3 border border-black rounded-full'/>
          <button onClick={(e)=>{change(e)}} name ='btn' className='price w-1/3 p-2 rounded-full bg-[#0284c7]/80'>Change</button>
          <span onClick={()=>{setEdit({edit_mode:false,edit_field:'',new_val:''})}} className='p-2 shadow-card-hl flex flex-col gap-3 justify-center items-center rounded-3xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>Back to Profile</span>
          </span>
        </div>
        }
      
    </div>
  )
}

export default Profilepage