import React from "react";
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
} from "mdb-react-ui-kit";

const cartItems = [
  {
    id: "1", // Thêm id cho mỗi sản phẩm
    name: "NFC",
    desc: "NFC",
    price: "100",
    quantity: "2",
    image:
      "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp",
  },

];

// const cartList({cart}){
//   return (
//     <div>
//       {
//         cart.map((cartItem, cartindex) =>{
//           return (
//             <div>
//               <span> {cartItem.name}</span>
//               <span> {cartItem.quantity}</span>
//               <span> {cartItem.price}</span>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }
const renderReceiptCard = () => {
  return cartItems.map((item) => <ReceiptCard key={item.id} {...item} />);
};

const Order = () => {
  const totalPaid = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity);
  }, 0);

  return (
    <>
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
                    Total paid: <span className="h2 mb-0 ms-2">${totalPaid}</span>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default Order;
