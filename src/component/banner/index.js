import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logout from "../../page/logout";
import OrderMe from "../../page/order-me";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Banner() {
  const lgo = Logout();
  const [openBasic, setOpenBasic] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies(['token', 'user']);

  useEffect(() => {
    if (cookies.token) {
      setIsLogin(true);
    }
  }, [cookies.token]);

  return (
  
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>IOT</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {isLogin && <MDBNavbarItem onClick={() => setOpenBasic(false)}>

              <Link to='/'> <MDBNavbarLink active aria-current='page'>Home </MDBNavbarLink> </Link>

            </MDBNavbarItem>}

            {isLogin && <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/cart'> <MDBNavbarLink active>Cart </MDBNavbarLink></Link></MDBNavbarItem>}
            {isLogin && <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/register'><MDBNavbarLink active>Register </MDBNavbarLink></Link></MDBNavbarItem>}
            {isLogin &&  <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/order/me'><MDBNavbarLink active>CheckOrder </MDBNavbarLink></Link></MDBNavbarItem>}
            {isLogin && <MDBNavbarItem  onClick={()=>{
              lgo()
              setOpenBasic(false)
              setIsLogin(false)
            }}><MDBNavbarLink active>LogOut </MDBNavbarLink></MDBNavbarItem>}


          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}

export default Banner;
