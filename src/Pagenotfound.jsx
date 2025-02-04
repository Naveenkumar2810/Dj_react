import React from 'react'
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <div className='w-full h-full flex justify-center items-center  bg-cus-white rounded-2xl'>
        <div className='md:w-1/3 w-4/5 md:h-1/3 h-2/3 border-[1px] border-[#cbd5e1] flex justify-center items-center flex-col bg-card gap-4 rounded-3xl shadow-card-hl'>
          <h1>The page you are searching for does not exist...</h1>
          <Link to='/homepage'>
            <button className='w-auto p-2 px-3 rounded-xl bg-blue-600 text-xs md:text-base'>Go to homepage</button>
          </Link> 
        </div>
    </div>
  )
}

export default Pagenotfound; 