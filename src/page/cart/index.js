import React, { useEffect, useState } from "react";
import ReceiptCard from "../../component/receiptCard";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isChangeCart, setIsChangeCart] = useState(false)
  const [total, setTotal] = useState(0)
  const [cookies, setCookie] = useCookies(["user"]);
  const [bookingSuccess, setBookingSuccess] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
      alert("Please Login Or Register!");
    }
  }, [cookies.token, navigate]);


  useEffect(() => {
    // Lấy danh sách sản phẩm từ localStorage khi component được render
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  var updateQuantity = (id, quantity) => {
    var updatedCart = cartItems.map(e => {
      if (e?.id == id) {
        e.quantity = quantity
      }
      return e
    })

    setCartItems(updatedCart);
    setIsChangeCart(true)
  }

  const booking = () => {
    if (!cookies.token){
      alert("Please Log In!")
      return
    }else{
      console.log(cookies.token)
    }
   
    // check
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", `Bearer ${cookies.token}`);

    const raw = JSON.stringify({
      user_id: cookies.user._id,
      user_email: cookies.user.email,
      products:cartItems,
      total: total
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    fetch(`${config.API}/v1/order/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.isSuccess) {
          console.log(result.data.id)
        } else {
          alert(result);
        }
      })
      .catch((error) => console.error(error));

      if (cartItems.length === 0) {
        alert("There are no items in the cart");
      } else {
        setBookingSuccess(true);
        // alert("Book Successfully");
        setTimeout(() => {
          setBookingSuccess(false);
        }, 3000);
      }
  }


var removeItem = (id) => {
  var updatedCart = []

  cartItems.forEach((e) => {
    if (e?.id != id) {
      updatedCart.push(e)
    }
  })

  setCartItems(updatedCart);
  setIsChangeCart(true)
}

useEffect(() => {
  if (isChangeCart) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  setIsChangeCart(false)
}, [isChangeCart])

useEffect(() => {
  var total = 0
  cartItems.forEach(e => {
    total += e.price * e.quantity
  })

  setTotal(total)
}, [cartItems])

const renderReceiptCard = () => {
  return cartItems.map((item) => {

    if (!!item) {
      return <ReceiptCard key={item.id} updateQuantity={updateQuantity} removeItem={removeItem} {...item} />
    }

    return <></>

  });
};





return (
  <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="10" xl="8">
          <MDBCard style={{ borderRadius: "10px" }}>
            <MDBCardHeader className="px-4 py-5">
              <MDBTypography tag="h5" className="text-muted mb-0">
                Thanks for your Order
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody className="p-4">{renderReceiptCard()}</MDBCardBody>
            <MDBCardFooter
              className="border-0 px-4 py-5"
              style={{
                backgroundColor: "#a8729a",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <MDBTypography
                tag="h5"
                className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
              >
                Total paid: <span className="h2 mb-0 ms-2">${total}</span>
                <MDBBtn className="h2 mb-0 ms-2" color='light' size="lg" onClick={booking}>
                  BOOK
                </MDBBtn>
                {bookingSuccess}
              </MDBTypography>

              <MDBCol
                md="2"
                className="text-center d-flex justify-content-center align-items-center"
              >
                <Link to="/" className="text-decoration-none">
                  <MDBBtn outline color="light" size="sm">
                    Continue Booking
                  </MDBBtn>
                </Link>

              </MDBCol>
              <MDBTypography
                tag="h5"
                className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
              >
                {bookingSuccess && "Book Successfully"}
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
  </section>
);
};

export default Order;
