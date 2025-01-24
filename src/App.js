import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react'
import Login from './Login';
import Homepage from './Homepage';
import Protected_Route from './Protected_Route';
import {Router,Routes,Route} from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Order_page from './Order_page';
import Cart from './Cart';
import Profilepage from './Profilepage';
import Addrec from './Addrec';
import Add_brands from './Add_brands';
import {configureStore,createSlice} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'


const slice = createSlice({
  name:'Test',
  initialState:{cate_list:[]},
  reducers: {cate_list(state,action){
    state.cate_list = action.payload
  }
  }
})

export const {cate_list} = slice.actions;


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
            <Route index element={<Login/>}/>
            <Route path="/homepage" element={<Protected_Route><Homepage/></Protected_Route>}>
              <Route index element={<About/>}/>
              <Route path="contactpage" element={<Contact/>}/>
              <Route path="Orderpage" element={<Order_page/>}/>
              <Route path="Cartpage" element={<Cart/>}/>
              <Route path="Profilepage" element={<Profilepage/>}/>
              <Route path="Addrec" element={<Addrec/>}/>
              <Route path="Add_brands" element={<Add_brands/>}/>
            </Route>
         </Routes>
       </div>
    </Provider>
    
  );
}

export default App;



