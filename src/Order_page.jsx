import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useSelector} from 'react-redux'

const Order_page = () => {

  
  const categorylist= useSelector((state)=>state.sel_list.cate_list)
  console.log('cate_list is',categorylist)

  const arr =[1,2,3]

  return (
    <div className='w-full flex flex-col gap-5 h-auto md:p-4'>
      <div className='offer-card w-full h-52 rounded-3xl bg-card shadow-card-hl'>
        <LazyLoadImage className='w-full h-full object-cover rounded-3xl' src='https://foodcategory.s3.eu-north-1.amazonaws.com/card1.jpeg'/>
      </div>
      <div className='food-menu flex flex-col w-full h-auto p-3 rounded-3xl shadow-card-hl border-[3px] border-[#cbd5e1]'>
            <h1 className='text-left text-lg md:text-2xl font-medium '>Menus for you</h1>
            <div className='category flex flex-row h-auto md:p-5 flex-wrap md:gap-14 gap-5 rounded-2xl'>
              {categorylist.map((ele)=> {
              return (
              <div key={ele.id} className='w-full md:w-[calc(32%-1.25rem)] h-32 md:h-40 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1]'>
                 <div className='image w-2/5 h-full flex items-center p-2'>
                    <LazyLoadImage className='rounded-xl w-full h-28 md:h-[calc(95%)] object-cover' src={ele.Image_url}/>
                 </div>
                 <div className='details w-3/5 h-full flex flex-row flex-wrap p-2'>
                   <p className='desc w-full h-3/4 text-xs md:text-sm text-wrap place-content-center text-center text-black'>
                       {ele.Description}
                   </p>
                   <span className='price w-2/5 h-1/4 text-sm md:text-base text-left place-content-center font-semibold'>{`₹${ele.Price}`}</span>
                   <button className='price w-3/5 h-1/4 md:p-[2px] p-[0.5px] md:text-sm text-xs rounded-full bg-[#0284c7]/80'>Add</button>
                 </div>
              </div>)})}
            </div> 
      </div>
      <div className='similar  h-auto flex flex-col p-3 shadow-card-hl rounded-3xl border-[3px] border-[#cbd5e1]'>
           <h1 className='text-left text-lg md:text-2xl font-medium'>Similar Restaurants</h1>
            <div className='category w-full flex flex-row h-auto md:gap-x-7 gap-4 md:p-5 p-3 overflow-x-scroll'>
                <div className='min-w-full md:min-w-[calc(25%-1.25rem)] h-44 md:h-60 bg-card shadow-card-hl rounded-2xl border-[2px] border-[#cbd5e1]'></div>
                <div className='min-w-full md:min-w-[calc(25%-1.25rem)] h-44 md:h-60 bg-card shadow-card-hl rounded-2xl border-[2px] border-[#cbd5e1]'></div>
                <div className='min-w-full md:min-w-[calc(25%-1.25rem)] h-44 md:h-60 bg-card shadow-card-hl rounded-2xl border-[2px] border-[#cbd5e1]'></div>
                <div className='min-w-full md:min-w-[calc(25%-1.25rem)] h-44 md:h-60 bg-card shadow-card-hl rounded-2xl border-[2px] border-[#cbd5e1]'></div>     
            </div> 
      </div>
    </div>
  )
}

export default Order_page