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

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isChangeCart, setIsChangeCart] = useState(false)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    // Lấy danh sách sản phẩm từ localStorage khi component được render
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  var updateQuantity = (id, quantity) => {
    var updatedCart = cartItems.map(e => {
      if (e?.id == id) {
        e.quantity = quantity
        // return { ...e, quantity: quantity };
      }
      return e
    })

    setCartItems(updatedCart);
    setIsChangeCart(true)
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

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const handleBookButtonClick = () => {
    // Xử lý logic đặt sách ở đây (nếu cần)

    // Hiển thị thông báo "Đặt thành công"

    if (cartItems.length === 0) {
      alert("There are no items in the cart");
    } else {
      setBookingSuccess(true);
      // alert("Book Successfully");
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    }

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
                  <MDBBtn className="h2 mb-0 ms-2" color='light' size="lg" onClick={handleBookButtonClick}>
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
                  {bookingSuccess && "Book Successfully!"}
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
