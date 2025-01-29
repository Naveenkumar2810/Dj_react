import React, { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const [cred,setCred] = useState({
    username:'',
    mobile_number:'',
    password:'',
    repeat_password:'',
    username_color:"text-[rgba(255,255,255,0.7)]",
    mobile_number_color:'text-[rgba(255,255,255,0.8)]',
    password_color:'text-[rgba(255,255,255,0.8)]',
    rep_password_color:'text-[rgba(255,255,255,0.8)]'
  })
  
  const [form,setform]= useState({
    type:true,  //If form type is true login page else sign up page,
    response:true, //true means success user is created else error message 
    msg:null
  })

  // console.log(cred)
  // console.log(form)

  const set_cred = (e)=>{  //Function to assign values and colours to the form fields and sending in requests 

     const {name,value}=e.target
     
     switch(name) {
    
      case "username":
         setCred({...cred,[name]:value,username_color:value.length>3?"text-green-400":"text-red-500"})
         break
      case "mobile_number":
         const is_num =/^\d+$/.test(value)
         setCred({...cred,[name]:value,mobile_number_color:value.length===10 && is_num?"text-green-400":"text-red-600"})
         break
      case "password":
         setCred({...cred,[name]:value,password_color:value.length>7?"text-green-400":"text-red-600"})
         break
      case "repeat_password":
        setCred({...cred,[name]:value,rep_password_color:value===cred.password?"text-green-400":"text-red-600"})
        break
      default:
        return null
    }

  }

  const page_switch = ()=>{
    setform({type:form.type?false:true})
  }

  const authentication = async (e) => {  //function handling login 
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/Api/token/', 
          {
              "mobile_number":cred.mobile_number,
              "password":cred.password
          },
          {
            withCredentials:true
          })
          navigate('/homepage')
        }
    catch (error){
        // console.log(error.response.data.error);
        setform({...form,response:false,msg:error.response.data.error})
        setTimeout(()=>setform({...form,msg:null}),[1500])
      };
      
      }

  const Sign_up = async (e) => {  //function handle creating new user 
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/Api/Signup/', 
            {
                "username":cred.username,
                'email':'naveen@gmail.com',
                "mobile_number":cred.mobile_number,
                "password":cred.password
            },
            {
              withCredentials:true
            })
            // console.log(response.status, typeof response.status)
            if (response.status===201) {
              setform({...form,response:true,msg:response.data.message})
              setTimeout(()=>{
                // setCred({...cred,mobile_number:'',password:''})
                setform({...form,type:true,msg:null})
                setCred(
                  {
                    username:'',
                    mobile_number:'',
                    password:'',
                    username_color:"text-[rgba(255,255,255,0.7)]",
                    mobile_number_color:'text-[rgba(255,255,255,0.8)]',
                    password_color:'text-[rgba(255,255,255,0.8)]',
                    rep_password_color:'text-[rgba(255,255,255,0.8)]'
                  }
                )
              },[2000])}
          }
        catch (error){
          setform({...form,response:false,msg:error.response.data.mobile_number[0]})
          setTimeout(()=>{
            setform({...form,msg:null})},[1500])
         };
        
        }
          
  return (
    <div className="border border-black w-full h-full flex justify-center items-center rounded-xl bg-[url('https://naveen28.s3.eu-north-1.amazonaws.com/signup_page.jpeg')] bg-cover bg-center p-6">
      <form onSubmit={!form.type?(e)=>{Sign_up(e)}:(e)=>{authentication(e)}}  className="w-full md:w-2/5 h-auto mx-auto min-h-3/5  p-5 rounded-2xl bg-gray-900/70 backdrop-blur-signup overflow-hidden">
        <h1 className='text-lg md:text-xl font-bold md:w-1/2 w-4/5 mx-auto text-center text-white'>{form.type?"LOGIN":"SIGNUP"}</h1>
        {!form.type?<div className="md:mb-5 md:mt-10 mb-2 mt-5 border-[1px] border-[rgba(255,255,255,0.25)] w-full md:w-5/6 mx-auto flex flex-row rounded-full">  
          <input onChange={(e)=>{set_cred(e)}} name='username' value={cred.username} type="text" id="username" className="w-[calc(80%)] shadow-sm text-white text-md block p-5 bg-transparent appearance-none focus:outline-none" placeholder='Enter user name'required/>
          <span className={`w-[calc(20%)] flex justify-center items-center ${cred.username_color}`}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="size-9">
                <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
             </svg>
          </span>
        </div>:null}
        <div className="md:mb-5 md:mt-10 mb-2 mt-5 border-[1px] border-[rgba(255,255,255,0.25)] w-full md:w-5/6 mx-auto flex flex-row rounded-full">  
          <input onChange={(e)=>{set_cred(e)}} name='mobile_number' value={cred.mobile_number} type="text" id="mobile_number" className="w-[calc(80%)] shadow-sm text-white text-md block p-5 bg-transparent appearance-none focus:outline-none" placeholder='Enter mobile number'required/>
          <span className={`w-[calc(20%)] flex justify-center items-center ${cred.mobile_number_color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-7">
               <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </span>
        </div>
        <div className="md:mb-5 md:mt-10 mb-2 mt-5 border-[1px] border-[rgba(255,255,255,0.25)] w-full md:w-5/6 mx-auto flex flex-row rounded-full">  
          <input onChange={(e)=>{set_cred(e)}} name='password' value={cred.password}  type="password" id="password" className="w-[calc(80%)] shadow-sm text-white text-md block p-5 bg-transparent appearance-none focus:outline-none" placeholder='Enter password'required/>
          <span className={`w-[calc(20%)] flex justify-center items-center ${cred.password_color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-8">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
           </svg>
          </span>
        </div>
        {!form.type? <div className="md:mb-5 md:mt-10 mb-2 mt-5 border-[1px] border-[rgba(255,255,255,0.25)] w-full md:w-5/6 mx-auto flex flex-row rounded-full">  
          <input onChange={(e)=>{set_cred(e)}} name='repeat_password' value={cred.repeat_password} type="password" id="rep-password" className="w-[calc(80%)] shadow-sm text-white text-md block p-5 bg-transparent appearance-none focus:outline-none" placeholder='Repeat password'required/>
          <span className={`w-[calc(20%)] flex justify-center items-center ${cred.rep_password_color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-8">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
           </svg>
          </span>
        </div>:null}
        {!form.type?<div className="flex items-start mb-5 flex-col md:flex-row">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-900 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
            <label for="terms" className="ms-2 text-sm font-medium text-white">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
        </div>:null}
        {!form.msg && <button type="submit" className="mb-3 md:mt-0 w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">{form.type?"Login":"Create Account"}</button>}
        {!form.msg && <span className='ml-5 text-white'>{form.type?"New user ?":"Already a user ?"} <span onClick={()=>{page_switch()}} className='hover:cursor-pointer text-blue-500 hover:text-blue-800'>{form.type?"Sign Up":"Login"}</span></span> }
        {form.msg && <div className='font-semibold p-2 rounded-xl flex flex-row justify-center'>
          <span className={`${form.response?'text-green-500':'text-red-500'}`}>
            {form.response?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
               <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>}
          </span>
          <span className={`p-1 ${form.response?'text-green-500':'text-red-500'}`}>{form.msg}</span>
        </div>}
      </form>
    </div>
  )
}

export default Login