import {React,useState} from 'react'
import { Outlet,Link,useNavigate } from 'react-router-dom';
import { cate_list } from './App';
import axios from 'axios'
import { useDispatch } from 'react-redux';

const Homepage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [search,setsearch]=useState('') 

  const [resarr,setResarr] = useState({
     
    food_list:[],
    hotel_list:[]

  })

  const keyword_search = (e)=>{
     setsearch(e.target.value)
     fetchRecords(e.target.value)
  }

  const fetchRecords = async (val) => { //funtion to handle search bar return foodlist and hotel list based on search term
    
    try {

      const search_res = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/',{coll_name:'Food_list',type:'filter_query',req:[{'Food_name':val?val:'a'},{'Hotel_name':val?val:'a'}]},
        {
          withCredentials:true
        })
        
      const solr_Food_list = search_res.data.Food_name
      const solr_hotellist = search_res.data.Hotel_name
  
      setResarr({food_list:solr_Food_list ? solr_Food_list:[],hotel_list:solr_hotellist ? solr_hotellist:[]})
    }

    catch (error){
      console.log(error) }

  };

  const keyword_order_list = async (option)=>{
    
    const category = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/', {coll_name:'Food_list',type:'filter_query',req:[{'Category':option?option:'a'}]},
      {
        withCredentials:true
      })
    
      const cate_data = category.data.Category
    
    dispatch(cate_list(cate_data))
    setsearch('')
    
    navigate('/homepage/orderpage')
  }

  const [menubar,setmenuBar] = useState(false)

  return (
    <div className='border border-black w-full h-full rounded-xl bg-cus-white p-3 md:p-3 scroll-smooth overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 '>
        <nav className='w-full md:w-[calc(98%)] mx-auto md:h-auto h-12 flex flex-row md:gap-8 py-2 mb-3 md:mt-0 relative bg-card shadow-card-hl rounded-full'>
          <span onClick={()=> navigate('/homepage')}className='w-1/6 md:text-xl text-sm font-bold md:bg-card md:shadow-card-hl rounded-full px-1 md:px-3  ml-4 flex justify-center items-center'>Hurry</span>
          <div className='rounded-full md:w-3/6 w-4/6 flex flex-row p-1 bg-card border-[1px] border-[#cbd5e1] md:shadow-card-hl md:relative'>
            <input onChange={(e)=> keyword_search(e)} className='w-[calc(96%)] text-xs md:text-base rounded-full h-full px-3 py-2 md:py-1 focus:outline-none' value={search} placeholder='Search...'></input>
            <span className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-7 size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
           {search && 
           <div className='z-40 search-results p-2 flex flex-row flex-wrap items-center justify-center w-full md:w-[calc(94%)] absolute h-72 md:top-14 top-12 left-0 rounded-xl bg-cus-white overflow-y-hidden'>
             {resarr.food_list.length>0 || resarr.hotel_list.length>0 && <h1 className='text-lg font-semibold items-center w-full mx-auto'>Search results by ...</h1>}
             {resarr.food_list.length>0 || resarr.hotel_list.length>0 ?<div className='w-full h-full flex flex-row'>
                <div className='Food w-1/2 h-full p-2 flex flex-col gap-2 rounded-xl overflow-y-scroll'>
                  <h1 className='w-full text-base'>Food</h1>
                  {resarr.food_list.map((ele,index)=>{
                  return (
                  <div key ={ele.id} onClick={()=>keyword_order_list(ele.Category)} className='w-full flex flex-row p-1 bg-card shadow-card-hl rounded-xl min-h-12 md:min-h-16 hover:cursor-pointer'>
                      <img className='hidden md:block w-1/5 h-full rounded-xl' src={ele.Image_url}/>
                      <div className='w-full md:w-4/5 flex justify-center items-center'>
                        {/* <h1 className='w-full h-1/2 font-semibold md:text-base text-xs'>{ele.Hotel_name}</h1> */}
                        <span className='w-full h-1/2 md:text-sm text-xs'>{ele.Food_name}</span>
                      </div> 
                  </div>)})}
                </div>
                <div className='Hotel w-1/2 h-full mt-2 flex flex-col gap-2 rounded-xl overflow-y-scroll'>
                  <h1 className='w-full text-base'>Hotel</h1>
                  {resarr.hotel_list.map((ele,index)=>{
                  return (
                  <div key={ele.id} className='w-full flex bg-card shadow-card-hl rounded-xl min-h-12 max-h-12 md:min-h-16'>
                      {/* <img className='hidden md:block w-1/5 h-full rounded-xl' src='https://foodcategory.s3.eu-north-1.amazonaws.com/paneer_butter_masala.jpeg'/> */}
                      <div className='w-full md:w-4/5 mx-auto flex flex-row gap-3 justify-center items-center'>
                        <h1 className='w-[calc(50%)] h-2/5 mt-1 md:text-sm text-xs text-center'>{ele.Hotel_name}</h1>
                        <span className='w-[calc(20%)] flex justify-center items-center'>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-7 size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                           </svg>
                        </span>
                        {/* <span className='w-full h-1/2 text-xs text-left block mt-2'>{ele.Food_name}</span> */}
                      </div> 
                  </div>)})}
                </div>
              </div>:<h1>No results try searching 'briyani' or 'cake'</h1>}
           </div>}
          </div>
          {/* <span className='menu-bar md:hidden w-auto flex items-center p-1 px-3 rounded-full bg-card shadow-card-hl mr-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </span> */} 
          <div className={`z-50 md:w-2/6 w-1/6 md:h-full ${menubar?'h-60':'h-10'} flex md:flex-row flex-col md:justify-evenly md:items-center gap-3 md:gap-0 rounded-3xl bg-card overflow-hidden md:overflow-visible px-1 items-center`} >
              <span onClick={()=>{setmenuBar(!menubar)}}className='min-w-10 min-h-10 max-w-10 max-h-10 md:hidden cartpage flex justify-center items-center rounded-full'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
              </span> 
              <span className='cartpage md:w-auto flex items-center rounded-full bg-card md:shadow-card-hl md:p-3 py-2 px-2'>
                <Link to="/homepage/cartpage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </Link>
              </span> 
              <span className='reorder md:w-auto flex items-center md:p-3 p-2 rounded-full bg-card md:shadow-card-hl'>
                <Link to="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </Link>
              </span>
              <span className='profilepage md:w-auto flex items-center md:p-3 p-2 rounded-full bg-card md:shadow-card-hl'>
                <Link to="/homepage/profilepage">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </Link>
              </span>
              <span className='Notifications md:w-auto flex items-center md:p-3 p-2 rounded-full bg-card md:shadow-card-hl'>
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

