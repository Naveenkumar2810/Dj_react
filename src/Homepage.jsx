import {React,useState} from 'react'
import { Outlet,Link, Links } from 'react-router-dom';
import axios from 'axios'

const Homepage = () => {

  const [search,setsearch]=useState('') 

  const [resarr,setResarr] = useState({
     
    food_list:[],
    hotel_list:[]

  })


  const keyword_search = (e)=>{
     
     setsearch(e.target.value)
     fetchRecords(e.target.value)
  }

  const fetchRecords = async (val) => {
    
    try {
      
      // const search_res = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/',{coll_name:'Food_list',term:val?val:"a",type:'filter_query'},
      //   {
      //     withCredentials:true
      //   })

      const search_res = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/',{coll_name:'Food_list',type:'filter_query',req:[{'Food_name':val?val:'a'},{'Hotel_name':val?val:'a'}]},
        {
          withCredentials:true
        })
        
      const solr_Food_list = search_res.data.Food_name
      const solr_hotellist = search_res.data.Hotel_name
      console.log('solr_Food_list is',solr_Food_list)
      console.log('solr_hotellist is',solr_hotellist)
  
      setResarr({food_list:solr_Food_list ? solr_Food_list:[],hotel_list:solr_hotellist ? solr_hotellist:[]})
    }

    catch (error){
      console.log(error) }

  };

  return (
    <div className='border border-black w-full h-full rounded-xl bg-cus-white p-3 md:p-8 overflow-y-scroll scroll-smooth'>
        <nav className='w-[calc(98%)] mx-auto md:h-auto h-12 flex flex-row gap-8 py-2 mb-3 md:mt-0 relative bg-card shadow-card-hl rounded-full'>
          <Link to='/homepage' className='w-1/6 h-auto place-content-center'>
            <h1 className='w-full md:text-xl text-sm font-bold bg-card shadow-card-hl rounded-full px-3 py-2 ml-4'>Hurry</h1>
          </Link>
          <div className='rounded-full md:w-3/6 w-4/6 flex flex-row p-1 bg-card shadow-card-hl md:relative'>
            <input onChange={(e)=> keyword_search(e)} className='w-[calc(96%)] rounded-full h-full px-3 py-2 md:py-1 focus:outline-none' placeholder='Search...'></input>
            <span className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-7 size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
           {search && 
           <div className='search-results p-2 flex flex-row items-center justify-center w-full md:w-[calc(94%)] border border-black absolute h-72 md:top-14 top-12 left-0 rounded-xl bg-cus-white'>
             {resarr.food_list.length>0 || resarr.hotel_list.length>0 ?<div className='w-full h-full flex flex-row'>
                <div className='Food w-1/2 h-full p-2 flex flex-col gap-2 rounded-xl overflow-y-scroll'>
                  {resarr.food_list.map((ele,index)=>{
                  return (
                  <div key ={ele.id} className='w-full flex flex-row p-1 bg-card shadow-card-hl rounded-xl h-16'>
                      <img className='hidden md:block w-1/5 h-full rounded-xl' src={ele.Image_url}/>
                      <div className='w-full md:w-4/5'>
                        <h1 className='w-full h-1/2 font-semibold'>{ele.Hotel_name}</h1>
                        <span className='w-full h-1/2 text-xs'>{ele.Food_name}</span>
                      </div> 
                  </div>)})}
                </div>
                <div className='Hotel w-1/2 h-full hmt-2 p-2 flex flex-col gap-2 rounded-xl overflow-y-scroll'>
                  {resarr.hotel_list.map((ele,index)=>{
                  return (
                  <div key={ele.id} className='w-full flex flex-row bg-card shadow-card-hl rounded-xl h-12'>
                      {/* <img className='hidden md:block w-1/5 h-full rounded-xl' src='https://foodcategory.s3.eu-north-1.amazonaws.com/paneer_butter_masala.jpeg'/> */}
                      <div className='w-full md:w-4/5 mx-auto'>
                        <h1 className='w-full h-1/2 font-semibold text-left'>{ele.Hotel_name}</h1>
                        <span className='w-full h-1/2 text-xs text-left block mt-2'>{ele.Food_name}</span>
                      </div> 
                  </div>)})}
                </div>
              </div>:<h1>No results</h1>}
           </div>}
          </div>
          <span className='menu-bar md:hidden w-auto flex items-center p-1 px-3 rounded-full bg-card shadow-card-hl mr-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
             </svg>
          </span>
          <div className='hidden w-2/6 h-full md:flex flex-row justify-evenly'>
              <span className='cartpage w-auto flex items-center h-full rounded-full bg-card shadow-card-hl p-3 px-3'>
                <Link to="/homepage/cartpage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </Link>
              </span> 
              <span className='reorder w-auto flex items-center p-3 px-3 rounded-full bg-card shadow-card-hl'>
                <Link to="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </Link>
              </span>
              <span className='profilepage w-auto flex items-center p-3 px-3 rounded-full bg-card shadow-card-hl'>
                <Link to="/homepage/profilepage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </Link>
              </span>
              <span className='Notifications w-auto flex items-center p-3 px-3 rounded-full bg-card shadow-card-hl'>
                <Link to="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                  </svg>
                </Link>
              </span>
          </div>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Homepage;

