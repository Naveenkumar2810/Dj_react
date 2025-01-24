import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cate_list } from './App';

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
        
        const category = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/', {coll_name:'Food_category',type:'query'},
          {
            withCredentials:true
          })
          
          // console.log('catrgory data is ',category.data)
          
          const hotels = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/', {coll_name:'Brand',type:'query'},
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
    
  const sel_option = async (option)=>{
    console.log('selected option is',option)
    
    const category = await axios.post('http://127.0.0.1:8000/Api/get_solr_query/', {coll_name:'Food_list',type:'filter_query',req:[{'Category':option?option:'a'}]},
      {
        withCredentials:true
      })
    
      const solr_cate_list = category.data.Category
      console.log('category lits is',solr_cate_list)
      dispatch(cate_list(solr_cate_list))
      navigate('/homepage/orderpage')
  }


  return (
    <div className='flex flex-col gap-7 overflow-hidden md:p-4 h-auto w-full'>
        {/* <div className='Preference w-full flex flex-row gap-2 p-1 md:p-3 bg-card shadow-card-hl rounded-full'>
            <div className='Vegeterian w-1/3 border bg-transparent p-2 rounded-full'>
              <span></span>
              <h1 className='text-sm md:text-normal'>Vegeterian</h1>
            </div>
            <div className='Non-Vegeterian w-1/3 border border-black md:p-2 rounded-full'>
               <span></span>
               <h1 className='text-sm md:text-normal'>Non-Veg</h1>
            </div>
            <div className='Deserts w-1/3 border border-black md:p-2 rounded-full'>
               <span></span>
               <h1 className='text-sm md:text-normal'>Deserts</h1>
            </div>
        </div> */}
        <div className='offer-card rounded-3xl bg-card shadow-card-hl h-auto w-full border border-black overflow-hidden'>
          <LazyLoadImage className='w-full h-32 md:h-52 object-cover border border-black' src='https://foodcategory.s3.eu-north-1.amazonaws.com/card1.jpeg'/>
        </div>
        <div className='choice flex flex-col w-full md:h-auto h-auto bg-card shadow-card-hl p-3 rounded-3xl'>
            <h1 className='text-left text-lg md:text-2xl font-medium'>Categories for you</h1>
            <div className='category flex flex-row md:gap-16 gap-6 md:p-5 p-2 overflow-x-scroll h-auto scroll-smooth'>
            {records.category_list.map((ele)=>{
              return (
              <div key={ele.id} onClick={()=>sel_option(ele.Category)} className='h-auto p-1 w-auto'>
                 <LazyLoadImage className='hover:opacity-60 rounded-full object-cover md:max-w-40 md:min-w-40 md:h-40 min-w-28 max-w-28 h-28' src={`${ele.Image_url}`}/>
                 <span className='font-semibold text-sm md:text-base mt-2'>{ele.Food_name.charAt(0).toUpperCase() + ele.Food_name.slice(1)}</span>
              </div>
              )
              })}
            </div>
        </div>
        <div className='Brands flex flex-col w-full md:h-auto h-auto bg-card shadow-card-hl p-3 rounded-3xl'>
            <h1 className='text-left text-lg md:text-2xl font-medium'>Brands for you</h1>
            {/* <div className='category flex flex-row gap-12 md:p-5 p-2 overflow-x-scroll h-auto'> */}
            <div className='category flex flex-row md:gap-16 gap-6 md:p-5 p-2 overflow-x-scroll h-auto scroll-smooth'>
            {records.hotels_list.map((ele)=> {
              return (
               <div key={ele.id} className='h-auto p-1'>
                 <LazyLoadImage className='hover:opacity-60 rounded-full object-cover md:max-w-40 md:min-w-40 md:h-40 min-w-28 max-w-28 h-28' src={`${ele.Brand_Image_url}`}/>
                 <span className='block font-semibold text-sm md:text-base mt-2 max-w-40'>{ele.Hotel_name.charAt(0).toUpperCase() + ele.Hotel_name.slice(1)}</span>
               </div>
              )
              })}
              </div>
        </div>
        <div className='Suggesstion flex flex-col w-full h-auto rounded-3xl gap-3'>
          <h1 className='text-left text-2xl font-medium'>Suggesstions for you</h1>
          <div className='category flex flex-row flex-wrap flex-grow gap-6 justify-evenly p-3 md:p-0'>
              {records.hotels_list.map((ele)=> {
                return(
              <div key={ele.id} className='w-full md:w-[calc(33.33%-1.25rem)] h-auto md:h-72 flex flex-row flex-wrap bg-card shadow-card-hl rounded-3xl p-3 md:p-4'>
                <div className='image w-full md:h-3/4 h-36 shadow-card-hl'>
                   <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.Food_Image_url}/>
                </div>
                <h1 className='font-semibold md:text-lg text-sm text-left w-2/3 mt-1'>{ele.Hotel_name.charAt(0).toUpperCase() + ele.Hotel_name.slice(1)}</h1>
                <span className='text-sm w-1/3 mt-1'>Rating</span>
                <span className='w-2/3 text-sm text-left mt-1'>{ele.Description}</span>
                <span className='w-1/3 text-sm mt-1'>25 min</span>
              </div>)
          })}
          </div>
        </div>
    </div>
  )
}

export default About