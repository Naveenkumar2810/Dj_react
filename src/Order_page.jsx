import React, { useState,useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { added_cart_list,backend_url } from './App';
import axios from 'axios'

const Order_page = () => {


  const [records,setRecords] = useState(
    {
      hotels_list:[]
    }
  )
  const selected_list = useSelector((state)=>state.sel_list.cate_list)
  const categorylist = selected_list ? selected_list : []
  const dispatch = useDispatch();

  
  const cart_add = (ele)=>{
    dispatch(added_cart_list(ele))
  }

  useEffect(() => {

    const fetchRecords = async () => {
      try {
          
          const restaurants = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Brand',type:'query'},
            {
              withCredentials:true
            })
            setRecords({hotels_list:restaurants.data})
        }
      catch (error){
        console.log(error) }

      };
      fetchRecords()  
  },[])
    

  return (
    <div className='w-full flex flex-col gap-5 h-auto md:p-4'>
      <div className='offer-card w-full h-32 md:h-52 rounded-3xl bg-card shadow-card-hl overflow-hidden relative'>
        <h1 className='absolute md:top-10 top-2 md:left-10 left-2 w-2/5 h-3/5  md:text-3xl sm:text-base text-sm md:text-gray-400 text-white my-auto mt-6 ml-4 md:leading-8 font-semibold'>Place your first order <br/>and get flat 250 cashback 🥳</h1>
        <LazyLoadImage className='w-full h-32 md:h-52 object-cover rounded-3xl' src='https://foodcategory.s3.eu-north-1.amazonaws.com/card1.jpeg'/>
      </div>
      <div className='food-menu flex flex-col w-full h-auto p-3 rounded-3xl shadow-card-hl border-[3px] border-[#cbd5e1]'>
            <h1 className='text-left text-lg md:text-2xl font-medium '>Menus for you</h1>
            <div className='category flex flex-row h-auto md:p-5 flex-wrap md:gap-14 gap-5 rounded-2xl justify-center'>
              {categorylist.map((ele)=> {
              return (
              <div key={ele.id} className='w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(32%-1.25rem)] h-32 md:h-40 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1]'>
                 <div className='image w-2/5 h-full flex items-center p-2'>
                    <LazyLoadImage className='rounded-xl w-full h-28 md:h-[calc(95%)] object-cover' src={ele.Image_url}/>
                 </div>
                 <div className='details w-3/5 h-full flex flex-row flex-wrap p-2'>
                   <p className='desc w-full h-3/4 text-xs md:text-sm text-wrap place-content-center text-center text-black'>
                       {ele.Description}
                   </p>
                   <span className='price w-2/5 h-1/4 text-sm md:text-base text-left place-content-center font-semibold'>{`Rs.${ele.Price}`}</span>
                   <button onClick={()=>cart_add(ele)} className='price w-3/5 h-1/4 md:p-[2px] p-[0.5px] md:text-sm text-xs rounded-full bg-[#0284c7]/80 hover:bg-blue-500'>Add</button>
                 </div>
              </div>)})}
            </div> 
      </div>
      <div className='similar h-auto flex flex-col p-3 shadow-card-hl rounded-3xl border-[3px] border-[#cbd5e1]'>
           <h1 className='text-left text-lg md:text-2xl font-medium'>Similar Restaurants</h1>
            <div className='category w-full flex flex-row h-auto md:gap-x-7 gap-4 md:p-5 p-3 overflow-x-scroll'>
              {records.hotels_list.map((ele)=> {
              return (
                <div className='min-w-[calc(50%-0.2rem)] md:min-w-[calc(25%-1.25rem)] h-44 md:h-60 bg-card shadow-card-hl rounded-2xl border-[2px] border-[#cbd5e1]'>
                   <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.Brand_Image_url}/>
                </div> 
              )})}
                 
            </div> 
      </div>
    </div>
  )
}

export default Order_page