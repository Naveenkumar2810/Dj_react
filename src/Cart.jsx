import {React,useState,useEffect} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector,useDispatch } from 'react-redux';
import { added_cart_list,delete_cartlist,backend_url } from './App';
import axios from 'axios';


const Cart = () => {

    const dispatch=useDispatch()

    const [cart,setCart] = useState({
        page:true,
        quick_add_ice:[]
    })

    const cart_list = useSelector((state)=>state.sel_list.cart_list)

    const cart_cost =cart_list ? cart_list.reduce((tot,ele)=> tot + Number(ele.Price) * Number(ele.quantity),0) :0
    
    const clear_cart_list = ((id)=>{
        
       dispatch(delete_cartlist(id))
    })
      
    const cart_add = (ele)=>{
        dispatch(added_cart_list(ele))
    }

    const card_offers = [
        {name:'icici',img:'https://offerlists.s3.eu-north-1.amazonaws.com/icici_card.png'},
        {name:'One',img:'https://offerlists.s3.eu-north-1.amazonaws.com/onecard.jpg'},
        {name:'yes bank',img:'https://offerlists.s3.eu-north-1.amazonaws.com/yesbank.png'}
    ]

    const payment_options = [
        {label:'Upi',value:null},
        {label:'Credit/Debit card',value:'veg'},
        {label:'Cash on delivery',value:'non veg'},
    ]

    useEffect(()=>{

           const get_quickadd = async ()=> {
              try{
                const category = await axios.post(backend_url+'/Api/get_solr_query/', {coll_name:'Food_list',type:'filter_query',req:[{'Category':'icecream'}]},
                  {
                   withCredentials:true
                  })

                const icecream_data = category.data.Category
                setCart({...cart,quick_add_ice:icecream_data})
               }catch(error){
                
            }
          }
          get_quickadd()
    },[])


  return (
    <div className='cart-details w-full h-full flex flex-row flex-wrap gap-2 md:gap-3 md:p-4'>
        <div className='Add-ons h-1/5 md:h-[calc(97%)] md:w-[calc(24%)] w-full shadow-card-hl md:p-4 p-4 flex flex-col md:gap-5 rounded-3xl border-[1px] border-[#cbd5e1]'>
          <h1 className='heading font-bold md:text-xl text-sm text-left'> Quick Add-ons</h1>
          <div className='Ice cream flex md:flex-col flex-row gap-2 md:h-1/2 h-full'>
             <h1 className='hidden md:block heading font-semibold text-lg text-left'>Ice creams</h1>
             <div className='icecream-list w-full h-full md:overflow-y-scroll md:overflow-x-hidden overflow-x-scroll overflow-y-hidden flex md:flex-col flex-row gap-3 md:p-2 py-2 p-1 overflow-hidden md:shadow-card-hl rounded-xl md:border-[3px] border-[#cbd5e1] scrollbar-thin'>
                {cart.quick_add_ice.map((ele)=>{
                return(
                <div key={ele.id} className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full'>
                       <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.Image_url}/>
                    </div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2 text-xs md:text-sm text-wrap place-content-center'>
                            {ele.Food_name.charAt(0).toUpperCase() + ele.Food_name.slice(1)}
                        </p>
                        <span className='price w-2/3  text-xs md:text-sm place-content-center '>{`Rs.${ele.Price}`}</span>
                        <button onClick={()=>cart_add(ele)} className='price w-1/3 md:p-[2px] p-[1px] text-xs md:text-sm rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>)})}
             </div> 
          </div>
          {/* <div className='hidden Ice-creams md:flex md:flex-col flex-row gap-2 md:h-1/2 h-full overflow-hidden'>
             <h1 className='heading font-semibold text-lg text-left'>Ice Creams</h1>
             <div className='Ice-cream-list h-full overflow-y-scroll flex flex-col gap-3 p-2 overflow-hidden shadow-card-hl rounded-xl border-[3px] border-[#cbd5e1]'>
                <div className=' w-full min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            Vanilla Icecream
                        </p>
                        <span className='price w-2/3  place-content-center '>₹60.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>
                <div className=' w-full min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            Vanilla Icecream
                        </p>
                        <span className='price w-2/3  place-content-center '>₹60.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div> 
                <div className=' w-full min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            Vanilla Icecream
                        </p>
                        <span className='price w-2/3  place-content-center '>₹60.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div> 
                <div className=' w-full min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            Vanilla Icecream
                        </p>
                        <span className='price w-2/3  place-content-center '>₹60.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div> 
                <div className=' w-full min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            Vanilla Icecream
                        </p>
                        <span className='price w-2/3  place-content-center '>₹60.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div> 
             </div> 
          </div> */}
        </div>
        <div className='Cart md:h-[calc(97%)] h-4/5 md:w-3/4 w-full flex flex-col md:grid grid-rows-6 grid-cols-5 gap-3 rounded-3xl'>
          <div className='Cart-value w-full min-h-full row-span-6 col-span-3 shadow-card-hl rounded-xl'>
                <h1 className='heading hidden md:block font-semibold md:text-lg text-sm text-left p-3'>{`Your Cart : ${cart_list.length}`}</h1>
                <div className='md:hidden buttons flex flex-row gap-3 p-2'>
                    <button onClick = {()=>setCart({...cart,page:true})} className='bg-blue-500 w-1/4 max-w-20 h-1/3 rounded-lg text-sm'>Cart</button>
                    <button onClick = {()=>setCart({...cart,page:false})} className='bg-blue-500 w-1/4 max-w-20 h-1/3 rounded-lg text-sm'>Offers</button>
                </div>
                {cart.page?
                <div className='Cart-list w-full min-h-72 max-h-72 p-3 flex flex-col gap-4 md:h-[calc(70%)] md:max-h-[calc(70%)] overflow-y-scroll scrollbar-thin'>
                    {cart_list.length>0? cart_list.map((ele)=>{
                    return (
                    <div className='cart-list w-full sm-w-1/2 md:w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2 bg-card border-[1px] border-[#cbd5e1]'>
                        <div className='img w-1/4 h-full'>
                           <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.Image_url}/>
                        </div>
                        <div className='desc w-2/4 h-full'>
                           <h1 className='food-name md:text-base text-xs font-medium h-2/3 text-center  place-content-center'>{ele.Food_name}</h1>
                            <span className='h-1/3 block w-auto text-xs md:text-base text-center'>{ele.Hotel_name.charAt(0).toUpperCase() + ele.Hotel_name.slice(1)}</span>
                        </div>
                        <div className='Quantity w-1/4 h-full place-content-center flex flex-col flex-wrap'>
                        <div className='w-3/5 place-content-center flex flex-row flex-wrap justify-center items-center'>
                            {/* <button className='md:w-4 w-2 md:h-3 h-1 Add rounded-full text-center px-1 flex justify-center items-center'>+</button> */}
                            <span className='Count w-auto block rounded-full md:text-sm text-xs md:font-semibold md:px-3 md:bg-card md:shadow-card-hl p-1'>{ele.quantity}</span>
                            {/* <button className='md:w-4 w-2 md:h-3 h-1 sub  rounded-full px-1 flex justify-center items-center'>-</button> */}
                            <h1 className='Tot-cost w-full md:text-base text-xs md:mt-4 mt-2'>{`Rs.${ele.Price}`}</h1>
                        </div>
                          <span onClick={()=>clear_cart_list(ele.id)}className='menu-bar w-2/5 h-8 flex items-center md:py-4 md:px-3 p-1 rounded-full mr-1 hover:cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </span>
                        </div>
                    </div>)}):<h1 className='md:text-xl text-lg mx-auto my-auto text-black'>Cart is empty </h1>}
                </div>:
                <div className='payment-offers w-full min-h-72 max-h-72 row-span-4 col-span-2 p-2 md:flex flex-col gap-4 overflow-y-scroll flex-wrap'>
                    <h1 className='heading font-semibold text-sm p-3 text-center '>Offers & Cash back</h1>
                    {card_offers.map((ele)=>{
                    return (
                    <div className=' w-full h-16 flex flex-row rounded-2xl  flex-wrap p-2'>
                        <div className='image w-1/3 h-full '>
                           <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.img}/>
                        </div>
                        <div className='w-2/3 flex flex-row flex-wrap p-1'>
                            <p className='desc w-full h-full text-[10px] text-wrap text-left'>{`Flat 10% cashback upto Rs.600 on orders above using ${ele.name} credit card`}</p>
                        </div>
                    </div> )})}
                </div>}
                <div className='Amt-details w-full h-2/6 flex flex-row flex-wrap px-4 py-2 justify-evenly md:h-[calc(24%)] text-sm md:text-base'>
                    <h1 className='cart-val w-1/2 text-xs md:text-sm text-left'>Total Cart Value</h1>
                    <span className='Amt w-1/2 text-xs md:text-sm text-right md:h-1/4'>{`Rs.${(cart_cost).toFixed(2)}`}</span>
                    <h1 className='cart-val w-1/2 text-xs md:text-sm text-left md:h-1/4'>Delivery & Handling charges</h1>
                    <span className='Amt w-1/2 text-xs md:text-sm text-right md:h-1/4'>{`Rs.${(0.15 * cart_cost).toFixed(2)}`}</span>
                    <h1 className='cart-val w-1/2 text-xs md:text-sm text-left text-bold md:h-1/4'>Total</h1>
                    <span className='Amt w-1/2 text-right font-bold md:h-1/4'>{`Rs.${(cart_cost + 0.15 * cart_cost).toFixed(2)}`}</span>
                    <button className='rounded-full bg-blue-500 hover:bg-blue-600 w-1/2 p-1'>Pay & order</button>
                </div>
          </div>
          <div className='hidden payment-offers row-span-4 col-span-2 p-2 md:flex flex-col gap-4 shadow-card-hl rounded-xl'>
                <h1 className='heading font-semibold text-lg p-3 text-center '>Offers & Cash back</h1>
                <div className='w-full h-3/5 flex flex-col gap-3'>
                    {card_offers.map((ele)=>{
                    return (
                    <div className=' w-full h-16 flex flex-row rounded-2xl flex-wrap p-1 bg-card justify-evenly'>
                        <div className='image w-1/4 h-full'>
                            <LazyLoadImage className='rounded-xl w-full h-full object-cover' src={ele.img}/>
                        </div>
                        <div className='w-2/4 flex flex-row flex-wrap p-1'>
                            <p className='desc w-full h-full text-[10px] text-wrap text-left'>{`Flat 10% cashback upto Rs.600 on orders above using ${ele.name} credit card`}</p>
                        </div>
                    </div> )})}
                </div>
                <h1 className='heading font-semibold text-lg p-3 text-center'>Apply Promo code</h1>
                <div className='w-full flex flex-row gap-6 justify-center'>
                    <input type='text'className='w-48 p-2 border border-black rounded-full'/>
                    <button className='price w-28 p-[1px] rounded-full bg-[#0284c7]/80'>Apply</button>
                </div>
          </div>
          <div className='hidden Options row-span-2 col-span-2 shadow-card-hl rounded-xl p-2 md:flex flex-row flex-wrap gap-2 justify-evenly'>
             <div className='w-full h-1/2 flex flex-row rounded-2xl flex-wrap p-2  shadow-card-hl'>
                <h1 className='w-full h-1/5 heading font-semibold text-center'>Payment Option</h1>
                <div className='image w-full h-4/5 p-2 flex flex-row justify-evenly'>
                   {/* <LazyLoadImage className='rounded-full w-20 h-20 object-cover border border-black' src=''/> */}
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-18">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                   </svg>
                   <span className='w-3/5 h-full flex justify-center items-center bg-cus-white'>
                      <select className='w-full p-2 mx-auto rounded-2xl bg-card shadow-card-hl' name='payment_options'>
                       {payment_options.map((ele,index)=>{
                       return(
                       <option key={index}>{ele.label}</option>
                       )})}
                      </select>
                   </span>
                </div>
             </div>
             <div className='w-full h-1/2 flex flex-row rounded-2xl flex-wrap p-2  shadow-card-hl'>
                <h1 className='w-full h-1/5 heading font-semibold text-center'>Address</h1>
                <div className='image w-full h-4/5 p-2 flex flex-row justify-evenly'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-18">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className='w-3/5 h-full flex justify-center items-center'>Selected Address</span>
                </div>
             </div>
             {/* <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2 shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center '>Add Delivery Instruct..</h1>
                <div className='image w-1/3 h-16 rounded-full border border-black mt-2'></div>
                <div className='w-2/3 flex flex-row flex-wrap'>
                    <p className='desc w-full h-full  font-sm text-wrap place-content-center'>No,11 muthurama....</p>
                </div>
             </div>
             <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2 shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center'>Contact Support</h1>
             </div> */}
          </div>
        </div>
    </div>
  ) 
}

export default Cart