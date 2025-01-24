import {React,useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Cart = () => {

    const [page,setPage] = useState(true)
    console.log('page is',page)


  return (
    <div className='cart-details w-full h-full flex flex-row flex-wrap gap-2 md:gap-0 over md:p-4'>
        <div className='Add-ons h-1/5 md:h-[calc(97%)] md:w-1/4 w-full shadow-card-hl md:p-4 p-4 flex flex-col md:gap-5 rounded-3xl border-[1px] border-[#cbd5e1]'>
          <h1 className='heading font-bold md:text-xl text-sm text-left'> Quick Add-ons</h1>
          <div className='Cool-drinks flex md:flex-col flex-row gap-2 md:h-1/2 h-full'>
             <h1 className='hidden md:block heading font-semibold text-lg text-left'>Cool Drinks</h1>
             <div className='Drinks-list w-full h-full md:overflow-y-scroll overflow-x-scroll flex md:flex-col flex-row gap-3 md:p-2 p-1 overflow-hidden md:shadow-card-hl rounded-xl md:border-[3px] border-[#cbd5e1]'>
                <div className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full'></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2 font-sm text-xs md:text-sm text-wrap place-content-center '>
                            7 Up (750ml)
                        </p>
                        <span className='price w-2/3  text-xs md:text-sm place-content-center '>₹25.00</span>
                        <button className='price w-1/3 md:p-[2px] p-[1px] text-xs md:text-sm rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>
                <div className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            7 Up (750ml)
                        </p>
                        <span className='price w-2/3  place-content-center '>₹25.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>
                <div className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            7 Up (750ml)
                        </p>
                        <span className='price w-2/3  place-content-center '>₹25.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>
                <div className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            7 Up (750ml)
                        </p>
                        <span className='price w-2/3  place-content-center '>₹25.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div>
                <div className='min-w-72 md:min-w-full md:min-h-24 flex flex-row bg-card shadow-card-hl rounded-2xl border-[1px] border-[#cbd5e1] flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-1/2  font-sm text-wrap place-content-center '>
                            7 Up (750ml)
                        </p>
                        <span className='price w-2/3  place-content-center '>₹25.00</span>
                        <button className='price w-1/3 p-[2px] rounded-full bg-[#0284c7]/80'>Add</button>
                    </div>
                </div> 
             </div> 
          </div>
          <div className='hidden Ice-creams md:flex md:flex-col flex-row gap-2 md:h-1/2 h-full overflow-hidden'>
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
          </div>
        </div>
        <div className='Cart-value md:h-[calc(97%)] h-4/5 md:w-3/4 w-full flex flex-col md:grid grid-rows-6 grid-cols-5 gap-3 border border-red-600'>
          <div className='Cart-value w-full min-h-full row-span-6 col-span-3 shadow-card-hl rounded-xl border border-blue-600'>
             <h1 className='heading hidden md:block font-semibold md:text-lg text-sm text-left p-3'>Your Cart Value</h1>
             <div className='md:hidden buttons flex flex-row gap-3 p-2'>
                <button onClick = {()=>setPage(true)} className='bg-blue-500 w-1/4 h-1/3 rounded-lg text-sm'>Cart</button>
                <button onClick = {()=>setPage(false)} className='bg-blue-500 w-1/4 h-1/3 rounded-lg text-sm'>Offers</button>
             </div>
             {page?<div className='Cart-list w-full min-h-72 max-h-72 p-3 flex flex-row gap-4 md:h-[calc(70%)] md:max-h-[calc(70%)] overflow-y-scroll flex-wrap border border-green-500'>
                <div className='cart1 w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2'>
                    <div className='img w-1/4 h-full'>
                      <LazyLoadImage className='rounded-xl w-full h-full object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/fried_chicken.jpeg'/>
                    </div>
                    <div className='desc w-2/4 h-full'>
                      <h1 className='food-name md:text-lg text-sm font-medium h-2/3 text-center  place-content-center'>Mutton briyani</h1>
                      <span className='h-1/3 block w-auto text-xs md:text-base text-center'>From hotel name</span>
                    </div>
                    <div className='Quantity w-1/4 h-full place-content-center flex flex-row flex-wrap'>
                      <button className='md:w-5 w-4 md:h-4 h-3 Add  rounded-full text-center px-1 md:mt-5 mt-4 flex justify-center items-center border border-black '>+</button>
                      <span className='Count md:w-7 w-6 md:h-7 h-6 rounded-full md:text-xl text-base font-bold  block md:mt-3 mt-2 border border-black text-center'>4</span>
                      <button className='md:w-5 w-4 md:h-4 h-3 sub  rounded-full px-1 md:mt-5 mt-4 flex justify-center items-center border border-black'>-</button>
                      <h1 className='Tot-cost w-full md:text-base text-sm md:mt-4 mt-2'>₹2100.00</h1>
                    </div>
                </div>
                <div className='cart1 w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2'>
                    <div className='img w-1/4 h-full'>
                      <LazyLoadImage className='rounded-xl w-full h-full object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/veg_briyani.jpeg'/>
                    </div>
                    <div className='desc w-2/4 h-full'>
                      <h1 className='food-name md:text-xl text-base font-semibold h-2/3 text-center  place-content-center'>Mutton briyani</h1>
                      <span className='h-1/3 block w-auto text-sm md:text-base text-center'>From hotel name</span>
                    </div>
                    <div className='Quantity w-1/4 h-full place-content-center flex flex-row flex-wrap'>
                      <button className='md:w-5 w-4 md:h-4 h-3 Add  rounded-full text-center px-1 md:mt-5 mt-4 flex justify-center items-center border border-black '>+</button>
                      <span className='Count md:w-7 w-6 md:h-7 h-6 rounded-full md:text-xl text-base font-bold  block md:mt-3 mt-2 border border-black text-center'>4</span>
                      <button className='md:w-5 w-4 md:h-4 h-3 sub  rounded-full px-1 md:mt-5 mt-4 flex justify-center items-center border border-black'>-</button>
                      <h1 className='Tot-cost w-full font-semibold md:text-lg text-sm md:mt-4 mt-2'>₹2100.00</h1>
                    </div>
                </div>
                <div className='cart1 w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2'>
                    <div className='img w-1/4 h-full'>
                      <LazyLoadImage className='rounded-xl w-full h-full object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/Chocolate_cake.jpeg'/>
                    </div>
                    <div className='desc w-2/4 h-full'>
                      <h1 className='food-name md:text-xl text-base font-semibold h-2/3 text-center  place-content-center'>Mutton briyani</h1>
                      <span className='h-1/3 block w-auto text-sm md:text-base text-center'>From hotel name</span>
                    </div>
                    <div className='Quantity w-1/4 h-full place-content-center flex flex-row flex-wrap'>
                      <button className='md:w-5 w-4 md:h-4 h-3 Add  rounded-full text-center px-1 md:mt-5 mt-4 flex justify-center items-center border border-black '>+</button>
                      <span className='Count md:w-7 w-6 md:h-7 h-6 rounded-full md:text-xl text-base font-bold  block md:mt-3 mt-2 border border-black text-center'>4</span>
                      <button className='md:w-5 w-4 md:h-4 h-3 sub  rounded-full px-1 md:mt-5 mt-4 flex justify-center items-center border border-black'>-</button>
                      <h1 className='Tot-cost w-full font-semibold md:text-lg text-sm md:mt-4 mt-2'>₹2100.00</h1>
                    </div>
                </div>
                <div className='cart1 w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2'>
                    <div className='img w-1/4 h-full'>
                      <LazyLoadImage className='rounded-xl w-full h-full object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/paneer_butter_masala.jpeg'/>
                    </div>
                    <div className='desc w-2/4 h-full'>
                      <h1 className='food-name md:text-xl text-base font-semibold h-2/3 text-center  place-content-center'>Mutton briyani</h1>
                      <span className='h-1/3 block w-auto text-sm md:text-base text-center'>From hotel name</span>
                    </div>
                    <div className='Quantity w-1/4 h-full place-content-center flex flex-row flex-wrap'>
                      <button className='md:w-5 w-4 md:h-4 h-3 Add  rounded-full text-center px-1 md:mt-5 mt-4 flex justify-center items-center border border-black '>+</button>
                      <span className='Count md:w-7 w-6 md:h-7 h-6 rounded-full md:text-xl text-base font-bold  block md:mt-3 mt-2 border border-black text-center'>4</span>
                      <button className='md:w-5 w-4 md:h-4 h-3 sub  rounded-full px-1 md:mt-5 mt-4 flex justify-center items-center border border-black'>-</button>
                      <h1 className='Tot-cost w-full font-semibold md:text-lg text-sm md:mt-4 mt-2'>₹2100.00</h1>
                    </div>
                </div>
                <div className='cart1 w-full md:h-24 h-16 flex flex-row shadow-card-hl rounded-xl p-2'>
                    <div className='img w-1/4 h-full'>
                      <LazyLoadImage className='rounded-xl w-full h-full object-cover' src='https://foodcategory.s3.eu-north-1.amazonaws.com/grill_chicken.jpeg'/>
                    </div>
                    <div className='desc w-2/4 h-full'>
                      <h1 className='food-name md:text-xl text-base font-semibold h-2/3 text-center  place-content-center'>Mutton briyani</h1>
                      <span className='h-1/3 block w-auto text-sm md:text-base text-center'>From hotel name</span>
                    </div>
                    <div className='Quantity w-1/4 h-full place-content-center flex flex-row flex-wrap'>
                      <button className='md:w-5 w-4 md:h-4 h-3 Add  rounded-full text-center px-1 md:mt-5 mt-4 flex justify-center items-center border border-black '>+</button>
                      <span className='Count md:w-7 w-6 md:h-7 h-6 rounded-full md:text-xl text-base font-bold  block md:mt-3 mt-2 border border-black text-center'>4</span>
                      <button className='md:w-5 w-4 md:h-4 h-3 sub  rounded-full px-1 md:mt-5 mt-4 flex justify-center items-center border border-black'>-</button>
                      <h1 className='Tot-cost w-full font-semibold md:text-lg text-sm md:mt-4 mt-2'>₹2100.00</h1>
                    </div>
                </div>   
             </div>:
             <div className='payment-offers w-full min-h-72 max-h-72 row-span-4 col-span-2 p-2 md:flex flex-col gap-4 shadow-card-hl rounded-xl overflow-y-scroll flex-wrap'>
                <h1 className='heading font-semibold text-sm p-3 text-center '>Offers & Cash back</h1>
                <div className=' w-full h-16 flex flex-row rounded-2xl  flex-wrap p-2 border border-black'>
                    <div className='image w-1/3 h-full border border-black'></div>
                    <div className='w-2/3 flex flex-row flex-wrap p-1'>
                        <p className='desc w-full h-full text-[10px] text-wrap text-left'>Flat 10% cashback upto Rs.100 on orders above using icici credit card</p>
                    </div>
                </div>  
             </div>}
             <div className='Amt-details w-full h-2/6 flex flex-row flex-wrap px-4 py-2 justify-evenly md:h-[calc(24%)] text-sm md:text-base'>
                <h1 className='cart-val w-1/2 text-xs md:text-sm text-left border border-black'>Total Cart Value</h1>
                <span className='Amt w-1/2 text-xs md:text-sm text-right md:h-1/4'>₹6840.00</span>
                <h1 className='cart-val w-1/2 text-xs md:text-sm text-left md:h-1/4'>Delivery & Handling charges</h1>
                <span className='Amt w-1/2 text-xs md:text-sm text-right md:h-1/4'>₹400.00</span>
                <h1 className='cart-val w-1/2 text-xs md:text-sm text-left text-bold md:h-1/4'>Total</h1>
                <span className='Amt w-1/2 text-right font-bold md:h-1/4'>₹6880.00</span>
                <button className='border border-black w-1/2'>Pay & order</button>
            </div>
          </div>
          <div className='hidden payment-offers row-span-4 col-span-2 p-2 md:flex flex-col gap-4 shadow-card-hl rounded-xl'>
                <h1 className='heading font-semibold text-lg p-3 text-center '>Offers & Cash back</h1>
                <div className=' w-full min-h-24 flex flex-row rounded-2xl  flex-wrap p-2'>
                    <div className='image w-1/3 h-full'></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-full text-sm text-wrap text-left place-content-center'>Flat 10% cashback upto Rs.100 on orders above using icici credit card</p>
                    </div>
                </div>
                <div className=' w-full min-h-24 flex flex-row rounded-2xl  flex-wrap p-2'>
                    <div className='image w-1/3 h-full'></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-full text-sm text-wrap text-left place-content-center'>Flat 10% cashback upto Rs.100 on orders above using icici credit card</p>
                    </div>
                </div>
                <div className=' w-full min-h-24 flex flex-row rounded-2xl  flex-wrap p-2'>
                    <div className='image w-1/3 h-full '></div>
                    <div className='w-2/3 flex flex-row flex-wrap'>
                        <p className='desc w-full h-full text-sm text-left text-wrap place-content-center'>Flat 10% cashback upto Rs.100 on orders above using icici credit card</p>
                    </div>
                </div>
                <h1 className='heading font-semibold text-lg p-3 text-center'>Apply Promo code</h1>
                <div className='w-full flex flex-row gap-6 justify-center'>
                    <input type='text'className='w-48 p-2 border border-black rounded-full'/>
                    <button className='price w-28 p-[1px] rounded-full bg-[#0284c7]/80'>Apply</button>
                </div>
          </div>
          <div className='hidden Options row-span-2 col-span-2 shadow-card-hl rounded-xl p-2 md:flex flex-row flex-wrap gap-2 justify-evenly'>
             <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2  shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center'>Payment Option</h1>
                <div className='image w-1/3 h-16 rounded-full border border-black mt-2'></div>
                <div className='w-2/3 flex flex-row flex-wrap'>
                    <p className='desc w-full h-full  font-sm text-wrap place-content-center'>COD</p>
                </div>
             </div>
             <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2  shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center'>Address</h1>
                <div className='image w-1/3 h-16 rounded-full border border-black mt-2'></div>
                <div className='w-2/3 flex flex-row flex-wrap'>
                    <p className='desc w-full h-full  font-sm text-wrap place-content-center'>No,11 muthurama....</p>
                </div>
             </div>
             <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2 shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center '>Add Delivery Instruct..</h1>
                <div className='image w-1/3 h-16 rounded-full border border-black mt-2'></div>
                <div className='w-2/3 flex flex-row flex-wrap'>
                    <p className='desc w-full h-full  font-sm text-wrap place-content-center'>No,11 muthurama....</p>
                </div>
             </div>
             <div className='w-[calc(49%-1rem)] h-1/2 flex flex-row rounded-2xl flex-wrap p-2 shadow-card-hl'>
                <h1 className='w-full h-8 heading font-semibold text-center'>Contact Support</h1>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Cart