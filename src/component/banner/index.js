import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logout from "../../page/logout";
import OrderMe from "../../page/order-me";

function Banner() {
  const lgo = Logout();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>IOT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Link to='/'><Nav style={{margin:"20px"}}>Home</Nav></Link>
            
            {/* <Nav href="/login">Login</Nav> */}
            <Link to='/cart'><Nav style={{margin:"20px"}}>Cart</Nav></Link>
            <Link to='/register'><Nav style={{margin:"20px"}}>Register</Nav></Link>
            <Link to='/order/me'><Nav style={{margin:"20px"}}>CheckOrder</Nav></Link>
            <Link to='/login'><Nav style={{margin:"20px"}} onClick={lgo}>LogOut</Nav></Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Banner;
