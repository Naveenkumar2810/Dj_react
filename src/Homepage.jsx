import {React,useState} from 'react'
import { Outlet,Link,useNavigate } from 'react-router-dom';
import { cate_list,backend_url } from './App';
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

  const fetchRecords = async (val) => { //funtion to handle search bar search return foodlist and hotel list based on search term
     
    try {

      const search_res = await axios.post(backend_url+'/Api/get_solr_query/',{coll_name:'Food_list',type:'filter_query',req:[{'Food_name':val?val.toLowerCase():'a'},{'Hotel_name':val?val.toLowerCase():'a'}]},
        {
          withCredentials:true
        })
        
      const solr_Food_list = search_res.data.Food_name
      const solr_hotellist = search_res.data.Hotel_name
  
      setResarr({food_list:solr_Food_list ? solr_Food_list:[],hotel_list:solr_hotellist ? solr_hotellist:[]})
    }

    catch (error){
   }

  };

  const keyword_order_list = async (option)=>{  //function to handle selected option either food list or hotellist
    
    try{
      const category = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Food_list',type:'filter_query',req:[{'Category':option?option:'a'}]},
        {
          withCredentials:true
        })
      
        const cate_data = category.data.Category
      
      dispatch(cate_list(cate_data))
      setsearch('')
      
      navigate('/homepage/orderpage')}
    catch (error){
      
    }
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
              </div>:<h1 className='md:text-base text-xs '>No results try searching 'briyani' or 'cake'</h1>}
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
                <Link to="/homepage/orderpage ">
                  <svg fill="#000000" width="28px" height="28spx" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.003906 3.9863281 A 1.0001 1.0001 0 0 0 10.048828 4.6894531L9.4101562 6.6503906C8.6545081 8.9644197 8.910072 11.627244 10.162109 13.546875C10.988072 14.813244 11.247852 17.014498 10.6875 18.730469L10.048828 20.689453 A 1.0005836 1.0005836 0 1 0 11.951172 21.310547L12.589844 19.349609C13.345492 17.03558 13.089928 14.372756 11.837891 12.453125C11.011928 11.186756 10.752148 8.9855023 11.3125 7.2695312L11.951172 5.3105469 A 1.0001 1.0001 0 0 0 11.003906 3.9863281 z M 18.003906 3.9863281 A 1.0001 1.0001 0 0 0 17.048828 4.6894531L16.410156 6.6503906C15.654508 8.9644197 15.910072 11.627244 17.162109 13.546875C17.988072 14.813244 18.247852 17.014498 17.6875 18.730469L17.048828 20.689453 A 1.0005836 1.0005836 0 1 0 18.951172 21.310547L19.589844 19.349609C20.345492 17.03558 20.089928 14.372756 18.837891 12.453125C18.011928 11.186756 17.752148 8.9855023 18.3125 7.2695312L18.951172 5.3105469 A 1.0001 1.0001 0 0 0 18.003906 3.9863281 z M 25.003906 3.9863281 A 1.0001 1.0001 0 0 0 24.048828 4.6894531L23.410156 6.6503906C22.654508 8.9644197 22.910072 11.627244 24.162109 13.546875C24.988072 14.813244 25.247852 17.014498 24.6875 18.730469L24.048828 20.689453 A 1.0005836 1.0005836 0 1 0 25.951172 21.310547L26.589844 19.349609C27.345492 17.03558 27.089928 14.372756 25.837891 12.453125C25.011928 11.186756 24.752148 8.9855023 25.3125 7.2695312L25.951172 5.3105469 A 1.0001 1.0001 0 0 0 25.003906 3.9863281 z M 43.605469 10.005859C43.37979 10.005295 43.15447 10.027258 42.933594 10.070312C42.050087 10.242532 41.233124 10.757554 40.710938 11.570312L40.792969 11.460938L28.357422 26L4 26 A 1.0001 1.0001 0 0 0 3 27L3 30C3 30.201563 3.069136 30.384586 3.078125 30.583984 A 1.0001 1.0001 0 0 0 3.21875 31.640625C3.7431756 35.806528 6.0600565 39.465497 9.1171875 42.128906C12.576847 45.143003 16.846465 47 20.5 47L29.5 47C33.153535 47 37.423153 45.143003 40.882812 42.128906C44.342472 39.114809 47 34.866667 47 30L47 27 A 1.0001 1.0001 0 0 0 46 26L35.9375 26L46.205078 15.597656 A 1.0001 1.0001 0 0 0 46.283203 15.509766C47.468538 13.983156 47.135249 11.742091 45.556641 10.626953C44.96483 10.208897 44.282504 10.007554 43.605469 10.005859 z M 43.587891 11.994141C43.866957 11.996292 44.151151 12.082289 44.402344 12.259766C45.066906 12.729216 45.196951 13.621237 44.707031 14.267578L33.126953 26L30.990234 26L42.3125 12.761719 A 1.0001 1.0001 0 0 0 42.392578 12.652344C42.614391 12.307102 42.949506 12.090312 43.3125 12.019531C43.403249 12.001836 43.494868 11.993424 43.587891 11.994141 z M 5 28L28.675781 28 A 1.0001 1.0001 0 0 0 28.955078 28L33.404297 28 A 1.0001 1.0001 0 0 0 33.669922 28L45 28L45 30C45 34.133333 42.7087 37.885191 39.568359 40.621094C36.428019 43.356997 32.446465 45 29.5 45L20.5 45C17.553535 45 13.571981 43.356997 10.431641 40.621094C7.8116502 38.338527 5.8700615 35.328419 5.2695312 32L41 32 A 1.0001 1.0001 0 1 0 41 30L5 30L5 28 z">
                    </path>
                  </svg>
                </Link>
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
              {/* <span className='Notifications md:w-auto flex items-center md:p-3 p-2 rounded-full bg-card md:shadow-card-hl'>
                <Link to="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-6 size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                  </svg>
                </Link>
              </span> */}
          </div>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Homepage;
<svg fill="#000000" width="800px" height="800px" viewBox="0 -14.02 63 63" xmlns="http://www.w3.org/2000/svg">
  <g id="_28" data-name="28" transform="translate(-403.5 -858.023)">
    <path id="Path_144" data-name="Path 144" d="M465.217,888.857H404.779a1.281,1.281,0,0,0,0,2.561h4.076a1.6,1.6,0,0,0,1.487,1.559h48.752a1.6,1.6,0,0,0,1.488-1.559h4.635a1.281,1.281,0,1,0,0-2.561Z"></path>
    <path id="Path_145" data-name="Path 145" d="M459.6,886.721c0-12.342-9.754-22.35-21.784-22.35h-4.183c-12.035,0-21.785,10.008-21.785,22.35v.8H459.6Zm-27.1-18.461c-15.351,1.336-15.435,16.027-15.432,16.654a.687.687,0,1,1-1.373.007c0-.166.057-16.58,16.686-18.032a.688.688,0,0,1,.119,1.371Z"></path>
    <path id="Path_146" data-name="Path 146" d="M434.051,862.811h3.008a2.394,2.394,0,0,0,0-4.788h-3.008a2.394,2.394,0,0,0,0,4.788Zm-1.487-2.816a.771.771,0,1,1,1.541,0v1.152a.771.771,0,1,1-1.541,0Z"></path>
  </g>
</svg>

