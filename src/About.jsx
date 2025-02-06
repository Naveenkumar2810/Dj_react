import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cate_list,backend_url } from './App';

const About = () => {

  const navigate = useNavigate()

  const [records, setRecords] = useState({
    category_list:[],
    hotels_list:[]
  });

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchRecords = async () => {
      try {
        
        const category = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Food_category',type:'query'},
          {
            withCredentials:true
          })
          
          // console.log('catrgory data is ',category.data)
          
          const hotels = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Brand',type:'query'},
            {
              withCredentials:true
            })
            
            // console.log('hotel list',hotels.data)

          setRecords({category_list:category.data,hotels_list:hotels.data})
        }
     catch (error){
        console.log(error) }

      };
      fetchRecords()  
  },[])
    
  const sel_option = async (filter_field,option)=>{

    try {
      const filter_data = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Food_list',type:'filter_query',req:[{[filter_field]:option?option:'cake'}]},
        {
          withCredentials:true
        })
      
        const solr_cate_list = filter_data.data[filter_field]
        dispatch(cate_list(solr_cate_list))
        navigate('/homepage/orderpage')
    }
    catch (error){
      console.log(error)
    }
  }


  return (
    <div className='flex flex-col md:gap-7 gap-3 overflow-hidden md:p-4 h-auto w-full'>
        <div className='offer-card rounded-3xl md:bg-card bg-white shadow-card-hl h-auto w-full overflow-hidden relative '>
          <h1 className='absolute md:top-10 top-2 md:left-10 left-2 w-2/5 h-3/5  md:text-6xl text-xl md:text-gray-400 text-white my-auto mt-2 font-semibold'>Flat 50% off
           <span className='block w-full h-12 md:text-base text-[8px] mt-2 leading-4 md:text-gray-400 text-white font-semibold'>upto Rs.250 on orders above 699 on your first order.</span>
          </h1>
          <LazyLoadImage className='w-full h-24 md:h-52 object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/card1.jpeg'/>
        </div>
        <div className='choice flex flex-col w-full md:h-auto h-auto md:bg-card bg-white shadow-card-hl p-3 rounded-3xl'>
            <h1 className='text-left text-lg md:text-xl font-medium'>Categories for you</h1>
            <div className='category flex flex-row md:gap-16 gap-6 md:p-5 p-2 overflow-x-scroll h-auto scroll-smooth scrollbar-none'>
            {records.category_list.map((ele)=>{
              return (
              <div key={ele.id} onClick={()=>sel_option('Category',ele.Category)} className='h-auto p-1 w-auto'>
                 <LazyLoadImage className='hover:opacity-60 rounded-full object-cover md:max-w-40 md:min-w-40 md:h-40 min-w-28 max-w-28 h-28' src={`${ele.Image_url}`}/>
                 <span className='font-semibold text-xs md:text-base mt-2'>{ele.Food_name.charAt(0).toUpperCase() + ele.Food_name.slice(1)}</span>
              </div>
              )
              })}
            </div>
        </div>
        <div className='Brands flex flex-col w-full md:h-auto h-auto md:bg-card bg-white shadow-card-hl p-3 rounded-3xl'>
            <h1 className='text-left text-lg md:text-xl font-medium'>Brands for you</h1>
            {/* <div className='category flex flex-row gap-12 md:p-5 p-2 overflow-x-scroll h-auto'> */}
            <div className='category flex flex-row md:gap-16 gap-6 md:p-5 p-2 overflow-x-scroll h-auto scroll-smooth scrollbar-none'>
            {records.hotels_list.map((ele)=> {
              return (
               <div key={ele.id} onClick={()=>sel_option('Hotel_name',ele.Hotel_name)} className='h-auto p-1'>
                 <LazyLoadImage className='hover:opacity-60 rounded-full object-cover md:max-w-40 md:min-w-40 md:h-40 min-w-28 max-w-28 h-28' src={`${ele.Brand_Image_url}`}/>
                 <span className='block font-semibold text-xs md:text-base mt-2 max-w-40'>{ele.Hotel_name.charAt(0).toUpperCase() + ele.Hotel_name.slice(1)}</span>
               </div>
              )
              })}
              </div>
        </div>
        <div className='Suggesstion flex flex-col w-full h-auto gap-3'>
          <h1 className='text-left md:text-xl text-lg font-medium'>Suggesstions for you</h1>
          <div className='category flex flex-row flex-wrap gap-6 justify-evenly p-2 md:p-0'>
              {records.hotels_list.map((ele)=> {
                return(
              <div key={ele.id} onClick={()=>sel_option('Hotel_name',ele.Hotel_name)} className='w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(33.33%-1.25rem)] h-auto md:h-72 flex flex-row flex-wrap bg-card shadow-card-hl'>
                <div className='image w-full md:h-3/4 h-36'>
                   <LazyLoadImage className='w-full h-full object-cover' src={ele.Food_Image_url}/>
                </div>
                <div className='w-full h-1/4 p-1 flex flex-row flex-wrap px-1'>
                  <h1 className='font-semibold md:text-lg text-sm text-left w-[calc(65%-1rem)] h-1/2 mt-1 ml-2'>{ele.Hotel_name.charAt(0).toUpperCase() + ele.Hotel_name.slice(1)}</h1>
                  <span className='md:text-sm text-xs w-1/3 mt-1 h-1/2 text-right'>Rating</span>
                  <span className='md:text-sm text-xs text-left mt-1 w-[calc(65%-1rem)] ml-2'>{ele.Description}</span>
                  <span className='w-1/3 md:text-sm text-xs mt-1 text-right'>25 min</span>
                </div> 
              </div>)
          })}
          </div>
        </div>
    </div>
  )
}

export default About

