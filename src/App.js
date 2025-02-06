import './App.css';
import Login from './Login';
import Homepage from './Homepage';
import Protected_Route from './Protected_Route';
import {Routes,Route} from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Order_page from './Order_page';
import Cart from './Cart';
import Profilepage from './Profilepage';
import Addrec from './Addrec';
import Add_brands from './Add_brands';
import Pagenotfound from './Pagenotfound';
import {configureStore,createSlice} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'


const slice = createSlice({
  name:'Test',
  initialState:{
    cate_list:[], //list for viewing in order page after search category filter in solr
    cart_list:[] //list for viewing cart list in cart page
  },
  reducers: 
  {
    cate_list(state,action){
      state.cate_list = action.payload
    },

    delete_cartlist(state,action){
      state.cart_list = state.cart_list.filter((ele)=>ele.id!==action.payload)
    },

    added_cart_list(state,action) { //adding to cart if already exists increase the quantity by 1 else push to cart list array
    
      const itemExists = state.cart_list.some((ele) => ele.id === action.payload.id);
    
      if (itemExists) {
        state.cart_list = state.cart_list.map((ele) => {
          if (ele.id === action.payload.id) {
            return { ...ele, quantity: ele.quantity + 1 };
          }
          return ele 
        });
      } else {
        state.cart_list.push({ ...action.payload, quantity: 1});
      }
    },
 
  }
})

export const {cate_list,added_cart_list,delete_cartlist} = slice.actions;
// export const backend_url ='https://wizardbackend.site'
export const backend_url ='http://localhost:8000'


const store = configureStore({
  reducer:{
    sel_list:slice.reducer
  }
})


 

function App() {

  return (
    <Provider store ={store}>
        <div className="App w-screen h-screen md:px-36 md:py-4 bg-[rgb(39,41,45)] font-poppins">
          <Routes>
            <Route path='/Food_order' element={<Login/>}/>
            <Route path="*" element={<Pagenotfound/>}/>
            <Route path="/homepage" element={<Protected_Route><Homepage/></Protected_Route>}>
              <Route index element={<About/>}/>
              <Route path="contactpage" element={<Contact/>}/>
              <Route path="Orderpage" element={<Order_page/>}/>
              <Route path="Cartpage" element={<Cart/>}/>
              <Route path="Profilepage" element={<Profilepage/>}/>
              {/* <Route path="Addrec" element={<Addrec/>}/>
              <Route path="Add_brands" element={<Add_brands/>}/> */}
            </Route> 
         </Routes>
       </div>
    </Provider>
    
  );
}

export default App;



