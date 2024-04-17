import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from "./page/home";
import Order from "./page/order";
import Login from "./page/login";
import Register from "./page/register";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      
        <Routes>
          {/* <Route exact path="/Layout" element={<Layout />}/> */}


          <Route exact path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
    </div>
  );
}

export default App;
