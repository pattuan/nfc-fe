import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from "./page/home";
import Cart from "./page/cart";
import Login from "./page/login";
import Register from "./page/register";
import Banner from './component/banner'
import Layout from "./page/layout";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logout from './page/logout';
import Order from './page/order';
import OrderDetail from './page/order-detail';
import OrderMe from './page/order-me';
function App() {
  return (
    <div className="App">
      <Banner />
      
        <Routes>
        
          
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/order' element={<Order />} />
          <Route path='/order/:id' element={<OrderDetail />} />
          <Route path='/order/me' element={<OrderMe />} />
          {/* <Route exact path="/Layout" element={<Layout />}/> */}

          {/* <Route exact path="/" element={<Home />} /> */}
          {/* <Route path="/order" element={<Order />} /> */}
          <Route path="/login" element={<Login />} />
          

        </Routes>
    </div>
  );
}

export default App;
