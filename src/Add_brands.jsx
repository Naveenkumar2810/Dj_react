import React, { useState } from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const Add_brands = () => {

    const [fields,Setfields]=useState({
      Hotel_name:'',
      Category:'',
      Description:'',
      Brand_image:'',
      Food_image:'',
      Location:'',
    })
    console.log(fields)
    console.log(typeof fields.Brand_image)
    console.log(typeof fields.Food_image)


    const setfield_values =(e)=>{
       const {name,value} =e.target;
       if (name==='Brand_image'){
        console.log('file is',e.target.files)
        Setfields({...fields,Brand_image:e.target.files[0]})
       }
       else if (name==='Food_image'){
        console.log('file is',e.target.files)
        Setfields({...fields,Food_image:e.target.files[0]})
       }
       else{
        Setfields({...fields,[name]:value})
       }
    }


    const upload_func = (e)=>{
      e.preventDefault();
      console.log('Submitting Form')
      // console.log(`${uuidv4()}_${fields.Food_name.replace(/\s+/g,'_')}`)

      const formData = new FormData()
      
      formData.append('Type','Brands');
      formData.append('Uniq_id',`${uuidv4()}_${fields.Hotel_name.replace(/\s+/g,'_')}`);
      formData.append('Hotel_name', fields.Hotel_name)
      formData.append('Category', fields.Category);
      formData.append('Description', fields.Description);
      formData.append('Brand_image', fields.Brand_image);
      formData.append('Food_image', fields.Food_image);
      formData.append('Location', fields.Location);

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }
  
      const upload = async ()=>{
         console.log('Sending Axios req')
      try {
           const response = await axios.post('http://127.0.0.1:8000/Api/Upload_toS3/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
          }
            });
          console.log('Response:', response.data);
      } catch (error) {
          console.error('Error:', error);
        }
      }
      
      upload()
    }
    
  return (
        <div className='w-full h-full flex justify-center items-center bg-cus-white shadow-card-hl rounded-2xl'> 
            <form onSubmit={(e)=>upload_func(e)} className='w-2/5 h-auto shadow-card-hl rounded-2xl flex flex-row flex-wrap gap-5  justify-center items-center p-5 '>
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Hotel name</label>
                <input className='w-full  h-14 rounded-2xl shadow-card-hl border-[1px] border-[#cbd5e1]' onChange={(e)=>setfield_values(e)} name='Hotel_name' type='text'/>
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Food Category</label>
                <input className='w-1/6 h-7' onChange={(e)=>setfield_values(e)} name='Category' type='Radio' value='Veg'/>
                <span className="block text-lg font-semibold text-gray-900  w-1/6 text-left">Veg</span>
                <input className='w-1/6  h-7' onChange={(e)=>setfield_values(e)} name='Category' type='Radio' value='Non-Veg'/>
                <span className="block text-lg font-semibold text-gray-900  w-1/6 text-left">Non Veg</span>
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Description</label>
                <input className='w-full  h-14 rounded-2xl shadow-card-hl border-[1px] border-[#cbd5e1]' onChange={(e)=>setfield_values(e)} name='Description' type='text'/>
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Location</label>
                <input className='w-full  h-14 rounded-2xl shadow-card-hl border-[1px] border-[#cbd5e1]' onChange={(e)=>setfield_values(e)} name='Location' type='text'/>
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Image for the Brand</label>
                <input className='w-2/3 mx-auto items-center' onChange={(e)=>setfield_values(e)} name='Brand_image' type='file' />
                <label className="block text-lg font-semibold text-gray-900  w-full text-left ml-1">Image for the food</label>
                <input className='w-2/3 mx-auto items-center' onChange={(e)=>setfield_values(e)} name='Food_image' type='file' />
                <button name ='btn' className='price w-1/3 p-2 rounded-2xl bg-[#0284c7]/80'>Submit</button>
            </form>
        </div>
  )
}

export default Add_brands;



